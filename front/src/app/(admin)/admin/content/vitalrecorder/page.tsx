'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, Upload, FileText, Trash2, HardDrive, PlusCircle, ArrowLeft, AlertCircle, CheckCircle, X } from 'lucide-react';
import Link from 'next/link';
// JSON 파일에서 데이터 가져오기
import vitalRecorderData from '@/lib/constants/vitalrecorder.json';

// 파일 관리를 위한 타입 정의
type FileVersion = {
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

type VitalRecorderMeta = {
  lastUpdate: string;
  downloadCount: number;
  citation: string;
  citationLink: string;
};

type OsType = {
  label: string;
  value: string;
};

export default function VitalRecorderAdminPage() {
  const [activeTab, setActiveTab] = useState('versions');
  const [versions, setVersions] = useState<FileVersion[]>([]);
  const [osTypes, setOsTypes] = useState<OsType[]>([]);
  const [meta, setMeta] = useState<VitalRecorderMeta>({
    lastUpdate: '',
    downloadCount: 0,
    citation: '',
    citationLink: ''
  });
  
  // 데이터 로드
  useEffect(() => {
    setVersions(vitalRecorderData.versions);
    setOsTypes(vitalRecorderData.osTypes);
    setMeta(vitalRecorderData.meta);
  }, []);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newVersion, setNewVersion] = useState({
    version: '',
    os: '',
    notes: ''
  });

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 실제 구현에서는 파일 업로드 API를 호출합니다
      console.log('File selected:', file.name);
      
      // 새 버전 생성
      const fileNamePrefix = `VitalRecorder-${newVersion.version}`;
      const osValue = newVersion.os;
      let osSuffix = '';
      
      switch(osValue) {
        case 'windows':
          osSuffix = 'win64';
          break;
        case 'raspberry-32':
          osSuffix = 'raspberry32';
          break;
        case 'raspberry-64':
          osSuffix = 'raspberry64';
          break;
        case 'ubuntu':
          osSuffix = 'ubuntu';
          break;
        default:
          osSuffix = osValue;
      }
      
      const fileName = `${fileNamePrefix}-${osSuffix}.zip`;
      const downloadUrl = `/downloads/${fileName}`;
      
      // 예시로 새 버전 추가
      const newFileVersion: FileVersion = {
        id: (versions.length + 1).toString(),
        version: newVersion.version,
        os: newVersion.os,
        filename: fileName,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        notes: newVersion.notes,
        isActive: true,
        downloadUrl: downloadUrl
      };
      
      setVersions([newFileVersion, ...versions]);
      
      // 실제 구현에서는 JSON 파일 또는 DB 업데이트
      
      // 폼 초기화
      setNewVersion({
        version: '',
        os: '',
        notes: ''
      });
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // 업로드 후 버전 목록 탭으로 전환
      setActiveTab('versions');
    }
  };

  const toggleVersionStatus = (id: string) => {
    setVersions(versions.map(version => 
      version.id === id 
        ? { ...version, isActive: !version.isActive } 
        : version
    ));
    
    // 실제 구현에서는 JSON 파일 또는 DB 업데이트
  };

  const deleteVersion = (id: string) => {
    setVersions(versions.filter(version => version.id !== id));
    
    // 실제 구현에서는 JSON 파일 또는 DB 업데이트
  };

  const getOsDisplayName = (osCode: string) => {
    const os = osTypes.find(item => item.value === osCode);
    return os ? os.label : osCode;
  };
  
  const handleSaveSettings = () => {
    // 실제 구현에서는 JSON 파일 또는 DB 업데이트
    console.log('Settings saved:', meta);
    
    // 성공 메시지 표시 등의 추가 작업...
  };
  
  // 저장된 전체 용량 계산
  const calculateTotalStorage = () => {
    return versions.reduce((acc, file) => {
      // "24.5 MB" 형태에서 숫자만 추출
      const size = parseFloat(file.fileSize.split(' ')[0]);
      return acc + size;
    }, 0).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">VitalRecorder Files</h2>
          <p className="text-muted-foreground">
            Manage VitalRecorder software files and versions
          </p>
        </div>
        <Link href="/admin/content">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Content
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="versions" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="versions">Versions</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="versions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Available Versions</CardTitle>
                <Button size="sm" onClick={() => setActiveTab('upload')}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Version
                </Button>
              </div>
              <CardDescription>
                Manage all available VitalRecorder versions and their files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Version</TableHead>
                    <TableHead>OS</TableHead>
                    <TableHead>Filename</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {versions.map((version) => (
                    <TableRow key={version.id}>
                      <TableCell className="font-medium">{version.version}</TableCell>
                      <TableCell>{getOsDisplayName(version.os)}</TableCell>
                      <TableCell className="max-w-[200px] truncate" title={version.filename}>
                        {version.filename}
                      </TableCell>
                      <TableCell>{version.fileSize}</TableCell>
                      <TableCell>{version.uploadDate}</TableCell>
                      <TableCell>
                        <Badge variant={version.isActive ? "default" : "secondary"} className="gap-1">
                          {version.isActive ? (
                            <>
                              <CheckCircle className="h-3 w-3" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <X className="h-3 w-3" />
                              <span>Inactive</span>
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" title="Download file">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant={version.isActive ? "outline" : "default"} 
                          size="sm"
                          onClick={() => toggleVersionStatus(version.id)}
                        >
                          {version.isActive ? "Deactivate" : "Activate"}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deleteVersion(version.id)}
                          title="Delete file"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="bg-gray-50 dark:bg-gray-800 flex justify-between text-sm py-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Total {versions.length} files</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <HardDrive className="h-4 w-4" />
                <span>Using {calculateTotalStorage()} MB storage</span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Version</CardTitle>
              <CardDescription>
                Add a new VitalRecorder version file to the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="version">Version Number</Label>
                  <Input 
                    id="version" 
                    placeholder="e.g. 1.15.6" 
                    value={newVersion.version}
                    onChange={(e) => setNewVersion({...newVersion, version: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="os">Operating System</Label>
                  <Select 
                    value={newVersion.os} 
                    onValueChange={(value) => setNewVersion({...newVersion, os: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select OS" />
                    </SelectTrigger>
                    <SelectContent>
                      {osTypes.map((os) => (
                        <SelectItem key={os.value} value={os.value}>
                          {os.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Release Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Describe what's new in this version" 
                  value={newVersion.notes}
                  onChange={(e) => setNewVersion({...newVersion, notes: e.target.value})}
                />
              </div>
              
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <h3 className="font-medium">Upload VitalRecorder File</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4 text-center">
                  Drag and drop your file here, or click to browse
                </p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept=".zip,.exe,.dmg,.tar.gz"
                />
                <Button onClick={handleFileUpload}>
                  <Upload className="mr-2 h-4 w-4" />
                  Select File
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" onClick={() => setActiveTab('versions')}>Cancel</Button>
              <Button 
                disabled={!newVersion.version || !newVersion.os || !newVersion.notes}
                onClick={handleFileUpload}
              >
                Upload Version
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>VitalRecorder Settings</CardTitle>
              <CardDescription>
                Configure global settings for VitalRecorder downloads
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="last-update">Last Update Date</Label>
                  <Input 
                    id="last-update" 
                    placeholder="e.g. Feb 2023" 
                    value={meta.lastUpdate}
                    onChange={(e) => setMeta({...meta, lastUpdate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="download-count">Download Count</Label>
                  <Input 
                    id="download-count" 
                    type="number"
                    value={meta.downloadCount}
                    onChange={(e) => setMeta({...meta, downloadCount: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="citation">Citation Information</Label>
                <Textarea 
                  id="citation" 
                  placeholder="Enter citation text for VitalRecorder"
                  value={meta.citation}
                  onChange={(e) => setMeta({...meta, citation: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="citation-link">Citation Link</Label>
                <Input 
                  id="citation-link" 
                  placeholder="e.g. https://journal.com/article"
                  value={meta.citationLink}
                  onChange={(e) => setMeta({...meta, citationLink: e.target.value})}
                />
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/50 p-4 rounded-md flex gap-3 text-amber-800 dark:text-amber-300">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Important Note</h4>
                  <p className="text-sm mt-1">
                    Changes to these settings will affect how VitalRecorder is displayed and downloaded 
                    on the public website. Ensure information is accurate before saving.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-4">
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 