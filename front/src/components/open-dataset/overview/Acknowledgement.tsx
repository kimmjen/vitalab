'use client';

import { motion } from "framer-motion";

export default function Acknowledgement() {
    return (
        <motion.section 
            id="acknowledgement"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-6"
        >
            <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Acknowledgement</h2>
            <p className="text-gray-700 dark:text-gray-300">
                Our project is currently supported by the Korea Medical Device Development Fund grant funded by the Korea government (the Ministry of Science and ICT, the Ministry of Trade, Industry and Energy, the Ministry of Health & Welfare, Republic of Korea, the Ministry of Food and Drug Safety) (Project Number: KMDF_PR_20200901_0144, 9991006817); MSIT (Ministry of Science and ICT), Korea, under the ITRC (Information Technology Research Center) support program (IITP-2018-2018-0-01833); and National Research Foundation of Korea (NRF) grant funded by the Korea government (MSIT) (NRF-2018R1A5A1060031).
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
                The project was previously supported by the National Research Foundation of Korea (NRF) grant funded by the Korean government (MEST) (NRF-2015R1A2A2A01003962).
            </p>
        </motion.section>
    );
} 