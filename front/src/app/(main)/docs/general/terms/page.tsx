'use client';

import { motion } from "framer-motion";
import { FileCheck, ShieldCheck, GraduationCap, Copyright, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function TermsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">Terms and Conditions</h1>
        <p className="text-lg text-muted-foreground">
          Important information about using VitalLab services, tools, and datasets.
        </p>
      </motion.div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Last Updated:</strong> May 15, 2023 | 
          These terms and conditions govern your use of VitalLab services, tools, and datasets.
        </p>
      </div>

      <div className="space-y-10">
        {/* 요약 섹션 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Summary of Key Terms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <FileCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Open Access</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our tools and datasets are provided under open-access licenses to promote research and collaboration.
                  Commercial use may be restricted.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Attribution</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Users must provide appropriate citations when using our tools or data in academic 
                  publications or derivative works.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Privacy</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All patient data is anonymized and protected according to international privacy standards 
                  and research ethics guidelines.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 약관 상세 아코디언 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Detailed Terms and Conditions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="terms-of-use">
              <AccordionTrigger>1. Terms of Use</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    By accessing and using VitalLab services, tools, and datasets, you agree to comply with and be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
                  </p>
                  <p>
                    We reserve the right to modify these terms at any time without prior notice. Your continued use of our services following the posting of changes will be deemed your acceptance of such changes.
                  </p>
                  <p>
                    The use of VitalLab tools and datasets is intended for research, educational, and non-commercial purposes. Commercial applications or uses may require additional licensing or agreements.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-usage">
              <AccordionTrigger>2. Data Usage and Restrictions</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    VitalDB datasets are provided under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0), unless otherwise specified.
                  </p>
                  <p>
                    You may download, analyze, modify, and share the datasets for academic and research purposes, provided you:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Properly attribute the source of the data in all publications and derivative works</li>
                    <li>Do not use the data for commercial purposes without explicit permission</li>
                    <li>Do not attempt to re-identify any anonymized patient information</li>
                    <li>Do not redistribute the data in ways that violate these terms</li>
                  </ul>
                  <p>
                    We make reasonable efforts to ensure data quality, but do not guarantee accuracy, completeness, or suitability for any particular purpose.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="software-licensing">
              <AccordionTrigger>3. Software Licensing</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    VitalRecorder and related software tools are provided under custom licenses that allow free use for academic, research, and clinical purposes.
                  </p>
                  <p>
                    You may:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Download, install, and use the software for non-commercial purposes</li>
                    <li>Modify the source code for research and development</li>
                    <li>Share your modifications with proper attribution to the original authors</li>
                  </ul>
                  <p>
                    You may not:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use the software for commercial purposes without explicit permission</li>
                    <li>Remove or alter copyright notices or attributions</li>
                    <li>Redistribute the software as part of a commercial product</li>
                  </ul>
                  <p>
                    Some components may incorporate third-party libraries with different licenses; these are noted in the documentation.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="citation">
              <AccordionTrigger>4. Citation Requirements</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    When using VitalLab tools or datasets in publications, presentations, or other academic works, proper citation is required.
                  </p>
                  <p>
                    For VitalRecorder, please cite:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md my-3 text-sm">
                    Lee HC, Jung CW. (2018). VitalRecorder: A versatile program for recording and analyzing high-resolution time-synchronized physiological data from multiple anaesthesia devices. Scientific Reports, 8(1), 1527.
                  </div>
                  <p>
                    For VitalDB, please cite:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md my-3 text-sm">
                    Lee HC, Ryu HG, Chung EJ, Jung CW. (2018). The Korean Society of Anesthesiologists, 71(6), 441-449.
                  </div>
                  <p>
                    Additional citations may be requested for specific datasets or tools. Please refer to the documentation of each resource for detailed citation requirements.
                  </p>
                  <Button asChild variant="outline" className="mt-2">
                    <Link href="/docs/citation">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Detailed Citation Guidelines
                    </Link>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy-policy">
              <AccordionTrigger>5. Privacy Policy</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    VitalLab is committed to protecting your privacy and the confidentiality of any personal information you provide.
                  </p>
                  <p>
                    Our privacy practices include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All patient data in our datasets is anonymized according to HIPAA and GDPR guidelines</li>
                    <li>We collect minimal personal information needed for account creation and service provision</li>
                    <li>We do not sell or share personal information with third parties</li>
                    <li>We use standard security measures to protect stored information</li>
                  </ul>
                  <p>
                    By using our services, you consent to the collection and use of information as described in our full Privacy Policy.
                  </p>
                  <Button asChild variant="outline" className="mt-2">
                    <Link href="/privacy-policy">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Full Privacy Policy
                    </Link>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="liability">
              <AccordionTrigger>6. Limitation of Liability</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    VitalLab tools and datasets are provided "as is" without warranty of any kind, either expressed or implied, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose.
                  </p>
                  <p>
                    In no event shall VitalLab or Seoul National University be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, procurement of substitute goods or services, loss of use, data, or profits, or business interruption) however caused and on any theory of liability, whether in contract, strict liability, or tort (including negligence or otherwise) arising in any way out of the use of this software or data, even if advised of the possibility of such damage.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="governing-law">
              <AccordionTrigger>7. Governing Law</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of Korea, without regard to its conflict of law provisions.
                  </p>
                  <p>
                    Any disputes arising out of or relating to these Terms and Conditions shall be resolved through the courts of Seoul, Republic of Korea.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact">
              <AccordionTrigger>8. Contact Information</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    If you have any questions or concerns about these Terms and Conditions, please contact us at:
                  </p>
                  <p className="font-medium">
                    Department of Anesthesiology and Pain Medicine<br />
                    Seoul National University College of Medicine<br />
                    Email: info@vitaldb.net
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* 저작권 및 라이센스 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Copyright and Licenses</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Copyright className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    © 2016-{new Date().getFullYear()} VitalDB, Department of Anesthesiology and Pain Medicine, 
                    Seoul National University College of Medicine, Seoul, Korea. All rights reserved.
                  </p>
                  <p className="font-medium">
                    Tools and Software Licenses:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>VitalRecorder: Custom license for academic and research use</li>
                    <li>VitalDB Python Library: MIT License</li>
                    <li>VitalDB Web API: Custom API license for research use</li>
                  </ul>
                  <p className="font-medium mt-4">
                    Data Licenses:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>VitalDB Datasets: CC BY-NC 4.0 (Creative Commons Attribution-NonCommercial 4.0)</li>
                    <li>Research Publications: Various publisher-specific licenses</li>
                  </ul>
                  <p className="mt-4">
                    Specific licensing information is provided with each tool and dataset.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 연락처 및 질문 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Questions and Contact</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            If you have questions about these terms or need clarification on licensing for a specific use case, 
            please contact our team. We're happy to provide guidance on proper usage and attribution.
          </p>
          <Button asChild>
            <Link href="mailto:info@vitaldb.net">
              Contact Us About Terms
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
} 