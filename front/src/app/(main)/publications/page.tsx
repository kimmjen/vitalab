'use client';

import { useState } from 'react';
import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ChevronDown, BookOpen, FileText, CalendarIcon, ExternalLink } from "lucide-react";
import Link from "next/link";

// Publication data structure
interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  doi?: string;
  url?: string;
  abstract?: string;
  tags?: string[];
  featured?: boolean;
}

export default function PublicationsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const [expandedPublication, setExpandedPublication] = useState<string | null>(null);

  // Featured publications data from the Google site
  const featuredPublications: Publication[] = [
    {
      id: 'lee2022vitaldb',
      title: 'VitalDB, a high-fidelity multi-parameter vital signs database in surgical patients',
      authors: ['Hyung-Chul Lee', 'Yoonsang Park', 'Soo Bin Yoon', 'Seong Mi Yang', 'Dongnyeok Park', 'Chul-Woo Jung'],
      journal: 'Scientific Data',
      year: '2022',
      doi: '10.1038/s41597-022-01411-5',
      url: 'https://www.nature.com/articles/s41597-022-01411-5',
      abstract: 'A high-fidelity vital signs database suitable for advanced medical research, especially for the development of early warning systems and for modelling of human physiology, is needed. In this study, we constructed VitalDB, a multi-parameter vital signs database of surgical patients.',
      featured: true
    },
    {
      id: 'lee2018vitalrecorder',
      title: 'Vital Recorder-a free research tool for automatic recording of high-resolution time-synchronised physiological data from multiple anaesthesia devices',
      authors: ['HC Lee', 'CW Jung'],
      journal: 'Scientific Reports',
      year: '2018',
      doi: '10.1038/s41598-018-20062-4',
      url: 'https://www.nature.com/articles/s41598-018-20062-4',
      abstract: 'Advanced medical care requires big data analysis, including the analysis of time-synchronised physiological data, to assist in making clinical decisions. In this paper, we introduce Vital Recorder, a free and open-source software, to automatically record and store high-fidelity physiological data from various anaesthesia devices.',
      featured: true
    },
    {
      id: 'lee2018prediction',
      title: 'Prediction of bispectral index during target-controlled infusion of propofol and remifentanil: a deep learning approach',
      authors: ['HC Lee', 'HG Ryu', 'EJ Chung', 'CW Jung'],
      journal: 'Anesthesiology',
      year: '2018',
      doi: '10.1097/ALN.0000000000001892',
      url: 'https://pubs.asahq.org/anesthesiology/article/128/3/492/18187/Prediction-of-Bispectral-Index-during-Target',
      abstract: 'The authors developed a deep learning-based algorithm to predict the bispectral index in patients undergoing target-controlled infusion with propofol and remifentanil. The model was developed using a training cohort and its performance was confirmed using an independent test cohort.',
      featured: true
    }
  ];

  // Publications by year from the Google site
  const publications2023: Publication[] = [
    {
      id: 'cho2023deep',
      title: 'Deep‐learning model associating lateral cervical radiographic features with Cormack–Lehane grade 3 or 4 glottic view',
      authors: ['H‐Y Cho', 'Kyungsu Lee', 'H‐J Kong', 'H‐L Yang', 'C‐W Jung', 'H‐P Park', 'Jae Youn Hwang', 'H‐C Lee'],
      journal: 'Anaesthesia',
      year: '2023',
      doi: '10.1111/anae.15834',
      url: 'https://associationofanaesthetists-publications.onlinelibrary.wiley.com/doi/abs/10.1111/anae.15834'
    },
    {
      id: 'kwon2023real',
      title: 'Real-time prediction of massive transfusion during cesarean section using intraoperative hemodynamic monitoring data',
      authors: ['Do Yun Kwon', 'Young Mi Jung', 'Seung-Bo Lee', 'Taekyoung Kim', 'Kwangsoo Kim', 'Jihye Bae', 'Jeesun Lee', 'Chan-Wook Park', 'Joong Shin Park', 'Jong Kwan Jun', 'Dokyoon Kim', 'Hyung-Chul Lee'],
      journal: 'American Journal of Obstetrics & Gynecology',
      year: '2023',
      doi: '10.1016/j.ajog.2022.10.057',
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S0002937822009425'
    },
    {
      id: 'kang2023association',
      title: 'Association of the perfusion index with postoperative acute kidney injury: A retrospective study',
      authors: ['Pyoyoon Kang', 'Jung-bin Park', 'Hyun-Kyu Yoon', 'Sang-Hwan Ji', 'Young-Eun Jang', 'Eun-Hee Kim', 'Ji-Hyun Lee', 'Hyung Chul Lee', 'Jin-Tae Kim', 'Hee-Soo Kim'],
      journal: 'Korean Journal of Anesthesiology',
      year: '2023',
      doi: '10.4097/kja.23006',
      url: 'https://ekja.org/journal/view.php?doi=10.4097/kja.23006'
    }
  ];

  const publications2022: Publication[] = [
    {
      id: 'cho2022randomised',
      title: 'A randomised controlled trial of 7.5 mm and 7.0 mm tracheal tubes vs 6.5 mm and 6.0 mm tracheal tubes for men and women during laparoscopic surgery',
      authors: ['H Y Cho', 'S M Yang', 'C W Jung', 'H Cheun', 'H C Lee', 'H P Park', 'H K Yoon'],
      journal: 'Anaesthesia',
      year: '2022',
      doi: '10.1111/anae.15563',
      url: 'https://associationofanaesthetists-publications.onlinelibrary.wiley.com/doi/abs/10.1111/anae.15563'
    },
    {
      id: 'kim2022supraclavicular',
      title: 'Supraclavicular versus infraclavicular approach for ultrasound-guided right subclavian venous catheterisation: A randomised controlled non-inferiority trial',
      authors: ['Y J Kim', 'S Ma', 'H K Yoon', 'H C Lee', 'H P Park', 'H Oh'],
      journal: 'Anaesthesia',
      year: '2022',
      doi: '10.1111/anae.15574',
      url: 'https://associationofanaesthetists-publications.onlinelibrary.wiley.com/doi/abs/10.1111/anae.15574'
    }
  ];

  // Older publications
  const publicationsOlder: Publication[] = [
    {
      id: 'lee2018vital-recorder',
      title: 'Vital Recorder-a free research tool for automatic recording of high-resolution time-synchronised physiological data from multiple anaesthesia devices',
      authors: ['HC Lee', 'CW Jung'],
      journal: 'Scientific Reports',
      year: '2018',
      doi: '10.1038/s41598-018-20062-4',
      url: 'https://www.nature.com/articles/s41598-018-20062-4'
    },
    {
      id: 'ryu2012epinephrine',
      title: 'Epinephrine and phenylephrine pretreatments for preventing postreperfusion syndrome during adult liver transplantation',
      authors: ['HG Ryu', 'CW Jung', 'HC Lee', 'YJ Cho'],
      journal: 'Liver Transplantation',
      year: '2012',
      doi: '10.1002/lt.23511',
      url: 'https://aasldpubs.onlinelibrary.wiley.com/doi/abs/10.1002/lt.23511'
    }
  ];

  // Combine all publications for the 'all' tab
  const allPublications = [
    ...featuredPublications.filter(p => !p.featured),
    ...publications2023,
    ...publications2022,
    ...publicationsOlder
  ];

  // Get the appropriate publication list based on the active tab
  const getPublicationsByTab = () => {
    switch (activeTab) {
      case '2023':
        return publications2023;
      case '2022':
        return publications2022;
      case 'older':
        return publicationsOlder;
      case 'all':
      default:
        return allPublications;
    }
  };

  const togglePublicationExpand = (id: string) => {
    if (expandedPublication === id) {
      setExpandedPublication(null);
    } else {
      setExpandedPublication(id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <Badge variant="outline" className="mb-3 px-3 py-1 text-sm">
          {t('publications.subtitle')}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          {t('publications.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t('publications.description')}
        </p>
      </motion.div>

      {/* Featured Articles */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center mb-8">
            <BookOpen className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {t('publications.featuredArticles')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredPublications.filter(p => p.featured).map((publication) => (
              <Card key={publication.id} className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
                  <CardTitle className="text-xl font-semibold line-clamp-2">{publication.title}</CardTitle>
                  <CardDescription className="mt-2 text-sm">
                    <span className="font-medium text-gray-900 dark:text-gray-100">{publication.journal}</span> • {publication.year}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('publications.author')}</div>
                    <div className="font-medium">{publication.authors.join(', ')}</div>
                  </div>
                  
                  {publication.abstract && (
                    <div className="mb-6">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('publications.abstract')}</div>
                      <div className="text-sm line-clamp-4">{publication.abstract}</div>
                    </div>
                  )}
                  
                  {publication.doi && (
                    <div className="text-sm mb-4">
                      <span className="font-medium">DOI: </span>
                      <a 
                        href={`https://doi.org/${publication.doi}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {publication.doi}
                      </a>
                    </div>
                  )}
                  
                  <Button asChild variant="outline" className="w-full">
                    <a 
                      href={publication.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <span>{t('publications.viewPaper')}</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      {/* All Publications by Year */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center mb-8">
            <FileText className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {t('publications.byYear')}
            </h2>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
            {t('publications.fullPublications')} [<a 
              href="https://scholar.google.com/citations?user=YGqz7Q8AAAAJ&hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              CW Jung
            </a>, <a 
              href="https://scholar.google.com/citations?user=sJTMRdMAAAAJ&hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              HC Lee
            </a>, <a 
              href="https://scholar.google.com/citations?user=2ht0GH4AAAAJ&hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              HL Yang
            </a>, <a 
              href="https://scholar.google.com/citations?user=s6dQn-QAAAAJ&hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              HH Lee
            </a>]
          </p>

          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-8 flex flex-wrap">
              <TabsTrigger value="all" className="flex-1">
                {t('publications.categories.all')}
              </TabsTrigger>
              <TabsTrigger value="2023" className="flex-1">
                {t('publications.categories.2023')}
              </TabsTrigger>
              <TabsTrigger value="2022" className="flex-1">
                {t('publications.categories.2022')}
              </TabsTrigger>
              <TabsTrigger value="older" className="flex-1">
                {t('publications.categories.older')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6">
              {getPublicationsByTab().map((publication) => (
                <Card 
                  key={publication.id} 
                  className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                          {publication.title}
                        </h3>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {publication.authors.join(', ')}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {publication.year}
                          </Badge>
                          <Badge variant="outline">{publication.journal}</Badge>
                          {publication.doi && (
                            <Badge variant="outline" className="text-blue-600 dark:text-blue-400">
                              DOI: {publication.doi}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {publication.url && (
                          <Button size="sm" variant="ghost" asChild>
                            <a 
                              href={publication.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              <span>{t('publications.viewPaper')}</span>
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        
                        {publication.abstract && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => togglePublicationExpand(publication.id)}
                            className="flex items-center gap-1"
                          >
                            <span>{expandedPublication === publication.id ? 'Collapse' : 'Expand'}</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${expandedPublication === publication.id ? 'rotate-180' : ''}`} />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {expandedPublication === publication.id && publication.abstract && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                      >
                        <div className="text-sm font-medium mb-2">{t('publications.abstract')}</div>
                        <p className="text-gray-700 dark:text-gray-300">{publication.abstract}</p>
                      </motion.div>
                    )}
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>
      </section>
    </div>
  );
} 