'use client';

import { motion } from "framer-motion";

export default function HemodynamicParameters() {
    return (
        <motion.section 
            id="hemodynamic-parameters"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-6"
        >
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Hemodynamic Parameters</h3>
            <p className="text-sm italic text-gray-700 dark:text-gray-300 mb-2">* The parameter name is in the form of "device name / data track name". W=waveform; N=numeric; S=string</p>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                    <tr className="bg-blue-600 text-white">
                        <th className="p-3">Parameter</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Type/Hz</th>
                        <th className="p-3">Unit</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="p-3 border">SNUADC/ART</td>
                        <td className="p-3 border">Arterial pressure wave</td>
                        <td className="p-3 border">W/500</td>
                        <td className="p-3 border">mmHg</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">SNUADC/CVP</td>
                        <td className="p-3 border">Central venous pressure wave</td>
                        <td className="p-3 border">W/500</td>
                        <td className="p-3 border">mmHg</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">SNUADC/ECG_II</td>
                        <td className="p-3 border">ECG lead II wave</td>
                        <td className="p-3 border">W/500</td>
                        <td className="p-3 border">mV</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">SNUADC/ECG_V5</td>
                        <td className="p-3 border">ECG lead V5 wave</td>
                        <td className="p-3 border">W/500</td>
                        <td className="p-3 border">mV</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">SNUADC/FEM</td>
                        <td className="p-3 border">Femoral arterial pressure wave</td>
                        <td className="p-3 border">W/500</td>
                        <td className="p-3 border">mmHg</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">SNUADC/PLETH</td>
                        <td className="p-3 border">Plethysmography wave</td>
                        <td className="p-3 border">W/500</td>
                        <td className="p-3 border">unitless</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">Solar8000/ART_DBP</td>
                        <td className="p-3 border">Diastolic arterial pressure</td>
                        <td className="p-3 border">N</td>
                        <td className="p-3 border">mmHg</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">Solar8000/ART_MBP</td>
                        <td className="p-3 border">Mean arterial pressure</td>
                        <td className="p-3 border">N</td>
                        <td className="p-3 border">mmHg</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">Solar8000/ART_SBP</td>
                        <td className="p-3 border">Systolic arterial pressure</td>
                        <td className="p-3 border">N</td>
                        <td className="p-3 border">mmHg</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">Solar8000/BT</td>
                        <td className="p-3 border">Body temperature</td>
                        <td className="p-3 border">N</td>
                        <td className="p-3 border">℃</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    View All Hemodynamic Parameters
                </button>
            </div>
        </motion.section>
    );
} 