'use client';

import { motion } from "framer-motion";
import ClinicalInformation from "./parameters/ClinicalInformation";
import HemodynamicParameters from "./parameters/HemodynamicParameters";
import LabResults from "./parameters/LabResults";

export default function ParameterList() {
    return (
        <motion.section 
            id="parameter-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
            <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Parameter List</h2>
            
            {/* Clinical Information */}
            <ClinicalInformation />
            
            {/* Hemodynamic Parameters */}
            <HemodynamicParameters />
            
            {/* Lab Results */}
            <LabResults />
        </motion.section>
    );
} 