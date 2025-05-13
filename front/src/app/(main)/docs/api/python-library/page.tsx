'use client';

import { useEffect } from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Download, Code, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/components/providers/LanguageProvider';
import CodeBlock from '@/components/docs/CodeBlock';

export default function PythonLibraryPage() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 코드 샘플
  const installationCode = `pip install vitaldb`;
  const usageCode = `import vitaldb as vdb

# Load a case from the server
case = vdb.get_case(160)

# Print basic information about the case
print(f"Case ID: {case.caseid}")
print(f"Duration: {case.duration} seconds")
print(f"Tracks: {len(case.tracks)}")

# List available vital signs
for track_name in case.tracks:
    print(track_name)

# Get a specific vital sign (e.g., heart rate)
hr = case.get_track('SNUADC/HR')
print(f"HR values: {hr.values}")
print(f"HR times: {hr.times}")

# Plot heart rate
import matplotlib.pyplot as plt
plt.figure(figsize=(12, 6))
plt.plot(hr.times, hr.values)
plt.title('Heart Rate')
plt.xlabel('Time (seconds)')
plt.ylabel('HR (bpm)')
plt.grid(True)
plt.tight_layout()
plt.show()`;

  const analysisCode = `import vitaldb as vdb
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Load multiple cases
cases = [vdb.get_case(i) for i in range(160, 170)]

# Extract mean arterial pressures from all cases
all_maps = []
for case in cases:
    try:
        map_track = case.get_track('SNUADC/ART_MBP')
        if map_track is not None:
            # Resample to 1 Hz
            resampled = map_track.resample(1)
            all_maps.append(resampled.values)
    except:
        pass

# Convert to pandas DataFrame for analysis
map_df = pd.DataFrame(all_maps).T
map_df.columns = [f'Case {i}' for i in range(len(all_maps))]

# Calculate statistics
map_mean = map_df.mean(axis=1)
map_std = map_df.std(axis=1)

# Plot with confidence interval
plt.figure(figsize=(12, 6))
plt.plot(map_mean, 'b-', label='Mean MAP')
plt.fill_between(
    range(len(map_mean)),
    map_mean - map_std,
    map_mean + map_std,
    color='b', alpha=0.2,
    label='±1 SD'
)
plt.title('Mean Arterial Pressure Across Multiple Cases')
plt.xlabel('Time (seconds)')
plt.ylabel('MAP (mmHg)')
plt.grid(True)
plt.legend()
plt.tight_layout()
plt.show()`;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">VitalDB Python Library</h1>
        <p className="text-lg text-muted-foreground">
          Convenient Python interface for accessing and analyzing vital signs data from the VitalDB database.
        </p>
      </motion.div>

      <section className="mb-10">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The VitalDB Python Library provides a convenient way to access and analyze vital signs data from the VitalDB database.
          This library enables researchers and data scientists to work with high-resolution physiological data directly in Python.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button asChild>
            <a href="https://pypi.org/project/vitaldb/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
              <Download className="mr-2 h-4 w-4" />
              <span>Download from PyPI</span>
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://github.com/vitaldb/vitaldb-python" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
              <Code className="mr-2 h-4 w-4" />
              <span>Source Code</span>
            </a>
          </Button>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You can install the VitalDB Python library using pip:
        </p>
        <CodeBlock code={installationCode} language="bash" />
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Here's a simple example to get you started with the VitalDB Python library:
        </p>
        <CodeBlock code={usageCode} language="python" />
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Advanced Usage</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The VitalDB Python library supports more advanced analysis across multiple cases:
        </p>
        <CodeBlock code={analysisCode} language="python" />
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Easy access to VitalDB data directly from Python</li>
          <li>Support for loading, analyzing, and visualizing high-resolution physiological data</li>
          <li>Efficient data processing with NumPy integration</li>
          <li>Resampling, filtering, and statistical analysis tools</li>
          <li>Compatible with popular data science libraries like Pandas and Matplotlib</li>
        </ul>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">API Reference</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Complete documentation of all available classes and methods.
            </p>
            <Button variant="link" asChild>
              <Link href="#" className="inline-flex items-center">
                <span>View API Reference</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Example Notebooks</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Jupyter notebooks with example analyses and visualizations.
            </p>
            <Button variant="link" asChild>
              <Link href="#" className="inline-flex items-center">
                <span>View Examples</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8">
        <div className="flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href="/docs/api/web-api" className="inline-flex items-center">
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              <span>Web API</span>
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs" className="inline-flex items-center">
              <span>Documentation Home</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 