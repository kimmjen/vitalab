// src/components/home/HeroSection/StatsSlider.tsx
'use client';

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { STATS } from "@/lib/constants/home"
import {StatContent} from "@/components/home/HeroSection/StatContent";

export function StatsSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % STATS.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative max-w-3xl mx-auto px-12">
            <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2"
                onClick={() => setCurrentSlide((prev) => (prev - 1 + STATS.length) % STATS.length)}
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="text-lg min-h-[100px] flex items-center justify-center">
                <StatContent data={STATS[currentSlide].content} />
            </div>

            <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % STATS.length)}
            >
                <ChevronRight className="h-6 w-6" />
            </Button>

            <div className="flex justify-center space-x-2 mt-8">
                {STATS.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-8 h-1 rounded transition-colors ${
                            currentSlide === index ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}