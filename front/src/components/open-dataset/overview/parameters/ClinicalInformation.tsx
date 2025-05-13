'use client';

import { motion } from "framer-motion";

export default function ClinicalInformation() {
    return (
        <motion.section 
            id="clinical-information"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Clinical Information</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                    <tr className="bg-blue-600 text-white">
                        <th className="p-3">Parameter</th>
                        <th className="p-3">Data Source</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Unit</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="p-3 border">caseid</td>
                        <td className="p-3 border">Random</td>
                        <td className="p-3 border">Case ID; Random number between 00001 and 06388</td>
                        <td className="p-3 border"></td>
                    </tr>
                    <tr>
                        <td className="p-3 border">subjectid</td>
                        <td className="p-3 border">EMR</td>
                        <td className="p-3 border">Subject ID; Deidentified hospital ID of patient</td>
                        <td className="p-3 border"></td>
                    </tr>
                    <tr>
                        <td className="p-3 border">casestart</td>
                        <td className="p-3 border">Case file</td>
                        <td className="p-3 border">Recording Start Time; Set to 0 for anonymization</td>
                        <td className="p-3 border">sec</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">caseend</td>
                        <td className="p-3 border">Case file</td>
                        <td className="p-3 border">Recording End Time; from casestart</td>
                        <td className="p-3 border">sec</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">anestart</td>
                        <td className="p-3 border">Case file</td>
                        <td className="p-3 border">Anesthesia start time; from casestart</td>
                        <td className="p-3 border">sec</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">aneend</td>
                        <td className="p-3 border">Case file</td>
                        <td className="p-3 border">Anesthesia end time; from casestart</td>
                        <td className="p-3 border">sec</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">opstart</td>
                        <td className="p-3 border">Case file</td>
                        <td className="p-3 border">Operation start time; from casestart</td>
                        <td className="p-3 border">sec</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">opend</td>
                        <td className="p-3 border">Case file</td>
                        <td className="p-3 border">Operation end time; from casestart</td>
                        <td className="p-3 border">sec</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">age</td>
                        <td className="p-3 border">EMR</td>
                        <td className="p-3 border">Age</td>
                        <td className="p-3 border">years</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">sex</td>
                        <td className="p-3 border">EMR</td>
                        <td className="p-3 border">Sex</td>
                        <td className="p-3 border">M/F</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">height</td>
                        <td className="p-3 border">EMR</td>
                        <td className="p-3 border">Height</td>
                        <td className="p-3 border">cm</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">weight</td>
                        <td className="p-3 border">EMR</td>
                        <td className="p-3 border">Weight</td>
                        <td className="p-3 border">kg</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    View All Clinical Parameters
                </button>
            </div>
        </motion.section>
    );
} 