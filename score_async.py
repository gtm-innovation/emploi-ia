"""
Score each occupation's AI exposure using Gemini Flash — async concurrent version.

Reads Markdown descriptions from pages/, sends batches to Gemini concurrently,
and collects structured scores. Results are cached incrementally to scores.json.

Usage:
    uv run python score_async.py
    uv run python score_async.py --concurrency 20
"""

import argparse
import asyncio
import json
import os
import httpx
from dotenv import load_dotenv

load_dotenv()

DEFAULT_MODEL = "gemini-2.5-flash"
OUTPUT_FILE = "scores.json"

SYSTEM_PROMPT = """\
Tu es un analyste expert évaluant le degré d'exposition des différents métiers \
à l'intelligence artificielle. On te fournira une description détaillée d'un \
métier issue du ROME (Répertoire Opérationnel des Métiers et des Emplois) de \
France Travail.

Évalue l'**Exposition à l'IA** globale de ce métier sur une échelle de 0 à 10.

L'Exposition à l'IA mesure : dans quelle mesure l'IA va-t-elle transformer ce \
métier ? Considère à la fois les effets directs (l'IA automatisant des tâches \
actuellement effectuées par des humains) et les effets indirects (l'IA rendant \
chaque travailleur si productif que moins de personnes sont nécessaires).

Un signal clé est de savoir si le produit du travail est fondamentalement \
numérique. Si le travail peut être effectué entièrement depuis un bureau à \
domicile sur un ordinateur — rédiger, coder, analyser, communiquer — alors \
l'exposition à l'IA est intrinsèquement élevée (7+), car les capacités de \
l'IA dans les domaines numériques progressent rapidement. Même si l'IA \
d'aujourd'hui ne peut pas gérer tous les aspects d'un tel emploi, la \
trajectoire est forte et le plafond très élevé. À l'inverse, les emplois \
nécessitant une présence physique, une habileté manuelle ou une interaction \
humaine en temps réel dans le monde physique ont une barrière naturelle.

Utilise ces points de repère pour calibrer ton score :

- **0–1 : Exposition minimale.** Le travail est presque entièrement physique, \
manuel ou nécessite une présence humaine en temps réel dans des environnements \
imprévisibles. L'IA n'a essentiellement aucun impact sur le travail quotidien. \
Exemples : couvreur, paysagiste, plongeur professionnel.

- **2–3 : Exposition faible.** Travail principalement physique ou interpersonnel. \
L'IA peut aider pour des tâches périphériques mineures (planning, paperasse) \
mais ne touche pas le cœur du métier. \
Exemples : électricien, plombier, pompier, aide-soignant.

- **4–5 : Exposition modérée.** Un mélange de travail physique/interpersonnel \
et de travail intellectuel. L'IA peut aider significativement pour les parties \
de traitement de l'information, mais une part substantielle du travail \
nécessite encore une présence humaine. \
Exemples : infirmier, policier, vétérinaire.

- **6–7 : Exposition élevée.** Travail principalement intellectuel avec un \
besoin de jugement humain, de relations ou de présence physique. Les outils \
d'IA sont déjà utiles et les travailleurs utilisant l'IA peuvent être \
nettement plus productifs. \
Exemples : enseignant, manager, comptable, journaliste.

- **8–9 : Exposition très élevée.** Le travail est presque entièrement réalisé \
sur ordinateur. Toutes les tâches principales — rédaction, codage, analyse, \
conception, communication — sont dans des domaines où l'IA progresse \
rapidement. Le métier fait face à une restructuration majeure. \
Exemples : développeur logiciel, graphiste, traducteur, analyste de données, \
juriste d'entreprise, rédacteur.

- **10 : Exposition maximale.** Traitement routinier de l'information, \
entièrement numérique, sans composante physique. L'IA peut déjà faire la \
plupart du travail aujourd'hui. \
Exemples : opérateur de saisie, télévendeur.

Réponds avec UNIQUEMENT un objet JSON dans ce format exact, sans autre texte :
{
  "exposure": <0-10>,
  "rationale": "<2-3 phrases en français expliquant les facteurs clés>"
}\
"""


