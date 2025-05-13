'use client';

import { motion } from "framer-motion";
import { School, MapPin, Users, Mail, Globe, GraduationCap, ExternalLink, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Chul-Woo Jung, MD PhD",
    role: "Principal Investigator",
    bio: "Professor of Anesthesiology and Pain Medicine at Seoul National University College of Medicine. Leading research in physiological data analysis and medical informatics.",
    image: "/images/team/jung-cw.jpg"
  },
  {
    id: 2,
    name: "Hyung-Chul Lee, MD PhD",
    role: "Lead Developer",
    bio: "Associate Professor specializing in medical device development and physiological data analysis. Creator of VitalRecorder.",
    image: "/images/team/lee-hc.jpg"
  },
  {
    id: 3,
    name: "Research Team",
    role: "Developers & Researchers",
    bio: "Our team includes physicians, engineers, and data scientists working together to improve healthcare through open data and innovative tools.",
    image: "/images/team/research-team.jpg"
  }
];

export default function AboutUsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">About VitalLab</h1>
        <p className="text-lg text-muted-foreground">
          Learn about our team, mission, and the story behind VitalLab.
        </p>
      </motion.div>

      <div className="space-y-10">
        {/* 미션 섹션 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Open Science</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Promoting open science in medical research by providing freely accessible tools and datasets 
                  to researchers worldwide.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Collaboration</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Fostering collaboration between clinicians, researchers, and engineers to develop innovative 
                  solutions for healthcare challenges.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Education</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Educating the next generation of medical researchers on modern data analysis techniques 
                  and open research practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 프로젝트 소개 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">About the Project</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                VitalLab originated from the Department of Anesthesiology and Pain Medicine at Seoul National 
                University Hospital as a research initiative to improve the collection, analysis, and sharing 
                of physiological data in clinical settings.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Our flagship projects include <strong>VitalRecorder</strong>, a versatile program for recording 
                high-resolution physiological data, and <strong>VitalDB</strong>, an open research database 
                containing anonymized vital signs data from thousands of surgical cases.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Since our launch in 2016, our tools have been used by researchers worldwide, contributing to 
                numerous publications and advancing our understanding of human physiology during surgery and 
                critical care.
              </p>
            </div>
            <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
              <Image
                src="/images/about/lab-overview.jpg"
                alt="VitalLab Research Environment"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* 팀 소개 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <Users className="h-12 w-12" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 위치 및 연락처 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Location & Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="flex items-center text-xl font-medium mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-red-500" />
                  Our Location
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Department of Anesthesiology and Pain Medicine<br />
                  Seoul National University College of Medicine<br />
                  103 Daehak-ro, Jongno-gu<br />
                  Seoul, 03080, South Korea
                </p>
                <Button variant="outline" className="mt-2" asChild>
                  <Link href="https://maps.google.com/?q=Seoul+National+University+College+of+Medicine" target="_blank" rel="noopener noreferrer">
                    <Globe className="mr-2 h-4 w-4" />
                    View on Map
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="flex items-center text-xl font-medium mb-4">
                  <Mail className="h-5 w-5 mr-2 text-blue-500" />
                  Contact Us
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  <strong>General Inquiries:</strong> info@vitaldb.net
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  <strong>Technical Support:</strong> support@vitaldb.net
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Research Collaboration:</strong> research@vitaldb.net
                </p>
                <Button variant="outline" className="mt-2" asChild>
                  <Link href="mailto:info@vitaldb.net">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Us
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 학술적 배경 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Academic Background</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <School className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Research & Publications</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Our work has been published in various peer-reviewed journals including Scientific Reports, 
                    Anesthesiology, British Journal of Anaesthesia, and more. Our research focuses on 
                    physiological data analysis, machine learning in healthcare, and open data initiatives.
                  </p>
                  <Button asChild>
                    <Link href="/docs/general/publications">
                      View Our Publications
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 지원 및 기여 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Support & Contributions</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            VitalLab is supported by grants from the National Research Foundation of Korea and Seoul National University Hospital. 
            We are grateful for the contributions of many researchers, clinicians, and programmers who have helped 
            develop and improve our tools.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" asChild>
              <Link href="/docs/contribute">
                How to Contribute
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://github.com/vitaldb" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                GitHub Repository
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
} 