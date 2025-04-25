// src/components/home/MainContent/VitalRecorderCard.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VITAL_RECORDER_VERSION } from "@/lib/constants/home";

export function VitalRecorderCard() {
    const { os, version, downloadCount, lastUpdate } = VITAL_RECORDER_VERSION;

    const handleDownload = () => {
        // 다운로드 로직 구현
        console.log('Downloading VitalRecorder...');
    };

    return (
        <Card className="bg-[#2980b9] text-white p-8">
            <h2 className="text-2xl mb-4 font-medium">VitalRecorder</h2>
            <p className="mb-4">Download latest version of VitalRecorder.</p>
            <p className="mb-6">
                The use of the VitalRecorder program is completely free.
                <br />
                <span className="text-sm">
          (Downloaded {downloadCount.toLocaleString()} times since {lastUpdate})
        </span>
            </p>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span>OS:</span>
                    <Button
                        variant="outline"
                        className="text-white border-white hover:bg-white/10"
                    >
                        {os[0].label}
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <span>Version:</span>
                    <Button
                        variant="outline"
                        className="text-white border-white hover:bg-white/10"
                    >
                        {version[0].label}
                    </Button>
                </div>
                <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white/10"
                    onClick={handleDownload}
                >
                    Download
                </Button>
            </div>
        </Card>
    );
}