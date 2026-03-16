"""
Build a compact JSON for the website by merging occupation data with AI exposure scores.

Reads occupations.json (for metadata) and scores.json (for AI exposure).
Uses bmo_by_rome.json for hiring estimates if available.
Writes site/data.json.

Usage:
    uv run python build_site_data.py
"""

import json
import os


def main():
    # Load occupations
    with open("occupations.json") as f:
        occupations = json.load(f)

    # Load AI exposure scores
    scores = {}
    if os.path.exists("scores.json"):
        with open("scores.json") as f:
            for s in json.load(f):
                scores[s["slug"]] = s

    # Load BMO hiring estimates
    bmo = {}
    if os.path.exists("bmo_by_rome.json"):
        with open("bmo_by_rome.json") as f:
            bmo = json.load(f)

    # Education level mapping from acces_metier text
    def guess_education(acces_text):
        if not acces_text:
            return "Non spécifié"
        t = acces_text.lower()
        if "bac+5" in t or "master" in t or "ingénieur" in t:
            return "Bac+5 / Master"
        if "bac+3" in t or "licence" in t or "bac+4" in t:
            return "Bac+3 / Licence"
        if "bac+2" in t or "bts" in t or "dut" in t:
            return "Bac+2 / BTS-DUT"
        if "bac pro" in t or "bac " in t or "baccalauréat" in t:
            return "Bac / Bac pro"
        if "cap" in t or "bep" in t or "niveau v" in t:
            return "CAP / BEP"
        if "doctorat" in t or "thèse" in t or "médecin" in t or "pharmacien" in t:
            return "Doctorat / État"
        if "sans diplôme" in t or "accessible sans" in t:
            return "Sans diplôme"
        return "Non spécifié"

    # Merge
    data = []
    for occ in occupations:
        slug = occ["slug"]
        code = occ["code_rome"]
        score = scores.get(slug, {})
        hiring = bmo.get(code, {})

        data.append({
            "title": occ["title"],
            "slug": slug,
            "code_rome": code,
            "category": occ["category"],
            "jobs": hiring.get("hiring_estimate", 100),
            "education": guess_education(occ.get("acces_metier", "")),
            "exposure": score.get("exposure"),
            "exposure_rationale": score.get("rationale"),
        })

    os.makedirs("site", exist_ok=True)
    with open("site/data.json", "w") as f:
        json.dump(data, f, ensure_ascii=False)

    scored = sum(1 for d in data if d["exposure"] is not None)
    total_jobs = sum(d["jobs"] for d in data if d["jobs"])
    print(f"Wrote {len(data)} métiers to site/data.json")
    print(f"  {scored} scored, {len(data) - scored} unscored")
    print(f"  Total projets de recrutement : {total_jobs:,}")


if __name__ == "__main__":
    main()
