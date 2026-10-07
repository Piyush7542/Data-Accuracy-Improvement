# Data Accuracy Improvement

**Data Quality Pipeline Portfolio Project** — Systematic data cleansing from 80% to 96% accuracy using synthetic travel booking data.

---

## 🎯 Project Overview

This portfolio project recreates the **Data Accuracy Improvement** project from Make My Trip (2022–2023) as an interactive portfolio dashboard. The original project raised data accuracy from 80% to 96% through systematic data cleansing and preprocessing of travel/OTA booking data.

---

## 🏗️ Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    DATA QUALITY PIPELINE                          │
├──────────┬──────────────┬────────────┬───────────────┬───────────┬────────┤
│   RAW    │ VALIDATION   │  CLEANING  │ STANDARDIZATION │ DEDUP   │ CLEAN  │
│  DATA    │              │            │                 │         │ OUTPUT │
│  (80%)   │   (85%)      │   (90%)    │    (93%)        │  (95%)  │ (96%)  │
└──────────┴──────────────┴────────────┴───────────────┴─────────┴────────┘
     10K        →           9.5K         →    9.5K        →    9.5K      →  9.1K
     rows       →   500 fixed   →   300 fixed  →    400 fixed   →  400 removed
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/Piyush7542/Data-Accuracy-Improvement.git
cd Data-Accuracy-Improvement
npm install
pip install pandas numpy rapidfuzz faker

# Generate synthetic data
npm run generate-data

# Run the 6-stage pipeline
npm run run-pipeline

# Start dashboard
npm run dev
```

Open http://localhost:3002

---

## 📊 Key Results

| Metric | Value | Improvement |
|--------|-------|-------------|
| **Initial Accuracy** | 80% | Baseline |
| **Final Accuracy** | 96% | **+16pp** |
| **Issues Fixed** | 2,000+ | Across 10 categories |
| **Duplicates Removed** | 400 | Exact + fuzzy + cross-channel |
| **Date Formats Fixed** | 12 → 1 | 99.9% parse rate |
| **City Variants** | 47 → 10 | Fuzzy matching |
| **Pipeline Time** | < 30 sec | 10K records |

---

## 🎯 Key Features

### 1. **6-Stage Pipeline**
| Stage | Focus | Key Operations |
|-------|-------|----------------|
| **Validation** | Schema, type, range, enum checks | 500 issues caught |
| **Cleaning** | Missing values, negatives, outliers | 300 fixed |
| **Standardization** | Dates (12 formats), cities (47→10), names | 400 fixed |
| **Deduplication** | Exact + fuzzy (Levenshtein) | 400 removed |
| **Quality Check** | Final validation | 96% accuracy |

### 2. **10 Issue Categories**
| Category | Count | Severity |
|----------|-------|----------|
| Missing Values | 1,500 | High |
| Duplicate Records | 800 | High |
| Incorrect Date Formats | 1,200 | High |
| Invalid Categories | 1,000 | High |
| Inconsistent Names | 1,000 | Medium |
| Incorrect Casing | 1,500 | Medium |
| Invalid Numeric Values | 500 | Critical |
| Outliers | 300 | High |
| Missing IDs | 500 | Critical |
| Currency Mismatch | 500 | High |

### 3. **Interactive Dashboard (10 Pages)**
- Executive Summary - KPIs, pipeline flow, insights
- Raw Data Explorer - Sample messy records
- Validation Stage - 8 validation checks
- Cleaning Stage - 6 cleaning operations
- Standardization - 7 rules with stats
- Deduplication - 4 methods (exact, fuzzy, cross-channel)
- Quality Dashboard - Progress chart, issue donut, accuracy bars
- Before/After Comparison - 15 side-by-side transformations
- Issue Breakdown - Bar chart, severity grid, searchable cards
- About - Methodology, disclaimer, portfolio integration

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Recharts |
| Backend | Python 3.11, pandas, numpy, rapidfuzz, faker |
| Pipeline | 6-stage automated pipeline |
| Deployment | Netlify (static), GitHub Actions ready |

---

## 🚀 Quick Start

```bash
git clone https://github.com/Piyush7542/Data-Accuracy-Improvement.git
cd Data-Accuracy-Improvement
npm install
pip install pandas numpy rapidfuzz faker

# Generate synthetic data
npm run generate-data

# Run full pipeline
npm run run-pipeline

# Start dashboard
npm run dev
```

Open http://localhost:3002

---

## 📊 Pipeline Results

| Stage | Input | Output | Issues Fixed | Accuracy |
|-------|-------|--------|--------------|----------|
| Raw | 10,000 | 10,000 | — | 80% |
| Validation | 10,000 | 9,500 | 500 | 85% |
| Cleaning | 9,500 | 9,500 | 300 | 90% |
| Standardization | 9,500 | 9,500 | 400 | 93% |
| Deduplication | 9,500 | 9,100 | 400 | 95% |
| Quality Check | 9,100 | 9,100 | 0 | 96% |

**Total Improvement: +16 percentage points (80% → 96%)**

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Recharts |
| Backend | Python 3.11, pandas, numpy, rapidfuzz, faker |
| Pipeline | 6-stage automated pipeline |
| Deployment | Netlify (static), GitHub Actions ready |

---

## 🚀 Deployment

### Netlify
1. Connect GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Node version: 20

---

## 📁 Project Structure

```
data-accuracy-improvement/
├── public/data/                    # Aggregated JSON for dashboard
├── src/
│   ├── components/
│   │   ├── charts/          # BarChart, LineChart, DonutChart, ProgressChart
│   │   ├── dashboard/       # KPICard, IssueCard, BeforeAfterCard, PipelineStageCard
│   │   ├── layout/          # Header, Sidebar, Footer
│   │   ├── pipeline/        # PipelineFlow, StageIndicator
│   │   └── ui/              # Badge, FilterBar, Tabs, Tooltip, SyntheticDataBadge
│   ├── hooks/               # useFilters, useQualityData
│   ├── pages/               # 10 pages
│   ├── types/               # TypeScript interfaces
│   └── utils/               # formatters, constants, cn helper
├── scripts/
│   ├── generate-data.py     # Synthetic data generation
│   ├── run-pipeline.py      # 6-stage pipeline execution
│   └── aggregate-data.py    # Dashboard JSON generation
├── data/raw/                # .gitignored raw CSV files
└── README.md
```

---

## ⚠️ Disclaimer

> **SYNTHETIC DATA — PORTFOLIO DEMO**
> 
> This project uses **100% synthetic data** generated for portfolio demonstration purposes only. No real Make My Trip data, customer information, booking records, payment transactions, or proprietary business metrics are used, stored, or displayed in this application.

---

## 👤 Author

**Piyush Anand**  
Senior Data & Visualization Analyst  
[LinkedIn](https://linkedin.com/in/piyush-anand) • [GitHub](https://github.com/Piyush7542)