'use client';

import { motion } from "framer-motion";

export default function DatasetSummary() {
    return (
        <motion.section 
            id="dataset-summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Dataset Summary</h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>The data was obtained from non-cardiac (general, thoracic, urologic, and gynaecologic) surgery patients who underwent routine or emergency surgery in 10 out of 31 operating rooms of Seoul National University Hospital, Seoul, Republic of Korea.</li>
                <li>The acquisition and release of the data was approved by the Institutional Review Board of Seoul National University Hospital (H-1408-101-605). The study was also registered at clinicaltrials.gov (NCT02914444).</li>
                <li>Case files were recorded in the form of vital files using Vital Recorder version 1.7.4. Each case file contains high-resolution data with a time resolution of 500 Hz for wave data and 1-7 seconds for numeric data, with an average of 2.8 million data points per case.</li>
                <li>The dataset consists of a total of 557,622 (average 87, range 16-136) data tracks from 6,388 cases. All data tracks in the vital file were extracted, converted to csv, and compressed with gzip.</li>
            </ul>

            <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse">
                    <thead>
                    <tr className="bg-blue-600 text-white">
                        <th className="p-3 border">Dataset Summary</th>
                        <th className="p-3 border">General surgery<br/>(n = 4,930)</th>
                        <th className="p-3 border">Thoracic surgery<br/>(n = 1,111)</th>
                        <th className="p-3 border">Gynecology<br/>(n = 230)</th>
                        <th className="p-3 border">Urology<br/>(n = 117)</th>
                        <th className="p-3 border">Total<br/>(n = 6,388)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                        <td className="p-3 border font-medium" colSpan={6}>Demographic</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">Sex (male)</td>
                        <td className="p-3 border">2,524 (51.2%)</td>
                        <td className="p-3 border">618 (55.6%)</td>
                        <td className="p-3 border">0 (0%)</td>
                        <td className="p-3 border">101 (86.3%)</td>
                        <td className="p-3 border">3,243 (50.8%)</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">Age (years)</td>
                        <td className="p-3 border">59 (48-68)</td>
                        <td className="p-3 border">61 (52-70)</td>
                        <td className="p-3 border">45 (35-55)</td>
                        <td className="p-3 border">64 (58-72)</td>
                        <td className="p-3 border">59 (48-68)</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">Height (cm)</td>
                        <td className="p-3 border">162 (156-169)</td>
                        <td className="p-3 border">163 (156-169)</td>
                        <td className="p-3 border">159 (155-163)</td>
                        <td className="p-3 border">168 (161-173)</td>
                        <td className="p-3 border">162 (156-169)</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">Weight (kg)</td>
                        <td className="p-3 border">60 (53-69)</td>
                        <td className="p-3 border">61 (54-69)</td>
                        <td className="p-3 border">59 (53-66)</td>
                        <td className="p-3 border">69 (62-77)</td>
                        <td className="p-3 border">61 (53-69)</td>
                    </tr>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                        <td className="p-3 border font-medium" colSpan={6}>Surgical approach</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">Open</td>
                        <td className="p-3 border">3,104 (63.0%)</td>
                        <td className="p-3 border">190 (17.1%)</td>
                        <td className="p-3 border">65 (28.3%)</td>
                        <td className="p-3 border">6 (5.1%)</td>
                        <td className="p-3 border">3,368 (52.7%)</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">Videoscopic</td>
                        <td className="p-3 border">1,691 (34.2%)</td>
                        <td className="p-3 border">889 (80.0%)</td>
                        <td className="p-3 border">140 (60.9%)</td>
                        <td className="p-3 border">34 (29.1%)</td>
                        <td className="p-3 border">2,701 (42.3%)</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">Robotic</td>
                        <td className="p-3 border">135 (2.7%)</td>
                        <td className="p-3 border">32 (2.9%)</td>
                        <td className="p-3 border">25 (10.9%)</td>
                        <td className="p-3 border">77 (65.8%)</td>
                        <td className="p-3 border">269 (4.2%)</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse">
                    <thead>
                    <tr className="bg-blue-600 text-white">
                        <th className="p-3 border">Device</th>
                        <th className="p-3 border">Device type</th>
                        <th className="p-3 border">Company</th>
                        <th className="p-3 border">Parameters</th>
                        <th className="p-3 border">Data type</th>
                        <th className="p-3 border">Number of parameters</th>
                        <th className="p-3 border">Acquisition interval (sec)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="p-3 border">Tram-Rac 4A (SNUADC)</td>
                        <td className="p-3 border">Patient monitor</td>
                        <td className="p-3 border">GE healthcare</td>
                        <td className="p-3 border">ECG, capnography, plethysmogram, respiration, blood pressures</td>
                        <td className="p-3 border">wave</td>
                        <td className="p-3 border">6</td>
                        <td className="p-3 border">1/500</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">Solar 8000M</td>
                        <td className="p-3 border">Patient monitor</td>
                        <td className="p-3 border">GE healthcare</td>
                        <td className="p-3 border">Heart rate, blood pressures, oxygen saturation, temperature, gas concentrations, etc.</td>
                        <td className="p-3 border">numeric</td>
                        <td className="p-3 border">44</td>
                        <td className="p-3 border">2</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">Primus</td>
                        <td className="p-3 border">Anesthesia machine</td>
                        <td className="p-3 border">Drager</td>
                        <td className="p-3 border">Gas concentrations, volumes and flows, airway pressures</td>
                        <td className="p-3 border">wave and numeric</td>
                        <td className="p-3 border">37</td>
                        <td className="p-3 border">1/62.5 for waves, 7 for numeric data</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </motion.section>
    );
} 