#!/usr/bin/env python3
"""
Generate intentionally messy synthetic travel booking data for Data Accuracy Improvement portfolio project.

This script creates raw_bookings.csv with 10,000 records containing realistic quality issues:
- Missing values (15%)
- Duplicate records (8%)
- Incorrect date formats (12%)
- Invalid categories (10%)
- Inconsistent names (10%)
- Incorrect casing (15%)
- Invalid numeric values (5%)
- Outliers (3%)
- Missing IDs (5%)
- Currency mismatch (5%)

Run: python scripts/generate-data.py
Output: data/raw/raw_bookings.csv, data/raw/metadata.json
"""

import pandas as pd
import numpy as np
import random
import os
import json
from datetime import datetime, timedelta
from faker import Faker

# Set seeds for reproducibility
np.random.seed(42)
random.seed(42)
fake = Faker()
Faker.seed(42)

# Configuration
N_RECORDS = 10000

# Reference data
COUNTRIES = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Singapore', 'UAE', 'India']
CITIES = {
    'USA': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'NYC', 'LA', 'Chicago'],
    'UK': ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow'],
    'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
    'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'],
    'France': ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'],
    'Japan': ['Tokyo', 'Osaka', 'Kyoto', 'Sapporo', 'Fukuoka'],
    'Singapore': ['Singapore'],
    'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah'],
    'India': ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
}

CITY_VARIANTS = {
    'New York': ['New York', 'NYC', 'New York City', 'nyc', 'NY'],
    'Los Angeles': ['Los Angeles', 'LA', 'L.A.'],
    'London': ['London', 'LDN'],
    'Paris': ['Paris', 'PAR'],
    'Tokyo': ['Tokyo', 'TYO'],
    'Sydney': ['Sydney', 'SYD'],
    'Dubai': ['Dubai', 'DXB'],
    'Mumbai': ['Mumbai', 'Bombay', 'BOM'],
    'Singapore': ['Singapore', 'SG', 'SGP'],
    'Toronto': ['Toronto', 'YYZ'],
}

ROOM_TYPES_CANONICAL = ['Standard', 'Deluxe', 'Suite', 'Executive', 'Presidential']
ROOM_TYPES_MESSY = ['Standard', 'Deluxe', 'Delux', 'Suite', 'Suit', 'Executive', 'Exec', 'Presidential', 'Standard', 'Standar']

PAYMENT_STATUSES_CANONICAL = ['Paid', 'Pending', 'Failed', 'Refunded', 'Cancelled']
PAYMENT_STATUSES_MESSY = ['Paid', 'paid', 'PENDING', 'Pending', 'Failed', 'failed', 'Refunded', 'refunded', 'Cancelled', 'cancelled']

BOOKING_CHANNELS_CANONICAL = ['Web', 'Mobile', 'Agent', 'Phone', 'Email']
BOOKING_CHANNELS_MESSY = ['Web', 'web', 'Mobile', 'mobile', 'Agent', 'agent', 'Phone', 'phone', 'Email', 'email']

CURRENCIES = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'SGD', 'AED', 'INR']
COUNTRY_CURRENCY = {
    'USA': 'USD', 'UK': 'GBP', 'Canada': 'CAD', 'Australia': 'AUD',
    'Germany': 'EUR', 'France': 'EUR', 'Japan': 'JPY', 'Singapore': 'SGD',
    'UAE': 'AED', 'India': 'INR',
}

# Date formats to inject
DATE_FORMATS = [
    '%Y-%m-%d',      # ISO (correct)
    '%d/%m/%Y',      # DD/MM/YYYY
    '%m/%d/%Y',      # MM/DD/YYYY
    '%Y/%m/%d',      # YYYY/MM/DD
    '%d-%m-%Y',      # DD-MM-YYYY
    '%b %d, %Y',     # Jan 15, 2024
    '%d %b %Y',      # 15 Jan 2024
    '%Y.%m.%d',      # 2024.01.15
]

