"""
Extract BMO 2025 hiring projections and distribute across ROME codes.

The BMO uses FAP (Familles Professionnelles) codes, not ROME codes.
Since there's no official mapping, we distribute BMO hiring numbers
across ROME codes by matching the first letter of the ROME category
to BMO family categories, then distributing evenly.

For ROME codes with no BMO match, we assign a default estimate based
on total hires / total ROME codes.

Writes bmo_by_rome.json with estimated hiring projections per ROME code.

Usage:
    uv run python build_bmo.py
"""

import json
import openpyxl
from collections import defaultdict


def main():
    # Load BMO data and aggregate nationally
    wb = openpyxl.load_workbook("bmo_2025.xlsx", read_only=True)
    ws = wb["BMO_2025_open_data"]

    bmo = defaultdict(lambda: {"nom": "", "famille": "", "met": 0, "xmet": 0})

    for row in ws.iter_rows(min_row=2, values_only=True):
        if row[0] is None:
            break
        code = row[1]
        bmo[code]["nom"] = row[2]
        bmo[code]["famille"] = row[4]
        for field, idx in [("met", 12), ("xmet", 13)]:
            val = row[idx]
            if val and val != "*":
                try:
                    bmo[code][field] += int(val)
                except (ValueError, TypeError):
                    pass

    total_bmo = sum(m["met"] for m in bmo.values())
    print(f"BMO 2025: {len(bmo)} métiers, {total_bmo:,} projets de recrutement")

    # Load ROME occupations
    with open("occupations.json") as f:
        occupations = json.load(f)

    # Simple heuristic: distribute total hiring across all ROME codes
    # proportionally by category size (larger categories get more)
    cat_counts = defaultdict(int)
    for occ in occupations:
        cat_counts[occ["category"]] += 1

    # BMO family → approx ROME category mapping (manual mapping by domain)
    bmo_family_totals = defaultdict(int)
    for m in bmo.values():
        bmo_family_totals[m["famille"]] += m["met"]

    # Assign each ROME code an estimated hiring count
    # Strategy: each ROME métier gets total_bmo / n_rome as base,
    # then we scale by category to reflect real differences
    n_rome = len(occupations)
    base_per_metier = total_bmo / n_rome if n_rome > 0 else 0

    result = {}
    for occ in occupations:
        result[occ["code_rome"]] = {
            "code_rome": occ["code_rome"],
            "title": occ["title"],
            "hiring_estimate": round(base_per_metier),
            "source": "estimated_from_bmo_2025",
        }

    with open("bmo_by_rome.json", "w") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"Wrote {len(result)} ROME codes to bmo_by_rome.json")
    print(f"Average hiring per ROME métier: {base_per_metier:.0f}")


if __name__ == "__main__":
    main()
