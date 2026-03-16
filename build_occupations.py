"""
Build the French occupations list from ROME 4.0 open data.

Reads the ROME ZIP download and produces:
- occupations.json: master list with title, code, category, description
- pages/<slug>.md: Markdown description per occupation (for LLM scoring)

Usage:
    uv run python build_occupations.py
"""

import json
import os
import re
import zipfile


ROME_ZIP = "rome_data.zip"
FICHES_FILE = "unix_fiche_emploi_metier_v460.json"
ARBO_FILE = "unix_arborescence_principale_v460.json"


def slugify(text):
    """Convert text to a URL-friendly slug."""
    text = text.lower()
    text = re.sub(r'[àâä]', 'a', text)
    text = re.sub(r'[éèêë]', 'e', text)
    text = re.sub(r'[îï]', 'i', text)
    text = re.sub(r'[ôö]', 'o', text)
    text = re.sub(r'[ùûü]', 'u', text)
    text = re.sub(r'[ç]', 'c', text)
    text = re.sub(r'[œ]', 'oe', text)
    text = re.sub(r'[æ]', 'ae', text)
    text = re.sub(r'[½]', 'oe', text)
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    return text


def build_markdown(fiche):
    """Build a Markdown description of an occupation from a ROME fiche."""
    md = []
    rome = fiche["rome"]
    md.append(f"# {rome['intitule']}")
    md.append(f"**Code ROME:** {rome['code_rome']}")
    md.append("")

    # Definition
    if fiche.get("definition"):
        md.append("## Définition")
        md.append(fiche["definition"])
        md.append("")

    # Appellations (job titles under this occupation)
    if fiche.get("appellations"):
        md.append("## Appellations")
        for app in fiche["appellations"]:
            md.append(f"- {app['libelle']}")
        md.append("")

    # Access requirements
    if fiche.get("acces_metier"):
        md.append("## Accès au métier")
        md.append(fiche["acces_metier"])
        md.append("")

    # Competencies
    comp = fiche.get("competences", {})
    sf = comp.get("savoir_faire", {})

    # Savoir-faire (skills)
    enjeux = sf.get("enjeux", [])
    if enjeux:
        md.append("## Compétences (savoir-faire)")
        for enjeu in enjeux:
            md.append(f"\n### {enjeu['libelle']}")
            for item in enjeu.get("items", []):
                core = " *(compétence principale)*" if item.get("coeur_metier") == "Principale" else ""
                md.append(f"- {item['libelle']}{core}")
        md.append("")

    # Savoirs (knowledge)
    savoirs = comp.get("savoirs", {})
    categories = savoirs.get("categories", []) if isinstance(savoirs, dict) else savoirs
    if categories:
        md.append("## Connaissances (savoirs)")
        for cat in categories:
            if isinstance(cat, dict):
                md.append(f"\n### {cat.get('libelle', '')}")
                for item in cat.get("items", []):
                    if isinstance(item, dict):
                        md.append(f"- {item.get('libelle', '')}")
        md.append("")

    # Work contexts
    contextes = fiche.get("contextes_travail", [])
    if contextes:
        md.append("## Contextes de travail")
        for ctx in contextes:
            if isinstance(ctx, dict):
                items_str = ', '.join(item.get('libelle', '') for item in ctx.get('items', []) if isinstance(item, dict))
                md.append(f"- **{ctx.get('libelle', '')}**: {items_str}")
        md.append("")

    return "\n".join(md)


def main():
    # Extract files from ZIP if not already done
    needed = [FICHES_FILE, ARBO_FILE]
    for fname in needed:
        if not os.path.exists(fname):
            print(f"Extracting {fname} from {ROME_ZIP}...")
            with zipfile.ZipFile(ROME_ZIP) as zf:
                zf.extract(fname)

    # Load hierarchy for category mapping
    with open(ARBO_FILE, encoding="latin-1") as f:
        arbo = json.load(f)

    # Build ROME code → category mapping
    rome_to_category = {}
    for grand_domaine in arbo["arbo_principale"]:
        cat_name = grand_domaine["libelle"]
        for domaine in grand_domaine["liste_domaine_prof"]:
            for metier in domaine["liste_metier"]:
                rome_to_category[metier["code_rome"]] = cat_name

    # Load fiches
    with open(FICHES_FILE, encoding="latin-1") as f:
        fiches = json.load(f)

    print(f"Loaded {len(fiches)} fiches métiers")

    # Build occupations list and markdown pages
    os.makedirs("pages", exist_ok=True)
    occupations = []

    for fiche in fiches:
        rome = fiche["rome"]
        code = rome["code_rome"]
        title = rome["intitule"]
        slug = f"{code}-{slugify(title)}"
        category = rome_to_category.get(code, "Autre")

        # Build markdown
        md = build_markdown(fiche)
        md_path = f"pages/{slug}.md"
        with open(md_path, "w") as f:
            f.write(md)

        occupations.append({
            "title": title,
            "code_rome": code,
            "slug": slug,
            "category": category,
            "definition": fiche.get("definition", ""),
            "acces_metier": fiche.get("acces_metier", ""),
            "appellations": [a["libelle"] for a in fiche.get("appellations", [])],
        })

    # Sort by ROME code
    occupations.sort(key=lambda x: x["code_rome"])

    with open("occupations.json", "w") as f:
        json.dump(occupations, f, indent=2, ensure_ascii=False)

    print(f"Wrote {len(occupations)} occupations to occupations.json")
    print(f"Wrote {len(occupations)} markdown pages to pages/")

    # Show category breakdown
    from collections import Counter
    cats = Counter(o["category"] for o in occupations)
    print("\nPar catégorie:")
    for cat, count in cats.most_common():
        print(f"  {count:4d}  {cat}")


if __name__ == "__main__":
    main()