def inject_quality_issues(df: pd.DataFrame) -> pd.DataFrame:
    """Inject various quality issues into the dataframe."""
    df = df.copy()
    n = len(df)
    
    # 1. Missing values (15% of records have at least one missing field)
    missing_mask = np.random.random(n) < 0.15
    missing_fields = ['email', 'phone', 'city', 'amount', 'currency', 'payment_status']
    for idx in np.where(missing_mask)[0]:
        field = np.random.choice(missing_fields)
        df.at[idx, field] = np.nan
    
    # 2. Duplicate records (8%)
    n_dupes = int(n * 0.08)
    dupe_indices = np.random.choice(n, n_dupes, replace=False)
    dupes = df.iloc[dupe_indices].copy()
    # Modify slightly for near-duplicates
    for col in ['customer_name', 'email', 'phone']:
        if col in dupes.columns:
            dupes[col] = dupes[col].apply(lambda x: x + '_dup' if pd.notna(x) else x)
    df = pd.concat([df, dupes], ignore_index=True)
    
    # 3. Incorrect date formats (12%)
    date_cols = ['check_in', 'check_out', 'booking_date']
    date_mask = np.random.random(len(df)) < 0.12
    for idx in np.where(date_mask)[0]:
        col = np.random.choice(date_cols)
        if pd.notna(df.at[idx, col]):
            # Convert to random format
            try:
                date_obj = pd.to_datetime(df.at[idx, col])
                fmt = np.random.choice(DATE_FORMATS[1:])  # Skip ISO
                df.at[idx, col] = date_obj.strftime(fmt)
            except:
                pass
    
    # 4. Invalid categories (10%)
    cat_mask = np.random.random(len(df)) < 0.10
    for idx in np.where(cat_mask)[0]:
        df.at[idx, 'room_type'] = np.random.choice(['Delux', 'Standar', 'Suit', 'Exec', 'Luxury', 'Basic'])
    
    # 5. Inconsistent city names (10%)
    city_mask = np.random.random(len(df)) < 0.10
    for idx in np.where(city_mask)[0]:
        country = df.at[idx, 'country']
        if country in CITY_VARIANTS:
            canonical = np.random.choice(list(CITY_VARIANTS.keys()))
            variant = np.random.choice(CITY_VARIANTS[canonical])
            df.at[idx, 'city'] = variant
            df.at[idx, 'country'] = [k for k, v in CITIES.items() if canonical in v][0]
    
    # 6. Incorrect casing (15%)
    case_mask = np.random.random(len(df)) < 0.15
    case_fields = ['customer_name', 'hotel_name', 'city']
    for idx in np.where(case_mask)[0]:
        field = np.random.choice(case_fields)
        if pd.notna(df.at[idx, field]):
            val = str(df.at[idx, field])
            # Random case transformation
            transform = np.random.choice(['lower', 'upper', 'double_space', 'mixed'])
            if transform == 'lower':
                df.at[idx, field] = val.lower()
            elif transform == 'upper':
                df.at[idx, field] = val.upper()
            elif transform == 'double_space':
                df.at[idx, field] = val.replace(' ', '  ')
            elif transform == 'mixed':
                df.at[idx, field] = ''.join(c.upper() if np.random.random() > 0.5 else c.lower() for c in val)
    
    # 7. Invalid numeric values (5%)
    num_mask = np.random.random(len(df)) < 0.05
    for idx in np.where(num_mask)[0]:
        field = np.random.choice(['nights', 'amount'])
        if field == 'nights':
            df.at[idx, 'nights'] = np.random.choice([-5, 0, 365, 999, -10])
        else:
            df.at[idx, 'amount'] = np.random.choice([-50, 0, 100000, -1000, 999999])
    
    # 8. Outliers (3%)
    outlier_mask = np.random.random(len(df)) < 0.03
    for idx in np.where(outlier_mask)[0]:
        field = np.random.choice(['nights', 'amount'])
        if field == 'nights':
            df.at[idx, 'nights'] = np.random.randint(30, 365)
        else:
            df.at[idx, 'amount'] = np.random.uniform(10000, 100000)
    
    # 9. Missing IDs (5%)
    id_mask = np.random.random(len(df)) < 0.05
    for idx in np.where(id_mask)[0]:
        df.at[idx, np.random.choice(['booking_id', 'customer_id'])] = np.nan
    
    # 10. Currency mismatch (5%)
    curr_mask = np.random.random(len(df)) < 0.05
    for idx in np.where(curr_mask)[0]:
        df.at[idx, 'currency'] = np.random.choice([c for c in CURRENCIES if c != df.at[idx, 'currency']])
    
    return df

