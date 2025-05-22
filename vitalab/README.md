# VitalLab

A Python project for analyzing medical vital signs data using the VitalDB library. This project provides tools and examples for working with high-resolution biosignal data from surgical patients.

## About VitalDB

VitalDB is a comprehensive dataset of high-resolution biosignal data from surgical patients. It includes:

- High-quality data such as 500 Hz waveform signals and numeric values at 1-7 second intervals
- Multiple vital signs data: ECG, arterial pressure, plethysmogram, respiration, etc.
- Clinical information to help interpret the signals

## Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/vitalab.git
cd vitalab
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

Alternatively, use the included setup script:
```bash
./run.sh
```

## Features

- Load vital sign data from VitalDB
- Visualize ECG, arterial pressure, and other vital sign waveforms
- Signal processing and analysis tools:
  - R-peak detection in ECG signals
  - Systolic/diastolic detection in arterial pressure signals
  - Heart rate calculation
  - Blood pressure analysis
  - Pressure-rate product calculation
- Data analysis tools for medical research
- Interactive Jupyter notebook for advanced analysis

## Usage

### Basic Example

Run the example script to download data and create basic visualizations:

```bash
python src/example.py
```

### Patient Analysis

For more advanced analysis:

```bash
python src/patient_analysis.py
```

### Advanced Analysis

For interactive analysis with advanced techniques:

```bash
jupyter notebook src/advanced_analysis.ipynb
```

## Project Structure

```
vitalab/
├── data/            # Directory for storing data files
├── docs/            # Documentation
│   └── usage.md     # Detailed usage guide
├── src/             # Source code
│   ├── example.py           # Basic examples
│   ├── patient_analysis.py  # Patient analysis tools
│   └── advanced_analysis.ipynb  # Jupyter notebook for advanced analysis
├── requirements.txt # Project dependencies
├── run.sh           # Setup script
└── setup.py         # Package setup script
```

## Documentation

For detailed documentation on how to use the library, see [docs/usage.md](docs/usage.md).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

This project uses the VitalDB open dataset created by Seoul National University Hospital. If you use VitalDB data in your research, please cite:

Lee HC, Park Y, Yoon SB, Yang SM, Park D, Jung CW. VitalDB, a high-fidelity multi-parameter vital signs database in surgical patients. Sci Data. 2022 Jun 8;9(1):279. 