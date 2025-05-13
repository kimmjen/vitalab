'use client';

import { motion } from "framer-motion";

export default function LabResults() {
    return (
        <motion.section 
            id="lab-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6"
        >
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Lab Results</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                    <tr className="bg-blue-600 text-white">
                        <th className="p-3">Parameter</th>
                        <th className="p-3">Data Source</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Unit</th>
                        <th className="p-3">Reference value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="p-3 border">wbc</td>
                        <td className="p-3 border">EMR</td>
                        <td className="p-3 border">CBC</td>
                        <td className="p-3 border">White blood cell count</td>
                        <td className="p-3 border">×1000/mcL</td>
                        <td className="p-3 border">4~10</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">hb</td>
                        <td className="p-3 border">EMR</td>
                        <td className="p-3 border">CBC</td>
                        <td className="p-3 border">Hemoglobin</td>
                        <td className="p-3 border">g/dL</td>
                        <td className="p-3 border">13~17</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">hct</td>
                        <td className="p-3 border">EMR</td>
                        <td className="p-3 border">CBC</td>
                        <td className="p-3 border">Hematocrit</td>
                        <td className="p-3 border">%</td>
                        <td className="p-3 border">39~52</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">plt</td>
                        <td className="p-3 border">EMR</td>
                        <td className="p-3 border">CBC</td>
                        <td className="p-3 border">Platelet count</td>
                        <td className="p-3 border">×1000/mcL</td>
                        <td className="p-3 border">130~400</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">esr</td>
                        <td className="p-3 border">EMR</td>
                        <td className="p-3 border">CBC</td>
                        <td className="p-3 border">Erythrocyte sedimentation rate</td>
                        <td className="p-3 border">mm/hr</td>
                        <td className="p-3 border">0~9</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    View All Lab Results
                </button>
            </div>
        </motion.section>
    );
} 