def generate_clean_bookings(n: int) -> pd.DataFrame:
    """Generate clean synthetic booking data."""
    bookings = []
    
    for i in range(n):
        booking_id = f'BK_{i+1:05d}'
        customer_id = f'CUST_{np.random.randint(1, 3000):04d}'
        
        # Customer info
        first_name = fake.first_name()
        last_name = fake.last_name()
        customer_name = f'{first_name} {last_name}'
        email = f'{first_name.lower()}.{last_name.lower()}@{fake.free_email_domain()}'
        phone = fake.phone_number()
        
        # Location
        country = np.random.choice(COUNTRIES)
        city = np.random.choice(CITIES[country])
        
        # Hotel
        hotel_name = f'{fake.company()} Hotel'
        
        # Dates
        check_in = fake.date_between(start_date='-1y', end_date='today')
        nights = np.random.randint(1, 15)
        check_out = check_in + timedelta(days=nights)
        
        # Room type
        room_type = np.random.choice(ROOM_TYPES_CANONICAL)
        
        # Booking date (before check_in)
        booking_date = check_in - timedelta(days=np.random.randint(0, 60))
        
        # Amount
        base_price = {'Standard': 100, 'Deluxe': 200, 'Suite': 400, 'Executive': 600, 'Presidential': 1000}
        amount = base_price.get(room_type, 200) * np.random.randint(nights, nights+2)
        
        # Currency matches country
        currency = COUNTRY_CURRENCY.get('USA', 'USD')  # Simplified
        
        # Payment status
        payment_status = np.random.choice(PAYMENT_STATUSES_CANONICAL, p=[0.7, 0.15, 0.05, 0.05, 0.05])
        
        # Channel
        booking_channel = np.random.choice(BOOKING_CHANNELS_CANONICAL)
        
        bookings.append({
            'booking_id': f'BK_{len(bookings)+1:05d}',
            'customer_id': f'CUST_{np.random.randint(1, 3000):04d}',
            'customer_name': customer_name,
            'email': email,
            'phone': phone,
            'country': country,
            'city': city,
            'hotel_name': hotel_name,
            'check_in': check_in.strftime('%Y-%m-%d'),
            'check_out': check_out.strftime('%Y-%m-%d'),
            'nights': nights,
            'room_type': room_type,
            'booking_date': booking_date.strftime('%Y-%m-%d'),
            'amount': round(amount, 2),
            'currency': currency,
            'payment_status': payment_status,
            'booking_channel': booking_channel,
        })
    
    return pd.DataFrame(bookings)

def main():
    print("Generating synthetic travel booking data with quality issues...")
    
    os.makedirs('data/raw', exist_ok=True)
    
    # Generate clean data first
    print(f"Generating {N_RECORDS} clean bookings...")
    clean_df = generate_clean_bookings(N_RECORDS)
    print(f"  Clean records: {len(clean_df)}")
    
    # Inject quality issues
    print("Injecting quality issues...")
    messy_df = inject_quality_issues(clean_df)
    print(f"  Records after issues: {len(messy_df)}")
    
    # Save
    messy_df.to_csv('data/raw/raw_bookings.csv', index=False)
    print(f"  Saved: data/raw/raw_bookings.csv ({len(messy_df)} rows)")
    
    # Save metadata
    metadata = {
        'generated_at': datetime.now().isoformat(),
        'n_records_clean': N_RECORDS,
        'n_records_final': len(messy_df),
        'issues_injected': {
            'missing_values': '15%',
            'duplicate_records': '8%',
            'incorrect_date_formats': '12%',
            'invalid_categories': '10%',
            'inconsistent_names': '10%',
            'incorrect_casing': '15%',
            'invalid_numeric_values': '5%',
            'outliers': '3%',
            'missing_ids': '5%',
            'currency_mismatch': '5%',
        },
        'note': 'SYNTHETIC DATA - Portfolio demo only. Not real Make My Trip data.'
    }
    with open('data/raw/metadata.json', 'w') as f:
        json.dump(metadata, f, indent=2)
    print("  Saved: data/raw/metadata.json")
    
    print("\nData generation complete!")
    print("Next step: Run 'python scripts/run-pipeline.py' to execute the quality pipeline")

if __name__ == '__main__':
    main()