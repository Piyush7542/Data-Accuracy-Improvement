# Data Generation & Pipeline Scripts

These scripts create synthetic data and execute the data quality pipeline for the Data Accuracy Improvement dashboard.

## Prerequisites

```bash
# Install Python dependencies
pip install pandas numpy rapidfuzz faker
```

## Usage

### 1. Generate Raw Synthetic Data
```bash
python scripts/generate-data.py
```
Creates (in `data/raw/`):
- `raw_bookings.csv` - 10,000 synthetic bookings with injected quality issues
- `metadata.json` - Generation metadata

### 2. Run Quality Pipeline
```bash
python scripts/run-pipeline.py
```
Executes the 6-stage pipeline:
1. **Validation** - Schema, type, range, enum checks
2. **Cleaning** - Missing values, negatives, outliers
3. **Standardization** - Dates (12 formats), cities (fuzzy), names, categories
4. **Deduplication** - Exact + fuzzy matching (Levenshtein)
5. **Quality Check** - Final validation
6. **Clean Output** - Final metrics

Creates dashboard-ready JSON in `public/data/`:
- `quality-metrics.json` - Per-stage metrics
- `issue-breakdown.json` - 10 issue categories
- `pipeline-stages.json` - Stage details
- `sample-records.json` - Before/after transformations

### 3. Aggregate for Dashboard (if needed)
```bash
python scripts/aggregate-data.py
```
Re-creates dashboard JSON files from raw data + model outputs.

### 4. Run All (via npm)
```bash
npm run generate-data
npm run run-pipeline
npm run aggregate-data
```

## Data Privacy

- **Raw data** (`data/raw/`) is **gitignored** - never committed to GitHub
- **Aggregated data** (`public/data/`) is **committed** - safe for browser consumption
- All data is **synthetic** - no real Make My Trip data used

## Pipeline Stages Detail

| Stage | Input | Output | Issues Fixed | Accuracy |
|-------|-------|--------|--------------|----------|
| Raw | 10,000 | - | - | 80% |
| Validation | 10,000 | 9,500 | 500 | 85% |
| Cleaning | 9,500 | 9,500 | 300 | 90% |
| Standardization | 9,500 | 9,500 | 400 | 93% |
| Deduplication | 9,500 | 9,100 | 400 | 95% |
| Quality Check | 9,100 | 9,100 | 0 | 96% |
| Clean | 9,100 | 9,100 | 0 | 96% |

## Regenerating Data

To regenerate with different random seed:
1. Edit `scripts/generate-data.py` and change `np.random.seed(42)`
2. Run all three scripts again
3. Commit updated `public/data/` files