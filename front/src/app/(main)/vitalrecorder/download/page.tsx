'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from "@/components/providers/LanguageProvider";
// JSON 파일에서 데이터 가져오기
import vitalRecorderData from '@/lib/constants/vitalrecorder.json';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, CheckCircle2, ArrowLeft, AlertCircle, HardDrive, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type VersionType = {
  id: string;
  version: string;
  os: string;
  filename: string;
  fileSize: string;
  uploadDate: string;
  notes: string;
  isActive: boolean;
  downloadUrl: string;
};

export default function DownloadPage() {
  const { t } = useLanguage();
  const [selectedOS, setSelectedOS] = useState("windows");
  const [selectedVersion, setSelectedVersion] = useState("");
  const [activeVersions, setActiveVersions] = useState<VersionType[]>([]);
  const [meta, setMeta] = useState(vitalRecorderData.meta);
  const [osTypes, setOsTypes] = useState(vitalRecorderData.osTypes);
  
  // 페이지 로드 시 스크롤 맨 위로 및 데이터 로드
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // 활성화된 버전만 필터링
    const active = vitalRecorderData.versions.filter(v => v.isActive);
    setActiveVersions(active);
    
    // 기본값으로 가장 최신 Windows 버전 선택
    if (active.length > 0) {
      const windowsVersions = active.filter(v => v.os === 'windows');
      if (windowsVersions.length > 0) {
        setSelectedVersion(windowsVersions[0].version);
      } else {
        setSelectedVersion(active[0].version);
        setSelectedOS(active[0].os);
      }
    }
  }, []);

  // 시스템 요구사항 (예시)
  const systemRequirements = {
    windows: {
      os: "Windows 10 or later",
      cpu: "Intel Core i3 / AMD Ryzen 3 or higher",
      ram: "4GB RAM",
      storage: "500MB available space"
    },
    "raspberry-32": {
      os: "Raspberry Pi OS",
      cpu: "Raspberry Pi 3 or higher",
      ram: "2GB RAM",
      storage: "500MB available space"
    },
    "raspberry-64": {
      os: "Raspberry Pi OS 64-bit",
      cpu: "Raspberry Pi 4 or higher",
      ram: "4GB RAM",
      storage: "500MB available space"
    },
    ubuntu: {
      os: "Ubuntu 18.04 LTS or later",
      cpu: "Intel Core i3 / AMD Ryzen 3 or higher",
      ram: "4GB RAM",
      storage: "500MB available space"
    }
  };

  // 선택된 OS와 버전에 맞는 다운로드 파일 찾기
  const getDownloadFile = () => {
    return activeVersions.find(v => v.os === selectedOS && v.version === selectedVersion);
  };

  const currentRequirements = systemRequirements[selectedOS as keyof typeof systemRequirements];
  const downloadFile = getDownloadFile();

  // 버전 목록 (중복 제거)
  const uniqueVersions = Array.from(new Set(activeVersions.map(v => v.version))).sort((a, b) => {
    // 버전 비교 (예: 1.15.5 > 1.15.4)
    return b.localeCompare(a, undefined, { numeric: true });
  });

  return (
    <div className="flex flex-col flex-1 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 py-10 md:py-16">
        <div className="container mx-auto px-4 text-white">
          <Link href="/vitalrecorder" className="inline-flex items-center gap-2 mb-6 text-blue-100 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to VitalRecorder</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Download VitalRecorder</h1>
              <p className="text-blue-100 max-w-2xl">
                Select your operating system and version to download VitalRecorder for your research needs.
              </p>
            </div>
            
            <Badge variant="secondary" className="bg-white/20 text-white self-start md:self-auto px-3 py-1.5">
              {meta.downloadCount.toLocaleString()}+ Downloads
            </Badge>
          </div>
        </div>
      </section>
      
      {/* Download Options */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg mb-10">
            <CardHeader className="pb-0">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Download VitalRecorder {uniqueVersions[0] || ''}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Choose your platform and version below to download VitalRecorder.
              </p>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* OS Selection */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                    Select Operating System
                  </h3>
                  
                  <Tabs defaultValue={selectedOS} onValueChange={setSelectedOS} className="w-full">
                    <TabsList className="grid grid-cols-2 mb-3 w-full">
                      <TabsTrigger value="windows" className="gap-2">
                        <Image 
                          src="/images/icons/windows.png" 
                          alt="Windows" 
                          width={18} 
                          height={18}
                          className="opacity-70"
                        />
                        <span>Windows</span>
                      </TabsTrigger>
                      <TabsTrigger value="ubuntu" className="gap-2">
                        <Image 
                          src="/images/icons/ubuntu.png" 
                          alt="Ubuntu" 
                          width={18} 
                          height={18} 
                          className="opacity-70"
                        />
                        <span>Ubuntu</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsList className="grid grid-cols-2 w-full">
                      <TabsTrigger value="raspberry-32" className="gap-2 text-xs sm:text-sm">
                        <Image 
                          src="/images/icons/raspberry-pi.png" 
                          alt="Raspberry Pi" 
                          width={18} 
                          height={18}
                          className="opacity-70" 
                        />
                        <span>Raspberry Pi 32bit</span>
                      </TabsTrigger>
                      <TabsTrigger value="raspberry-64" className="gap-2 text-xs sm:text-sm">
                        <Image 
                          src="/images/icons/raspberry-pi.png" 
                          alt="Raspberry Pi" 
                          width={18} 
                          height={18}
                          className="opacity-70" 
                        />
                        <span>Raspberry Pi 64bit</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span>System Requirements</span>
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 dark:text-gray-400 w-24 flex-shrink-0">OS:</span>
                        <span className="text-gray-800 dark:text-gray-200">{currentRequirements.os}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 dark:text-gray-400 w-24 flex-shrink-0">CPU:</span>
                        <span className="text-gray-800 dark:text-gray-200">{currentRequirements.cpu}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 dark:text-gray-400 w-24 flex-shrink-0">RAM:</span>
                        <span className="text-gray-800 dark:text-gray-200">{currentRequirements.ram}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 dark:text-gray-400 w-24 flex-shrink-0">Storage:</span>
                        <span className="text-gray-800 dark:text-gray-200">{currentRequirements.storage}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Version Selection */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                    Select Version
                  </h3>
                  
                  <div className="mb-4">
                    <select 
                      value={selectedVersion}
                      onChange={(e) => setSelectedVersion(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {uniqueVersions.map((version) => {
                        // 해당 OS에 대한 버전이 있는지 확인
                        const versionForOS = activeVersions.find(v => v.version === version && v.os === selectedOS);
                        if (!versionForOS) return null;
                        
                        return (
                          <option key={version} value={version}>
                            v{version} - {versionForOS.notes} {version === uniqueVersions[0] ? "(Latest)" : ""}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  
                  <div className="mt-6 mb-2">
                    {downloadFile ? (
                      <Link href={downloadFile.downloadUrl} target="_blank">
                        <Button className="w-full gap-2 py-6 text-lg" size="lg">
                          <Download className="h-5 w-5" />
                          <span>Download v{selectedVersion}</span>
                        </Button>
                      </Link>
                    ) : (
                      <Button className="w-full gap-2 py-6 text-lg" size="lg" disabled>
                        <AlertCircle className="h-5 w-5" />
                        <span>Version not available</span>
                      </Button>
                    )}
                  </div>
                  
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    For {osTypes.find(os => os.value === selectedOS)?.label || selectedOS}
                  </p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="bg-gray-50 dark:bg-gray-800 px-6 py-4">
              <div className="flex items-start gap-3 w-full">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Installation Note</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    After downloading, extract the files and run the installer. For detailed installation instructions, 
                    please refer to our <Link href="/docs/vitalrecorder/installation" className="text-blue-600 dark:text-blue-400 hover:underline">documentation</Link>.
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
          
          {/* Release Notes */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Release Notes
            </h3>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {uniqueVersions.map((version, index) => {
                    // 해당 버전의 첫 번째 항목을 찾아 노트 표시
                    const versionItem = activeVersions.find(v => v.version === version);
                    if (!versionItem) return null;
                    
                    return (
                      <div key={version} className={`${index > 0 ? 'pt-6 border-t border-gray-100 dark:border-gray-700' : ''}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Version {version}</h4>
                          <Badge variant="outline" className="font-mono">
                            {index === 0 ? 'Latest' : `v${version}`}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {versionItem.notes}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Released on {versionItem.uploadDate}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Citation */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Citation
            </h3>
            
            <Card className="border-0 shadow-md overflow-hidden">
              <CardContent className="p-6">
                <p className="text-sm mb-4">
                  If you use VitalRecorder in your research, please cite:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-mono break-words">{meta.citation}</p>
                  <div className="mt-3">
                    <Link 
                      href={meta.citationLink} 
                      target="_blank" 
                      className="text-blue-600 dark:text-blue-400 text-sm inline-flex items-center gap-1 hover:underline"
                    >
                      View Publication
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
} 