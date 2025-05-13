'use client';

import { useState } from 'react';
import { motion } from "framer-motion";
import { Search, FileBadge, Download, FileType, ExternalLink, Calendar, Award, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

// 출판물 데이터 타입
interface Publication {
  id: number;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi: string;
  url: string;
  abstract: string;
  category: 'research' | 'methodology' | 'review';
  citationCount: number;
  tags: string[];
}

// 임시 출판물 데이터
const PUBLICATIONS: Publication[] = [
  {
    id: 1,
    title: "VitalRecorder: A versatile program for recording and analyzing high-resolution time-synchronized physiological data from multiple anaesthesia devices",
    authors: "Lee HC, Jung CW",
    journal: "Scientific Reports",
    year: 2018,
    doi: "10.1038/s41598-018-20062-4",
    url: "https://www.nature.com/articles/s41598-018-20062-4",
    abstract: "VitalRecorder is a free research tool for automatic recording of high-resolution time-synchronised physiological data from multiple anaesthesia devices. It can record vital sign waveforms (e.g., ECG, arterial pressure, capnogram, plethysmogram) and numeric parameters from various patient monitors, anaesthesia machines, infusion pumps, and other medical devices.",
    category: 'methodology',
    citationCount: 87,
    tags: ['software', 'medical devices', 'vital signs', 'data acquisition']
  },
  {
    id: 2,
    title: "Prediction of Bispectral Index during Target-controlled Infusion of Propofol and Remifentanil: A Deep Learning Approach",
    authors: "Lee HC, Ryu HG, Chung EJ, Jung CW",
    journal: "Anesthesiology",
    year: 2018,
    doi: "10.1097/ALN.0000000000002120",
    url: "https://pubmed.ncbi.nlm.nih.gov/29498949/",
    abstract: "The bispectral index can be predicted from the effect-site concentrations of propofol and remifentanil with high accuracy using a deep learning approach. Such an algorithm can be useful for developing the advisory display of the status of anesthesia.",
    category: 'research',
    citationCount: 42,
    tags: ['deep learning', 'anesthesia', 'propofol', 'remifentanil']
  },
  {
    id: 3,
    title: "Open-source anaesthesia database building: Lessons from the VitalDB project",
    authors: "Park S, Jung CW",
    journal: "British Journal of Anaesthesia",
    year: 2021,
    doi: "10.1016/j.bja.2021.04.026",
    url: "https://pubmed.ncbi.nlm.nih.gov/34045047/",
    abstract: "Building an open-source anaesthesia database requires careful consideration of data collection methods, standardisation, privacy protection, and incentives for data sharing. The VitalDB project provides valuable lessons for future database initiatives in anaesthesiology.",
    category: 'review',
    citationCount: 23,
    tags: ['database', 'open-source', 'data sharing', 'standardisation']
  },
  {
    id: 4,
    title: "Predicting Hypotension Using Deep Learning on Preoperative Vitals and Intraoperative Trends",
    authors: "Kim T, Lee HC, Choi BH, Jung CW",
    journal: "Journal of Clinical Monitoring and Computing",
    year: 2020,
    doi: "10.1007/s10877-019-00434-5",
    url: "https://pubmed.ncbi.nlm.nih.gov/31907701/",
    abstract: "Deep learning models can accurately predict intraoperative hypotension using preoperative vital signs and early intraoperative trends. This prediction can help anesthesiologists take preventive measures before dangerous hypotension occurs.",
    category: 'research',
    citationCount: 31,
    tags: ['deep learning', 'hypotension', 'prediction', 'preventive measures']
  },
  {
    id: 5,
    title: "The Challenges and Opportunities of Waveform Analysis in Anesthesia Research",
    authors: "Park JH, Lee HC, Jung CW",
    journal: "Korean Journal of Anesthesiology",
    year: 2019,
    doi: "10.4097/kja.19366",
    url: "https://pubmed.ncbi.nlm.nih.gov/31739372/",
    abstract: "Waveform analysis provides rich information about physiological processes but presents challenges in data acquisition, processing, and interpretation. This review discusses approaches to overcome these challenges and leverage opportunities in anesthesia research.",
    category: 'review',
    citationCount: 18,
    tags: ['waveform analysis', 'signal processing', 'physiology', 'methodology']
  },
  {
    id: 6,
    title: "Development and Validation of Deep Learning Models for Predicting Recovery Time After Anesthesia",
    authors: "Choi BH, Lee HC, Shin B, Jung CW",
    journal: "Anesthesia & Analgesia",
    year: 2022,
    doi: "10.1213/ANE.0000000000005731",
    url: "https://pubmed.ncbi.nlm.nih.gov/34339339/",
    abstract: "Deep learning models can accurately predict recovery time after anesthesia using intraoperative vital signs and medication data. These predictions can help optimize operating room scheduling and improve resource allocation.",
    category: 'research',
    citationCount: 15,
    tags: ['deep learning', 'recovery', 'resource allocation', 'prediction']
  }
];

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // 필터링된 출판물 목록
  const filteredPublications = PUBLICATIONS.filter(pub => {
    // 검색어 필터링
    const matchesSearch = searchQuery === '' || 
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // 카테고리 필터링
    const matchesCategory = activeCategory === 'all' || pub.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">Scientific Publications</h1>
        <p className="text-lg text-muted-foreground">
          Explore scientific publications related to VitalLab, VitalRecorder, and VitalDB.
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* 검색 및 필터링 */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search publications by title, author, keywords..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('all')}
              className="whitespace-nowrap"
            >
              All Publications
            </Button>
            <Button
              variant={activeCategory === 'research' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('research')}
              className="whitespace-nowrap"
            >
              Research
            </Button>
            <Button
              variant={activeCategory === 'methodology' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('methodology')}
              className="whitespace-nowrap"
            >
              Methodology
            </Button>
            <Button
              variant={activeCategory === 'review' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('review')}
              className="whitespace-nowrap"
            >
              Reviews
            </Button>
          </div>
        </div>

        {/* 출판물 수 표시 */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredPublications.length} of {PUBLICATIONS.length} publications
        </div>
        
        {/* 출판물 목록 */}
        <div className="space-y-6">
          {filteredPublications.length > 0 ? (
            filteredPublications.map((pub) => (
              <Card key={pub.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={
                          pub.category === 'research' ? 'default' : 
                          pub.category === 'methodology' ? 'secondary' : 'outline'
                        }>
                          {pub.category.charAt(0).toUpperCase() + pub.category.slice(1)}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {pub.year}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Award className="h-3.5 w-3.5 mr-1" />
                          {pub.citationCount} citations
                        </span>
                      </div>
                      
                      <h2 className="text-xl font-semibold mb-2">{pub.title}</h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        <span className="font-medium">Authors:</span> {pub.authors}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        <span className="font-medium">Journal:</span> {pub.journal}
                      </p>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {pub.abstract}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {pub.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50 dark:bg-gray-800">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={pub.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                            View Publication
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">
                            <FileBadge className="h-3.5 w-3.5 mr-1.5" />
                            DOI: {pub.doi}
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3.5 w-3.5 mr-1.5" />
                          Cite
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <FileType className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium mb-2">No publications found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Try adjusting your search terms or filters
              </p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
        
        {/* 페이지네이션 - 더 많은 데이터가 있을 경우 구현 */}
        {filteredPublications.length > 0 && (
          <div className="flex justify-center mt-6">
            <Button variant="outline" className="mr-2">Previous</Button>
            <Button variant="outline">Next</Button>
          </div>
        )}
      </div>
      
      {/* 추가 정보 */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start">
                <BookOpen className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Research Documentation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Access detailed documentation on research methods and implementation.
                  </p>
                  <Link href="/docs/research" className="text-blue-600 dark:text-blue-400 text-sm flex items-center">
                    View Documentation
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start">
                <FileBadge className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Citation Guidelines</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Learn how to properly cite VitalLab tools and data in your research.
                  </p>
                  <Link href="/docs/citation" className="text-blue-600 dark:text-blue-400 text-sm flex items-center">
                    View Guidelines
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 