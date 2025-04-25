// src/app/open-dataset/web-api/page.tsx
import { TabsContent } from "@/components/ui/tabs"
import { TableOfContents } from "@/components/web-api/TableOfContents"

export default function WebAPIPage() {
    return (
        <TabsContent value="web-api" className="mt-6">
            <div className="flex gap-8">
                {/* Sidebar */}
                <div className="w-72 shrink-0">
                    <TableOfContents />
                </div>

                {/* Main Content */}
                <div className="flex-1 prose max-w-none">
                    <h1>VitalDB Web API for Open Dataset</h1>

                    <section id="introduction">
                        <h2>Introduction</h2>
                        <p>
                            The VitalDB web application programming interface (API) is a language independent interface that allows users to get the VitalDB open dataset via HTTP secure protocol. All Web API's endpoint can be accessed by sending HTTP requests with GET method or by entering an address in the web browser.
                        </p>
                        <p>
                            The responses are files with GZip-compressed comma separated values (CSV) format.<br />
                            <span className="text-red-500">Each CSV file has a header row at the begining</span> which contains column names.
                        </p>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border">
                                <thead>
                                <tr className="bg-blue-100">
                                    <th className="p-2 border">Endpoint URL</th>
                                    <th className="p-2 border">Method</th>
                                    <th className="p-2 border">Purpose</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="p-2 border"><a href="https://api.vitaldb.net/cases" className="text-blue-500">https://api.vitaldb.net/cases</a></td>
                                    <td className="p-2 border">GET</td>
                                    <td className="p-2 border">Download clinical information</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border"><a href="https://api.vitaldb.net/trks" className="text-blue-500">https://api.vitaldb.net/trks</a></td>
                                    <td className="p-2 border">GET</td>
                                    <td className="p-2 border">Download track list</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">
                                        <code className="text-blue-500">{`https://api.vitaldb.net/{tid}`}</code>
                                    </td>
                                    <td className="p-2 border">GET</td>
                                    <td className="p-2 border">
                                        Download track data<br />
                                        (tid) : track identifier in track list
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-2 border"><a href="https://api.vitaldb.net/labs" className="text-blue-500">https://api.vitaldb.net/labs</a></td>
                                    <td className="p-2 border">GET</td>
                                    <td className="p-2 border">Download laboratory results</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="clinical-information">
                        <h2>Clinical information</h2>
                        <p>Endpoint URL: <a href="https://api.vitaldb.net/cases" className="text-blue-500">https://api.vitaldb.net/cases</a></p>
                        <p>This endpoint contains information related to the clinical information.</p>
                        <p>Parameter lists are available <a href="#" className="text-blue-500">here</a>.</p>
                        <p>Please note that all timepoints are in seconds from casestart. Therefore, the casestart is always zero in all cases and the caseend becomes the length of the entire case in seconds.</p>
                    </section>

                    <section id="track-list">
                        <h2>Track list</h2>
                        <p>Endpoint URL: <a href="https://api.vitaldb.net/trks" className="text-blue-500">https://api.vitaldb.net/trks</a></p>
                        <p>This endpoint contains information related to the track.</p>
                        <p>The definition of each column is as follows.</p>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border">
                                <thead>
                                <tr className="bg-blue-100">
                                    <th className="p-2 border">Column Name</th>
                                    <th className="p-2 border">Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="p-2 border">caseid</td>
                                    <td className="p-2 border">case identifier</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">tname</td>
                                    <td className="p-2 border">track name</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border">id</td>
                                    <td className="p-2 border">track identifier</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>Full list of tname is available <a href="#" className="text-blue-500">here</a>.</p>
                    </section>

                    {/* 나머지 섹션들... */}
                </div>
            </div>
        </TabsContent>
    )
}