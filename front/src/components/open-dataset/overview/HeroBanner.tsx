'use client';

import { motion } from "framer-motion";
import { Download, Database, FileText, BarChart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function HeroBanner() {
    return (
        <motion.div 
            className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl overflow-hidden mb-8 p-8 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-60 h-60 bg-white opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-300 opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            
            <div className="relative z-10">
                <Badge variant="info" className="mb-6">Open Database</Badge>
                <h1 className="font-bold text-3xl md:text-4xl m-0 mb-4">
                    VitalDB Open Dataset
                </h1>
                <p className="text-xl opacity-90 m-0 mb-6">
                    A comprehensive collection of high-resolution vital signs data from surgical patients
                </p>
                
                <div className="flex flex-wrap gap-4">
                    <Button 
                        variant="default" 
                        size="lg" 
                        className="bg-white text-blue-700 hover:bg-blue-50"
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Download Dataset
                    </Button>
                    <Button 
                        variant="outline" 
                        size="lg" 
                        className="border-white text-white hover:bg-white/10"
                    >
                        <FileText className="mr-2 h-4 w-4" />
                        Read Documentation
                    </Button>
                </div>
                
                <div className="flex flex-wrap gap-x-8 gap-y-4 mt-8">
                    <div className="flex items-center">
                        <Database className="h-5 w-5 mr-2 text-blue-300" />
                        <span>6,388 Cases</span>
                    </div>
                    <div className="flex items-center">
                        <BarChart className="h-5 w-5 mr-2 text-blue-300" />
                        <span>500Hz Waveform Data</span>
                    </div>
                    <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-blue-300" />
                        <span>Medical Research</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
} 