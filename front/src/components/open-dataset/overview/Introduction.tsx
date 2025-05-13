'use client';

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Introduction() {
    return (
        <motion.section 
            id="introduction" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Introduction</h2>
            <p className="text-gray-700 dark:text-gray-300">
                This is a comprehensive dataset of 6,388 surgical patients composed of intraoperative biosignals and clinical information.
                The biosignal data included in the dataset is high quality data such as 500 Hz waveform signals and numeric values at intervals of 1-7 seconds.
                More than 60 surgery related clinical information is also provided to help interpret the signals.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                The dataset is provided free of charge to help researchers who want to study and develop new medical AI algorithms using monitoring signals from surgical patients.
                We expect that the distribution of this world's largest biosignal dataset will greatly contribute to the advancement of medical AI research.
            </p>
            <Card variant="outline" className="my-6 overflow-hidden">
                <CardContent className="p-6 relative">
                    <div className="absolute right-0 bottom-0 opacity-10">
                        <Heart className="h-32 w-32 text-blue-500" />
                    </div>
                    <h3 className="text-blue-800 dark:text-blue-300 font-medium text-lg m-0 mb-2">Citation</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-200 mb-2">
                        If you use the VitalDB open dataset in your research, please cite the following publication:
                    </p>
                    <p className="text-sm italic text-blue-600 dark:text-blue-300 m-0">
                        Lee HC, Park Y, Yoon SB, Yang SM, Park D, Jung CW. VitalDB, a high-fidelity multi-parameter vital signs database in surgical patients.
                        Sci Data. 2022 Jun 8;9(1):279. doi: 10.1038/s41597-022-01411-5. PMID: 35676300; PMCID: PMC9178032.
                    </p>
                </CardContent>
            </Card>
        </motion.section>
    );
} 