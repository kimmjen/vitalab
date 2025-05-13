// src/components/home/HeroSection/StatsSlider.tsx
'use client';

import { ChevronLeft, ChevronRight, Users } from "lucide-react"
import { useState, useEffect } from "react"
import { STATS } from "@/lib/constants/home"
import { StatContent } from "@/components/home/HeroSection/StatContent";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function StatsSlider() {
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto slide
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % STATS.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    // Handle slide navigation
    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + STATS.length) % STATS.length);
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % STATS.length);
    };

    return (
        <div className="relative px-2 md:px-0">
            <div className="min-h-[140px] sm:min-h-[160px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center w-full"
                    >
                        <StatContent data={STATS[currentSlide].content} />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-between items-center mt-4">
                <div className="flex gap-1.5">
                    {STATS.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                currentSlide === index 
                                    ? 'bg-blue-600 dark:bg-blue-500' 
                                    : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
                
                <div className="flex gap-2">
                    <button 
                        onClick={handlePrev}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button 
                        onClick={handleNext}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}