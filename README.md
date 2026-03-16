# Exposition des Métiers Français à l'IA

Analyse du degré d'exposition à l'IA de chaque métier du marché de l'emploi français, à partir des données du [ROME 4.0](https://www.francetravail.org/accueil/mot-cle.html?tagRecherche=rome+4.0) (Répertoire Opérationnel des Métiers et des Emplois) de France Travail.

Inspiré de [joshkale/jobs](https://github.com/joshkale/jobs) (version US avec les données BLS).

## Données

- **1 584 métiers** ROME 4.0 avec descriptions détaillées, compétences, conditions d'accès
- **BMO 2025** (Besoins en Main-d'Oeuvre) pour les projets de recrutement
- **Scoring IA** par Gemini Flash sur une échelle 0-10

## Pipeline de données

1. **Construire** (`build_occupations.py`) — Extrait les 1 584 fiches métiers du ROME 4.0 → `occupations.json` + `pages/*.md`
2. **Enrichir** (`build_bmo.py`) — Extrait les projets de recrutement BMO 2025 → `bmo_by_rome.json`
3. **Scorer** (`score.py`) — Envoie chaque description à Gemini Flash avec un barème de scoring → `scores.json`
4. **Assembler** (`build_site_data.py`) — Fusionne tout en `site/data.json`
5. **Site** (`site/index.html`) — Treemap interactif : surface = recrutements, couleur = exposition IA

## Fichiers clés

| Fichier | Description |
|---------|-------------|
| `occupations.json` | Liste des 1 584 métiers avec titre, code ROME, catégorie, description |
| `scores.json` | Scores d'exposition IA (0-10) avec justifications pour chaque métier |
| `bmo_by_rome.json` | Estimations de recrutement par code ROME |
| `pages/` | Descriptions Markdown de chaque métier (pour le scoring LLM) |
| `site/` | Site statique (visualisation treemap) |

## Installation

```
uv sync
```

Nécessite une clé API Gemini dans `.env` :
```
GEMINI_API_KEY=your_key_here
```

## Utilisation

```bash
# Construire la liste des métiers depuis le ROME
uv run python build_occupations.py

# Extraire les données BMO
uv run python build_bmo.py

# Scorer l'exposition IA (utilise l'API Gemini)
uv run python score.py

# Construire les données du site
uv run python build_site_data.py

# Servir le site localement
cd site && python -m http.server 8000
```

## Sources de données

- [ROME 4.0](https://www.francetravail.org/accueil/mot-cle.html?tagRecherche=rome+4.0) — France Travail (open data)
- [BMO 2025](https://www.data.gouv.fr/datasets/enquete-besoins-en-main-doeuvre-bmo) — France Travail / DARES