async def score_one(client, occ, text, model, api_key, semaphore):
    """Score a single occupation with concurrency limiting."""
    slug = occ["slug"]
    api_url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"

    async with semaphore:
        try:
            response = await client.post(
                api_url,
                params={"key": api_key},
                json={
                    "systemInstruction": {"parts": [{"text": SYSTEM_PROMPT}]},
                    "contents": [{"parts": [{"text": text}]}],
                    "generationConfig": {
                        "temperature": 0.2,
                        "responseMimeType": "application/json",
                    },
                },
                timeout=120,
            )
            response.raise_for_status()
            result = response.json()
            content = result["candidates"][0]["content"]["parts"][0]["text"]

            content = content.strip()
            if content.startswith("```"):
                content = content.split("\n", 1)[1]
                if content.endswith("```"):
                    content = content[:-3]
                content = content.strip()

            parsed = json.loads(content)
            return slug, {
                "slug": slug,
                "title": occ["title"],
                **parsed,
            }
        except Exception as e:
            return slug, f"ERREUR: {e}"


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", default=DEFAULT_MODEL)
    parser.add_argument("--start", type=int, default=0)
    parser.add_argument("--end", type=int, default=None)
    parser.add_argument("--concurrency", type=int, default=10)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY not set in .env")
        return

    with open("occupations.json") as f:
        occupations = json.load(f)

    subset = occupations[args.start:args.end]

    # Load existing scores
    scores = {}
    if os.path.exists(OUTPUT_FILE) and not args.force:
        with open(OUTPUT_FILE) as f:
            for entry in json.load(f):
                scores[entry["slug"]] = entry

    # Filter to only unscored occupations with markdown files
    to_score = []
    for occ in subset:
        slug = occ["slug"]
        if slug in scores:
            continue
        md_path = f"pages/{slug}.md"
        if not os.path.exists(md_path):
            continue
        with open(md_path) as f:
            text = f.read()
        to_score.append((occ, text))

    print(f"Scoring {len(to_score)} métiers avec {args.model} (concurrency={args.concurrency})")
    print(f"Déjà en cache : {len(scores)}")

    if not to_score:
        print("Rien à scorer.")
        return

    semaphore = asyncio.Semaphore(args.concurrency)
    errors = []
    done = 0

    async with httpx.AsyncClient() as client:
        # Process in batches for incremental saving
        batch_size = args.concurrency * 2
        for batch_start in range(0, len(to_score), batch_size):
            batch = to_score[batch_start:batch_start + batch_size]
            tasks = [
                score_one(client, occ, text, args.model, api_key, semaphore)
                for occ, text in batch
            ]
            results = await asyncio.gather(*tasks)

            for slug, result in results:
                done += 1
                if isinstance(result, str):
                    print(f"  [{done}/{len(to_score)}] {slug} {result}")
                    errors.append(slug)
                else:
                    scores[slug] = result
                    print(f"  [{done}/{len(to_score)}] {result['title']} → exposition={result['exposure']}")

            # Save checkpoint after each batch
            with open(OUTPUT_FILE, "w") as f:
                json.dump(list(scores.values()), f, indent=2, ensure_ascii=False)
            print(f"  [checkpoint] {len(scores)} scores sauvegardés")

    print(f"\nTerminé. {len(scores)} métiers scorés, {len(errors)} erreurs.")
    if errors:
        print(f"Erreurs: {errors}")

    # Summary stats
    vals = [s for s in scores.values() if "exposure" in s]
    if vals:
        avg = sum(s["exposure"] for s in vals) / len(vals)
        by_score = {}
        for s in vals:
            bucket = s["exposure"]
            by_score[bucket] = by_score.get(bucket, 0) + 1
        print(f"\nExposition moyenne sur {len(vals)} métiers : {avg:.1f}")
        print("Distribution :")
        for k in sorted(by_score):
            print(f"  {k}: {'█' * by_score[k]} ({by_score[k]})")


if __name__ == "__main__":
    asyncio.run(main())
