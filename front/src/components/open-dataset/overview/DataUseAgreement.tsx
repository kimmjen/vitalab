'use client';

import { motion } from "framer-motion";

export default function DataUseAgreement() {
    return (
        <motion.section 
            id="data-use-agreement"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-6"
        >
            <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Data Use Agreement</h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 mt-2">
                <h3 className="font-medium text-gray-900 dark:text-white">1. Objective</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    This Agreement is made in accordance with Article 18 (2) 4 of the Personal Information Protection Act and Article 16 (3) of the Bioethics Act of Korea, and the Health Insurance Portability and Accountability Act of 1996 (HIPPA) Regulation 45 CFR Part 160 and Part 164. This agreement is intended to specify the details necessary to allow the access of data users (hereinafter referred to as the "User") to the limited data set (hereinafter referred to as the "Data") provided by the VitalDB team (hereinafter referred to as the "Provider").
                </p>

                <h3 className="font-medium text-gray-900 dark:text-white mt-3">2. Terms</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Unless otherwise specified, the definition of terms used in this Agreement shall be governed by the Personal Information Protection Law of the Republic of Korea and the United States HIPPA regulations.
                </p>

                <h3 className="font-medium text-gray-900 dark:text-white mt-3">3. License</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Users are permitted to use dataset from the Provider website subject to our terms of use. The dataset will be released to Users under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) license. This license type has been applied to the VitalDB Open Dataset in order to maximize the dissemination and use of the Data.
                </p>

                <button className="mt-3 text-blue-600 hover:text-blue-800 underline text-sm">
                    Read Full Agreement
                </button>
            </div>
        </motion.section>
    );
} 