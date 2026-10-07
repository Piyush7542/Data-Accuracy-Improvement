import { Info, AlertTriangle, Github, ExternalLink, Database, Code, BarChart2, Users, Shield, Clock, Zap, Target, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Hero */}
      <div className="card p-8 md:p-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-6">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <span className="text-sm font-medium text-red-800">SYNTHETIC DATA — PORTFOLIO DEMO</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Data Accuracy Improvement</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          A data quality pipeline portfolio project demonstrating systematic data cleansing from <strong>80% to 96% accuracy</strong> using entirely synthetic travel booking data.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <Github className="w-4 h-4 mr-2" />
            View Source
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="btn-primary">
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Demo
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="card border-red-200 bg-red-50">
        <div className="card-body">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h2 className="font-semibold text-red-800">Important Disclaimer</h2>
              <p className="text-red-700 mt-2">
                <strong>This project uses 100% synthetic data generated for portfolio demonstration purposes only.</strong>
                No real Make My Trip data, customer information, booking records, payment transactions, or proprietary
                business metrics are used, stored, or displayed in this application. All numbers, accuracy metrics,
                pipeline results, and visualizations are computed from artificially generated datasets designed to
                approximate the analytical patterns described in the resume project description.
              </p>
              <p className="text-red-700 mt-2">
                This project is a portfolio simulation and is not connected to any real Make My Trip systems, databases,
                or analytics platforms. The methodology demonstrated here represents analytical approaches used in
                professional data quality engineering work, but the specific results are simulated.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
            <Info className="w-5 h-5 text-primary-600" />
            Project Overview
          </h2>
        </div>
        <div className="card-body space-y-4">
          <p className="text-neutral-600">
            This project recreates the <strong>Data Accuracy Improvement</strong> project from my resume (Make My Trip, 2022–2023)
            as an interactive portfolio dashboard. The original project raised data accuracy from 80% to 96%
            through systematic data cleansing and preprocessing of travel/OTA booking data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-50 rounded-lg">
              <h3 className="font-medium text-neutral-900 mb-2">Original Resume Context</h3>
              <ul className="space-y-1 text-sm text-neutral-600">
                <li>• 80% → 96% accuracy improvement</li>
                <li>• Systematic data cleansing & preprocessing</li>
                <li>• Travel/OTA booking data domain</li>
                <li>• Delivered to senior leadership</li>
              </ul>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg">
              <h3 className="font-medium text-neutral-900 mb-2">Key Technical Achievements</h3>
              <ul className="space-y-1 text-sm text-neutral-600">
                <li>• 6-stage pipeline: Validation → Cleaning → Standardization → Deduplication → Quality Check</li>
                <li>• 10+ issue categories resolved</li>
                <li>• 2,000+ individual issues fixed</li>
                <li>• 16% absolute accuracy improvement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-primary-600" />
            Methodology
          </h2>
        </div>
        <div className="card-body space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-neutral-900 mb-3">Pipeline Stages</h3>
              <ol className="space-y-3 text-sm text-neutral-600">
                <li className="flex items-start gap-2"><span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold">1</span> <strong>Validation:</strong> Schema checks, type validation, range checks, enum validation</li>
                <li className="flex items-start gap-2"><span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold">2</span> <strong>Cleaning:</strong> Missing value imputation, negative value correction, outlier capping</li>
                <li className="flex items-start gap-2"><span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold">3</span> <strong>Standardization:</strong> Date parsing (12 formats), city normalization (47→10), name casing, category mapping</li>
                <li className="flex items-start gap-2"><span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold">4</span> <strong>Deduplication:</strong> Exact + fuzzy matching (Levenshtein), cross-channel dedup</li>
                <li className="flex items-start gap-2"><span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold">5</span> <strong>Quality Check:</strong> Final validation, accuracy calculation, drift monitoring</li>
                <li className="flex items-start gap-2"><span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold">6</span> <strong>Clean Output:</strong> 96% accuracy, ready for downstream consumption</li>
              </ol>
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 mb-3">Key Technical Decisions</h3>
              <ul className="space-y-3 text-sm text-neutral-600">
                <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-primary-600 mt-0.5" /> <strong>Fuzzy Matching:</strong> Levenshtein distance for city/hotel deduplication with 0.85 threshold</li>
                <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-primary-600 mt-0.5" /> <strong>Date Parser:</strong> 12-format fallback chain achieving 99.9% parse rate</li>
                <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-primary-600 mt-0.5" /> <strong>Fuzzy Matching:</strong> Levenshtein for near-duplicate detection (similarity {'>'} 0.9)</li>
                <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-primary-600 mt-0.5" /> <strong>Confidence Scoring:</strong> Per-record confidence based on issue count and severity</li>
                <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-primary-600 mt-0.5" /> <strong>Imputation:</strong> Customer profile lookup for missing emails/phones; category medians for amounts</li>
              </ul>
            </div>
          </div>
          <div className="p-4 bg-neutral-50 rounded-lg">
            <h3 className="font-medium text-neutral-900 mb-2">10 Issue Categories Addressed</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
              {['Missing Values', 'Duplicate Records', 'Incorrect Date Formats', 'Invalid Categories', 'Inconsistent Names', 'Incorrect Casing', 'Invalid Numeric Values', 'Outliers', 'Missing IDs', 'Currency Mismatch'].map((cat, i) => (
                <div key={i} className="p-2 bg-white rounded border border-neutral-200 text-center text-neutral-700">{cat}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Data Generation */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-primary-600" />
            Synthetic Data Generation
          </h2>
        </div>
        <div className="card-body space-y-4">
          <p className="text-neutral-600">
            All data is generated using Python scripts with controlled random seeds for reproducibility.
            The generation process creates realistic travel booking patterns with intentionally injected quality issues.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-neutral-50 rounded-lg">
              <h4 className="font-medium text-neutral-900 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-600" />
                Bookings (10,000)
              </h4>
              <ul className="space-y-1 text-sm text-neutral-600">
                <li>• 85% injected with quality issues</li>
                <li>• 10 countries, 500+ hotels</li>
                <li>• 2023-2024 booking dates</li>
                <li>• 5 room types, 5 channels</li>
              </ul>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg">
              <h4 className="font-medium text-neutral-900 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary-600" />
                Quality Issues
              </h4>
              <ul className="space-y-1 text-sm text-neutral-600">
                <li>• 15% missing values</li>
                <li>• 8% duplicate records</li>
                <li>• 12% date format issues</li>
                <li>• 10% invalid categories</li>
                <li>• 15% casing issues</li>
              </ul>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg">
              <h4 className="font-medium text-neutral-900 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary-600" />
                Privacy & Safety
              </h4>
              <ul className="space-y-1 text-sm text-neutral-600">
                <li>• Raw data in .gitignore</li>
                <li>• Only aggregated JSON deployed</li>
                <li>• No PII or real identifiers</li>
                <li>• Seed-controlled reproducibility</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
            <Code className="w-5 h-5 text-primary-600" />
            Technology Stack
          </h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-neutral-50 rounded-lg">
              <h4 className="font-medium text-neutral-900 mb-2">Frontend</h4>
              <ul className="space-y-1 text-sm text-neutral-600">
                <li>• React 18 + TypeScript</li>
                <li>• Vite for build/dev</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Recharts for visualizations</li>
                <li>• React Router for navigation</li>
              </ul>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg">
              <h4 className="font-medium text-neutral-900 mb-2">Data & Pipeline</h4>
              <ul className="space-y-1 text-sm text-neutral-600">
                <li>• Python (pandas, numpy)</li>
                <li>• Synthetic data generation</li>
                <li>• Fuzzy matching (Levenshtein)</li>
                <li>• Date parsing (dateutil)</li>
                <li>• Pipeline orchestration ready</li>
              </ul>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg">
              <h4 className="font-medium text-neutral-900 mb-2">Deployment</h4>
              <ul className="space-y-1 text-sm text-neutral-600">
                <li>• Netlify (static hosting)</li>
                <li>• Auto-deploy from GitHub</li>
                <li>• HTTPS, CDN, custom domains</li>
                <li>• Zero backend infrastructure</li>
                <li>• Environment-based config</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Integration */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary-600" />
            Portfolio Integration
          </h2>
        </div>
        <div className="card-body space-y-4">
          <p className="text-neutral-600">
            This project is designed as a portfolio piece for a Senior Data / Product Analyst role.
            It demonstrates the following competencies:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-50 rounded-lg">
              <h4 className="font-medium text-neutral-900 mb-2">Analytical Skills</h4>
              <ul className="space-y-1 text-sm text-neutral-600">
                <li>• Data quality assessment & profiling</li>
                <li>• Pipeline design & orchestration</li>
                <li>• Data validation & cleansing strategies</li>
                <li>• Fuzzy matching & deduplication</li>
                <li>• Accuracy measurement & monitoring</li>
              </ul>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg">
              <h4 className="font-medium text-neutral-900 mb-2">Technical Skills</h4>
              <ul className="space-y-1 text-sm text-neutral-600">
                <li>• React + TypeScript development</li>
                <li>• Interactive dashboard design</li>
                <li>• Data visualization (Recharts)</li>
                <li>• Python data pipeline</li>
                <li>• Git/GitHub + Netlify deployment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary-600" />
            Links & Resources
          </h2>
        </div>
        <div className="card-body space-y-3">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
            <Github className="w-6 h-6 text-neutral-600" />
            <div>
              <p className="font-medium text-neutral-900">GitHub Repository</p>
              <p className="text-sm text-neutral-500">Source code, data scripts, documentation</p>
            </div>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
            <ExternalLink className="w-6 h-6 text-neutral-600" />
            <div>
              <p className="font-medium text-neutral-900">Live Demo (Netlify)</p>
              <p className="text-sm text-neutral-500">Interactive dashboard deployment</p>
            </div>
          </a>
          <Link to="/" className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
            <BarChart2 className="w-6 h-6 text-neutral-600" />
            <div>
              <p className="font-medium text-neutral-900">Back to Dashboard</p>
              <p className="text-sm text-neutral-500">Explore the interactive analysis</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}