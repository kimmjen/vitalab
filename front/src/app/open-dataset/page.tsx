// src/app/open-dataset/page.tsx
import { TableOfContents } from "@/components/open-dataset/TableOfContents"
import { TabsContent } from "@/components/ui/tabs"

export default function OpenDatasetPage() {
    return (
        <TabsContent value="overview" className="mt-6">
            <div className="flex gap-8">
                {/* Sidebar */}
                <div className="w-72 shrink-0">
                    <TableOfContents />
                </div>

                {/* Main Content */}
                <div className="flex-1 prose max-w-none">
                    <h1 className="font-bold text-2xl">VitalDB Overview</h1>

                    <section id="introduction">
                        <h2 className="font-bold text-xl">Introduction</h2>
                        <p>
                            This is a comprehensive dataset of 6,388 surgical patients composed of intraoperative biosignals and clinical information.
                            The biosignal data included in the dataset is high quality data such as 500 Hz waveform signals and numeric values at intervals of 1-7 seconds.
                            More than 60 surgery related clinical information is also provided to help interpret the signals.
                        </p>
                        <p>
                            The dataset is provided free of charge to help researchers who want to study and develop new medical AI algorithms using monitoring signals from surgical patients.
                            We expect that the distribution of this world's largest biosignal dataset will greatly contribute to the advancement of medical AI research.
                        </p>
                        <div className="bg-blue-50 p-4 rounded-md border border-blue-200 my-4">
                            <p className="text-sm">
                                If you use the VitalDB open dataset in your research, please cite the following publication:
                            </p>
                            <p className="text-sm italic">
                                Lee HC, Park Y, Yoon SB, Yang SM, Park D, Jung CW. VitalDB, a high-fidelity multi-parameter vital signs database in surgical patients.
                                Sci Data. 2022 Jun 8;9(1):279. doi: 10.1038/s41597-022-01411-5. PMID: 35676300; PMCID: PMC9178032.
                            </p>
                        </div>
                    </section>

                    <section id="dataset-summary">
                        <h2 className="font-bold text-xl">Dataset Summary</h2>
                        <ul>
                            <li>The data was obtained from non-cardiac (general, thoracic, urologic, and gynaecologic) surgery patients who underwent routine or emergency surgery in 10 out of 31 operating rooms of Seoul National University Hospital, Seoul, Republic of Korea.</li>
                            <li>The acquisition and release of the data was approved by the Institutional Review Board of Seoul National University Hospital (H-1408-101-605). The study was also registered at clinicaltrials.gov (NCT02914444).</li>
                            <li>Case files were recorded in the form of vital files using Vital Recorder version 1.7.4. Each case file contains high-resolution data with a time resolution of 500 Hz for wave data and 1-7 seconds for numeric data, with an average of 2.8 million data points per case.</li>
                            <li>The dataset consists of a total of 557,622 (average 87, range 16-136) data tracks from 6,388 cases. All data tracks in the vital file were extracted, converted to csv, and compressed with gzip.</li>
                        </ul>

                        <div className="overflow-x-auto my-4">
                            <table className="min-w-full border-collapse">
                                <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="p-2 border">Dataset Summary</th>
                                    <th className="p-2 border">General surgery<br/>(n = 4,930)</th>
                                    <th className="p-2 border">Thoracic surgery<br/>(n = 1,111)</th>
                                    <th className="p-2 border">Gynecology<br/>(n = 230)</th>
                                    <th className="p-2 border">Urology<br/>(n = 117)</th>
                                    <th className="p-2 border">Total<br/>(n = 6,388)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="bg-gray-100">
                                    <td className="p-2 border font-medium" colSpan={6}>Demographic</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">Sex (male)</td>
                                    <td className="p-2 border">2,524 (51.2%)</td>
                                    <td className="p-2 border">618 (55.6%)</td>
                                    <td className="p-2 border">0 (0%)</td>
                                    <td className="p-2 border">101 (86.3%)</td>
                                    <td className="p-2 border">3,243 (50.8%)</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">Age (years)</td>
                                    <td className="p-2 border">59 (48-68)</td>
                                    <td className="p-2 border">61 (52-70)</td>
                                    <td className="p-2 border">45 (35-55)</td>
                                    <td className="p-2 border">64 (58-72)</td>
                                    <td className="p-2 border">59 (48-68)</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">Height (cm)</td>
                                    <td className="p-2 border">162 (156-169)</td>
                                    <td className="p-2 border">163 (156-169)</td>
                                    <td className="p-2 border">159 (155-163)</td>
                                    <td className="p-2 border">168 (161-173)</td>
                                    <td className="p-2 border">162 (156-169)</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">Weight (kg)</td>
                                    <td className="p-2 border">60 (53-69)</td>
                                    <td className="p-2 border">61 (54-69)</td>
                                    <td className="p-2 border">59 (53-66)</td>
                                    <td className="p-2 border">69 (62-77)</td>
                                    <td className="p-2 border">61 (53-69)</td>
                                </tr>
                                <tr className="bg-gray-100">
                                    <td className="p-2 border font-medium" colSpan={6}>Surgical approach</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">Open</td>
                                    <td className="p-2 border">3,104 (63.0%)</td>
                                    <td className="p-2 border">190 (17.1%)</td>
                                    <td className="p-2 border">65 (28.3%)</td>
                                    <td className="p-2 border">6 (5.1%)</td>
                                    <td className="p-2 border">3,368 (52.7%)</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">Videoscopic</td>
                                    <td className="p-2 border">1,691 (34.2%)</td>
                                    <td className="p-2 border">889 (80.0%)</td>
                                    <td className="p-2 border">140 (60.9%)</td>
                                    <td className="p-2 border">34 (29.1%)</td>
                                    <td className="p-2 border">2,701 (42.3%)</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">Robotic</td>
                                    <td className="p-2 border">135 (2.7%)</td>
                                    <td className="p-2 border">32 (2.9%)</td>
                                    <td className="p-2 border">25 (10.9%)</td>
                                    <td className="p-2 border">77 (65.8%)</td>
                                    <td className="p-2 border">269 (4.2%)</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="overflow-x-auto my-4">
                            <table className="min-w-full border-collapse">
                                <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="p-2 border">Device</th>
                                    <th className="p-2 border">Device type</th>
                                    <th className="p-2 border">Company</th>
                                    <th className="p-2 border">Parameters</th>
                                    <th className="p-2 border">Data type</th>
                                    <th className="p-2 border">Number of parameters</th>
                                    <th className="p-2 border">Acquisition interval (sec)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="p-2 border">Tram-Rac 4A (SNUADC)</td>
                                    <td className="p-2 border">Patient monitor</td>
                                    <td className="p-2 border">GE healthcare</td>
                                    <td className="p-2 border">ECG, capnography, plethysmogram, respiration, blood pressures</td>
                                    <td className="p-2 border">wave</td>
                                    <td className="p-2 border">6</td>
                                    <td className="p-2 border">1/500</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">Solar 8000M</td>
                                    <td className="p-2 border">Patient monitor</td>
                                    <td className="p-2 border">GE healthcare</td>
                                    <td className="p-2 border">Heart rate, blood pressures, oxygen saturation, temperature, gas concentrations, etc.</td>
                                    <td className="p-2 border">numeric</td>
                                    <td className="p-2 border">44</td>
                                    <td className="p-2 border">2</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">Primus</td>
                                    <td className="p-2 border">Anesthesia machine</td>
                                    <td className="p-2 border">Drager</td>
                                    <td className="p-2 border">Gas concentrations, volumes and flows, airway pressures</td>
                                    <td className="p-2 border">wave and numeric</td>
                                    <td className="p-2 border">37</td>
                                    <td className="p-2 border">1/62.5 for waves, 7 for numeric data</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="parameter-list">
                        <h2 className="font-bold text-xl">Parameter List</h2>
                        <section id="clinical-information">
                            <h3 className="font-bold text-lg">Clinical Information</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                    <tr className="bg-blue-500 text-white">
                                        <th className="p-2">Parameter</th>
                                        <th className="p-2">Data Source</th>
                                        <th className="p-2">Description</th>
                                        <th className="p-2">Unit</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="p-2 border">caseid</td>
                                        <td className="p-2 border">Random</td>
                                        <td className="p-2 border">Case ID; Random number between 00001 and 06388</td>
                                        <td className="p-2 border"></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">subjectid</td>
                                        <td className="p-2 border">EMR</td>
                                        <td className="p-2 border">Subject ID; Deidentified hospital ID of patient</td>
                                        <td className="p-2 border"></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">casestart</td>
                                        <td className="p-2 border">Case file</td>
                                        <td className="p-2 border">Recording Start Time; Set to 0 for anonymization</td>
                                        <td className="p-2 border">sec</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">caseend</td>
                                        <td className="p-2 border">Case file</td>
                                        <td className="p-2 border">Recording End Time; from casestart</td>
                                        <td className="p-2 border">sec</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">anestart</td>
                                        <td className="p-2 border">Case file</td>
                                        <td className="p-2 border">Anesthesia start time; from casestart</td>
                                        <td className="p-2 border">sec</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">aneend</td>
                                        <td className="p-2 border">Case file</td>
                                        <td className="p-2 border">Anesthesia end time; from casestart</td>
                                        <td className="p-2 border">sec</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">opstart</td>
                                        <td className="p-2 border">Case file</td>
                                        <td className="p-2 border">Operation start time; from casestart</td>
                                        <td className="p-2 border">sec</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">opend</td>
                                        <td className="p-2 border">Case file</td>
                                        <td className="p-2 border">Operation end time; from casestart</td>
                                        <td className="p-2 border">sec</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">age</td>
                                        <td className="p-2 border">EMR</td>
                                        <td className="p-2 border">Age</td>
                                        <td className="p-2 border">years</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">sex</td>
                                        <td className="p-2 border">EMR</td>
                                        <td className="p-2 border">Sex</td>
                                        <td className="p-2 border">M/F</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">height</td>
                                        <td className="p-2 border">EMR</td>
                                        <td className="p-2 border">Height</td>
                                        <td className="p-2 border">cm</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">weight</td>
                                        <td className="p-2 border">EMR</td>
                                        <td className="p-2 border">Weight</td>
                                        <td className="p-2 border">kg</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                                    View All Clinical Parameters
                                </button>
                            </div>
                        </section>

                        <section id="hemodynamic-parameters" className="mt-6">
                            <h3 className="font-bold text-lg">Hemodynamic Parameters</h3>
                            <p className="text-sm italic mb-2">* The parameter name is in the form of "device name / data track name". W=waveform; N=numeric; S=string</p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                    <tr className="bg-blue-500 text-white">
                                        <th className="p-2">Parameter</th>
                                        <th className="p-2">Description</th>
                                        <th className="p-2">Type/Hz</th>
                                        <th className="p-2">Unit</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="p-2 border">SNUADC/ART</td>
                                        <td className="p-2 border">Arterial pressure wave</td>
                                        <td className="p-2 border">W/500</td>
                                        <td className="p-2 border">mmHg</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">SNUADC/CVP</td>
                                        <td className="p-2 border">Central venous pressure wave</td>
                                        <td className="p-2 border">W/500</td>
                                        <td className="p-2 border">mmHg</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">SNUADC/ECG_II</td>
                                        <td className="p-2 border">ECG lead II wave</td>
                                        <td className="p-2 border">W/500</td>
                                        <td className="p-2 border">mV</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">SNUADC/ECG_V5</td>
                                        <td className="p-2 border">ECG lead V5 wave</td>
                                        <td className="p-2 border">W/500</td>
                                        <td className="p-2 border">mV</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">SNUADC/FEM</td>
                                        <td className="p-2 border">Femoral arterial pressure wave</td>
                                        <td className="p-2 border">W/500</td>
                                        <td className="p-2 border">mmHg</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">SNUADC/PLETH</td>
                                        <td className="p-2 border">Plethysmography wave</td>
                                        <td className="p-2 border">W/500</td>
                                        <td className="p-2 border">unitless</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Solar8000/ART_DBP</td>
                                        <td className="p-2 border">Diastolic arterial pressure</td>
                                        <td className="p-2 border">N</td>
                                        <td className="p-2 border">mmHg</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Solar8000/ART_MBP</td>
                                        <td className="p-2 border">Mean arterial pressure</td>
                                        <td className="p-2 border">N</td>
                                        <td className="p-2 border">mmHg</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Solar8000/ART_SBP</td>
                                        <td className="p-2 border">Systolic arterial pressure</td>
                                        <td className="p-2 border">N</td>
                                        <td className="p-2 border">mmHg</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Solar8000/BT</td>
                                        <td className="p-2 border">Body temperature</td>
                                        <td className="p-2 border">N</td>
                                        <td className="p-2 border">℃</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                                    View All Hemodynamic Parameters
                                </button>
                            </div>
                        </section>

                        <section id="lab-results" className="mt-6">
                            <h3 className="font-bold text-lg">Lab Results</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                    <tr className="bg-blue-500 text-white">
                                        <th className="p-2">Parameter</th>
                                        <th className="p-2">Data Source</th>
                                        <th className="p-2">Category</th>
                                        <th className="p-2">Description</th>
                                        <th className="p-2">Unit</th>
                                        <th className="p-2">Reference value</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="p-2 border">wbc</td>
                                        <td className="p-2 border">EMR</td>
                                        <td className="p-2 border">CBC</td>
                                        <td className="p-2 border">White blood cell count</td>
                                        <td className="p-2 border">×1000/mcL</td>
                                        <td className="p-2 border">4~10</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">hb</td>
                                        <td className="p-2 border">EMR</td>
                                        <td className="p-2 border">CBC</td>
                                        <td className="p-2 border">Hemoglobin</td>
                                        <td className="p-2 border">g/dL</td>
                                        <td className="p-2 border">13~17</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">hct</td>
                                        <td className="p-2 border">EMR</td>
                                        <td className="p-2 border">CBC</td>
                                        <td className="p-2 border">Hematocrit</td>
                                        <td className="p-2 border">%</td>
                                        <td className="p-2 border">39~52</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">plt</td>
                                        <td className="p-2 border">EMR</td>
                                        <td className="p-2 border">CBC</td>
                                        <td className="p-2 border">Platelet count</td>
                                        <td className="p-2 border">×1000/mcL</td>
                                        <td className="p-2 border">130~400</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">esr</td>
                                        <td className="p-2 border">EMR</td>
                                        <td className="p-2 border">CBC</td>
                                        <td className="p-2 border">Erythrocyte sedimentation rate</td>
                                        <td className="p-2 border">mm/hr</td>
                                        <td className="p-2 border">0~9</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                                    View All Lab Results
                                </button>
                            </div>
                        </section>
                    </section>

                    <section id="data-use-agreement" className="mt-6">
                        <h2 className="font-bold text-xl">Data Use Agreement</h2>
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-2">
                            <h3 className="font-medium">1. Objective</h3>
                            <p className="text-sm mt-1">
                                This Agreement is made in accordance with Article 18 (2) 4 of the Personal Information Protection Act and Article 16 (3) of the Bioethics Act of Korea, and the Health Insurance Portability and Accountability Act of 1996 (HIPPA) Regulation 45 CFR Part 160 and Part 164. This agreement is intended to specify the details necessary to allow the access of data users (hereinafter referred to as the "User") to the limited data set (hereinafter referred to as the "Data") provided by the VitalDB team (hereinafter referred to as the "Provider").
                            </p>

                            <h3 className="font-medium mt-3">2. Terms</h3>
                            <p className="text-sm mt-1">
                                Unless otherwise specified, the definition of terms used in this Agreement shall be governed by the Personal Information Protection Law of the Republic of Korea and the United States HIPPA regulations.
                            </p>

                            <h3 className="font-medium mt-3">3. License</h3>
                            <p className="text-sm mt-1">
                                Users are permitted to use dataset from the Provider website subject to our terms of use. The dataset will be released to Users under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) license. This license type has been applied to the VitalDB Open Dataset in order to maximize the dissemination and use of the Data.
                            </p>

                            <button className="mt-3 text-blue-600 hover:text-blue-800 underline text-sm">
                                Read Full Agreement
                            </button>
                        </div>
                    </section>

                    <section id="acknowledgement" className="mt-6">
                        <h2 className="font-bold text-xl">Acknowledgement</h2>
                        <p className="text-sm">
                            Our project is currently supported by the Korea Medical Device Development Fund grant funded by the Korea government (the Ministry of Science and ICT, the Ministry of Trade, Industry and Energy, the Ministry of Health & Welfare, Republic of Korea, the Ministry of Food and Drug Safety) (Project Number: KMDF_PR_20200901_0144, 9991006817); MSIT (Ministry of Science and ICT), Korea, under the ITRC (Information Technology Research Center) support program (IITP-2018-2018-0-01833); and National Research Foundation of Korea (NRF) grant funded by the Korea government (MSIT) (NRF-2018R1A5A1060031).
                        </p>
                        <p className="text-sm mt-2">
                            The project was previously supported by the National Research Foundation of Korea (NRF) grant funded by the Korean government (MEST) (NRF-2015R1A2A2A01003962).
                        </p>
                    </section>
                </div>
            </div>
        </TabsContent>
    )
}