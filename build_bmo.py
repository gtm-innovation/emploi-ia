"""
Build hiring estimates per ROME code from DPAE embauches data.

Uses the "Nombre d'embauches par code APE et code ROME" dataset from
data.gouv.fr (contrats_30j.csv) which has actual hiring counts by ROME code.

For ROME 4.0 codes not present in the dataset (which uses ROME v3),
distributes hiring from the matching 3-character ROME domain prefix
evenly across sibling codes.

Writes bmo_by_rome.json with hiring estimates per ROME code.

Usage:
    uv run python build_bmo.py
"""

import csv
import json
from collections import defaultdict


def main():
    # Load actual embauches by ROME code from DPAE data
    embauches = defaultdict(int)
    with open("contrats_30j.csv") as f:
        reader = csv.DictReader(f)
        for row in reader:
            embauches[row["ROME"]] += int(row["nb_embauches"])

    total = sum(embauches.values())
    print(f"DPAE data: {len(embauches)} ROME codes, {total:,} embauches")

    # Load ROME 4.0 occupations
    with open("occupations.json") as f:
        occupations = json.load(f)

    # Build prefix maps for fallback distribution
    # Group embauches by 3-char prefix (e.g. "A11" covers A1101-A1199)
    prefix3_total = defaultdict(int)
    for code, count in embauches.items():
        prefix3_total[code[:3]] += count

    # Count how many ROME 4.0 codes share each 3-char prefix
    prefix3_rome_codes = defaultdict(list)
    for occ in occupations:
        prefix3_rome_codes[occ["code_rome"][:3]].append(occ["code_rome"])

    # Assign hiring estimates
    result = {}
    direct = 0
    estimated = 0

    for occ in occupations:
        code = occ["code_rome"]

        if code in embauches:
            # Direct match
            hiring = embauches[code]
            source = "dpae_direct"
            direct += 1
        else:
            # Distribute parent prefix's hiring across sibling codes
            prefix = code[:3]
            if prefix in prefix3_total:
                siblings = prefix3_rome_codes[prefix]
                hiring = prefix3_total[prefix] // len(siblings)
                source = "dpae_estimated_from_prefix"
            else:
                hiring = total // len(occupations)
                source = "dpae_global_average"
            estimated += 1

        result[code] = {
            "code_rome": code,
            "title": occ["title"],
            "hiring_estimate": hiring,
            "source": source,
        }

    with open("bmo_by_rome.json", "w") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    values = [v["hiring_estimate"] for v in result.values()]
    print(f"Wrote {len(result)} ROME codes to bmo_by_rome.json")
    print(f"  Direct matches: {direct}")
    print(f"  Estimated from prefix: {estimated}")
    print(f"  Min: {min(values):,}, Max: {max(values):,}, Median: {sorted(values)[len(values)//2]:,}")


if __name__ == "__main__":
    main()
