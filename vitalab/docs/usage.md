# VitalLab Usage Guide

This guide explains how to use the VitalLab project to analyze medical vital signs data from VitalDB.

## Setup

1. Clone this repository and navigate to the project directory
2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```
   
   Alternatively, you can run the setup script:
   ```
   ./run.sh
   ```

## Basic Usage

### Running the Example Script

The easiest way to get started is to run the example script:

```
python src/example.py
```

This will download vital sign data from VitalDB, perform basic analysis, and create visualizations in the `data` directory.

### Running the Patient Analysis

For more advanced analysis, run the patient analyzer:

```
python src/patient_analysis.py
```

This script will:
1. Download a case from VitalDB that contains both ECG and arterial pressure data
2. Perform ECG analysis (R-peak detection, heart rate calculation)
3. Perform blood pressure analysis (systolic/diastolic detection)
4. Calculate the pressure-rate product (an index of myocardial oxygen consumption)
5. Generate visualizations of the signals with detected features
6. Save analysis results to CSV files

### Jupyter Notebook

For interactive analysis, open the Jupyter notebook:

```
jupyter notebook src/advanced_analysis.ipynb
```

This notebook demonstrates more advanced analysis techniques, including:
- Signal filtering
- QRS complex detection
- Blood pressure analysis
- Correlation between heart rate and blood pressure

## Using the PatientAnalyzer Class

The `PatientAnalyzer` class provides a convenient way to analyze patient vital signs:

```python
import vitaldb
from patient_analysis import PatientAnalyzer

# Create an analyzer for a specific case
analyzer = PatientAnalyzer(case_id=1)

# Load ECG and arterial pressure tracks
analyzer.load_tracks(['SNUADC/ECG_II', 'SNUADC/ART'])

# Analyze ECG
hr_stats = analyzer.analyze_ecg()
print(f"Mean heart rate: {hr_stats['mean_hr']:.1f} BPM")

# Analyze blood pressure
bp_stats = analyzer.analyze_blood_pressure()
print(f"Mean arterial pressure: {bp_stats['mean_arterial_pressure']:.1f} mmHg")

# Calculate pressure-rate product
prp = analyzer.compute_pressure_rate_product()

# Visualize data
analyzer.plot_vital_signs(segment_length=10, start_time=100)

# Save results
analyzer.save_results()
```

## Finding Cases

You can search for cases with specific tracks using the `find_cases` function:

```python
import vitaldb

# Find cases with both ECG_II and ART tracks
caseids = vitaldb.find_cases(['ECG_II', 'ART'])
print(f"Found {len(caseids)} cases")

# Find cases with multiple tracks
caseids = vitaldb.find_cases(['ECG_II', 'ART', 'PLETH', 'RESP'])
print(f"Found {len(caseids)} cases with all specified tracks")
```

## Loading and Analyzing Data

```python
import vitaldb
import matplotlib.pyplot as plt

# Load a case with specific tracks
vf = vitaldb.VitalFile(1, ['SNUADC/ECG_II', 'SNUADC/ART'])

# Convert to pandas DataFrame
df = vf.to_pandas(['SNUADC/ECG_II', 'SNUADC/ART'], 1/100)

# Plot data
plt.figure(figsize=(15, 10))
plt.subplot(2, 1, 1)
plt.plot(df['SNUADC/ECG_II'][10000:11000])
plt.title('ECG')
plt.subplot(2, 1, 2)
plt.plot(df['SNUADC/ART'][10000:11000], color='red')
plt.title('Arterial Pressure')
plt.tight_layout()
plt.show()
```

## Advanced Customization

The `PatientAnalyzer` class can be customized for specific analysis needs:

- Change the ECG peak detection threshold: `analyzer.analyze_ecg(threshold=0.7)`
- Adjust the blood pressure detection parameters: `analyzer.analyze_blood_pressure(min_distance=0.7)`
- Modify visualization parameters: `analyzer.plot_vital_signs(segment_length=20, start_time=50)` 