'use client';

import { TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ExternalLink, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

// 출판물 데이터
const publications = [
    {
        id: 1,
        title: "VitalDB, a high-fidelity multi-parameter vital signs database in surgical patients",
        authors: "Lee HC, Park Y, Yoon SB, Yang SM, Park D, Jung CW",
        journal: "Scientific Data",
        year: 2022,
        doi: "10.1038/s41597-022-01411-5",
        url: "https://doi.org/10.1038/s41597-022-01411-5",
        type: "Journal"
    },
    {
        id: 2,
        title: "Deep learning-based detection and severity classification of perioperative hypotension: a retrospective pilot investigation",
        authors: "Park YK, Yang SM, Moon YJ, Lee J, Park JB, Jung CW, Lee HC",
        journal: "Scientific Reports",
        year: 2022,
        doi: "10.1038/s41598-022-19028-4",
        url: "https://doi.org/10.1038/s41598-022-19028-4",
        type: "Journal"
    },
    {
        id: 3,
        title: "Artificial Intelligence in Surgery: Promising, but Not Yet There",
        authors: "Lee HC, Jung CW",
        journal: "Korean Journal of Anesthesiology",
        year: 2022,
        doi: "10.4097/kja.22354",
        url: "https://doi.org/10.4097/kja.22354",
        type: "Review"
    },
    {
        id: 4,
        title: "Machine learning for mechanical ventilation in the operating room: a focus on prediction of postoperative mechanical ventilation and spontaneous ventilation after surgery",
        authors: "Song J, Shin TJ, Lee HC",
        journal: "Korean Journal of Anesthesiology",
        year: 2020,
        doi: "10.4097/kja.20510",
        url: "https://doi.org/10.4097/kja.20510",
        type: "Review"
    },
    {
        id: 5,
        title: "Vital Recorder—A free research tool for automatic recording of high-resolution time-synchronised physiological data from multiple anaesthesia devices",
        authors: "Lee HC, Jung CW",
        journal: "Scientific Reports",
        year: 2018,
        doi: "10.1038/s41598-018-20062-4",
        url: "https://doi.org/10.1038/s41598-018-20062-4",
        type: "Journal"
    }
];

export default function PublicationPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <TabsContent value="publication">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 sm:space-y-8"
            >
                <section>
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-6">관련 논문</h2>
                    <p className="mb-4 sm:mb-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        VitalDB 데이터와 연관된 연구 논문 목록입니다. 의료 AI 및 생체신호 데이터 분석 연구에 참고하실 수 있습니다.
                    </p>

                    <div className="space-y-3 sm:space-y-4">
                        {publications.map((pub) => (
                            <Card key={pub.id} className="overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="border-l-4 border-blue-500 dark:border-blue-400 p-3 sm:p-6">
                                        <div className="flex justify-between items-start gap-3 sm:gap-4">
                                            <div className="flex-1">
                                                <h3 className="font-bold text-sm sm:text-lg mb-2 leading-tight">{pub.title}</h3>
                                                <div className="flex items-start sm:items-center text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 flex-wrap">
                                                    <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 mt-0.5 sm:mt-0 flex-shrink-0" />
                                                    <span className="text-xs sm:text-sm">{pub.authors}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2 sm:gap-3 items-center mb-2 sm:mb-3">
                                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                                        <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                                                        <span className="text-xs sm:text-sm">{pub.journal}</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                                                        <span className="text-xs sm:text-sm">{pub.year}</span>
                                                    </div>
                                                    <Badge variant="outline" className="text-[10px] sm:text-xs h-5 px-1.5">
                                                        {pub.type}
                                                    </Badge>
                                                </div>
                                                <a
                                                    href={pub.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-xs sm:text-sm"
                                                >
                                                    <span>DOI: {pub.doi}</span>
                                                    <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3 ml-1 flex-shrink-0" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
                
                <section className="mt-6 sm:mt-8">
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-6">인용 방법</h2>
                    <Card>
                        <CardContent className="p-4 sm:p-6">
                            <p className="text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                                VitalDB 데이터셋을 연구에 사용하는 경우 다음 논문을 인용해 주시기 바랍니다:
                            </p>
                            <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-300 font-mono break-words">
                                    Lee HC, Park Y, Yoon SB, Yang SM, Park D, Jung CW. VitalDB, a high-fidelity multi-parameter vital signs database in surgical patients. Sci Data. 2022 Jun 8;9(1):279. doi: 10.1038/s41597-022-01411-5. PMID: 35676300; PMCID: PMC9178032.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </motion.div>
        </TabsContent>
    );
}