'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Pencil, Trash2, Upload, X, ArrowUpDown, Eye, EyeOff } from 'lucide-react';
import { usePartnersStore, Partner } from '@/lib/store/partnersStore';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export default function PartnersPage() {
  const { toast } = useToast();
  const { partners, addPartner, updatePartner, deletePartner, reorderPartners, toggleVisibility } = usePartnersStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState<Omit<Partner, 'id' | 'visible'>>({
    name: '',
    logo: '',
    url: '',
    description: '',
  });
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  // 편집 또는 추가를 위한 다이얼로그 열기
  const openDialog = useCallback((partner?: Partner) => {
    if (partner) {
      setSelectedPartner(partner);
      setFormData({
        name: partner.name,
        logo: partner.logo || '',
        url: partner.url || '',
        description: partner.description || '',
      });
      setLogoPreview(partner.logo || '');
    } else {
      setSelectedPartner(null);
      setFormData({
        name: '',
        logo: '',
        url: '',
        description: '',
      });
      setLogoPreview('');
    }
    setIsDialogOpen(true);
  }, []);

  // 파일 업로드 처리
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 실제 구현에서는 서버에 업로드 처리
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        setFormData(prev => ({ ...prev, logo: `/images/partners/partner${Date.now()}.png` }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // 폼 제출 처리
  const handleSubmit = useCallback(() => {
    if (!formData.name) {
      toast({ title: '오류', description: '파트너 이름은 필수 항목입니다.', variant: 'destructive' });
      return;
    }

    if (selectedPartner) {
      // 파트너 업데이트
      updatePartner(selectedPartner.id, formData);
      toast({ title: '성공', description: `${formData.name} 파트너가 업데이트되었습니다.` });
    } else {
      // 새 파트너 추가
      addPartner({ ...formData, visible: true });
      toast({ title: '성공', description: `${formData.name} 파트너가 추가되었습니다.` });
    }

    setIsDialogOpen(false);
  }, [formData, selectedPartner, addPartner, updatePartner, toast]);

  // 파트너 삭제
  const handleDelete = useCallback((id: number) => {
    if (confirm('정말로 이 파트너를 삭제하시겠습니까?')) {
      deletePartner(id);
      toast({ title: '삭제됨', description: '파트너가 삭제되었습니다.' });
    }
  }, [deletePartner, toast]);

  // 파트너 표시/숨김 토글
  const handleToggleVisibility = useCallback((id: number) => {
    // 현재 파트너 상태 찾기
    const partner = partners.find(p => p.id === id);
    if (!partner) return;
    
    // 토글 수행
    toggleVisibility(id);
    
    // 알림 표시 (현재 상태의 반대가 될 상태를 기준으로)
    const willBeVisible = !partner.visible;
    toast({ 
      title: willBeVisible ? '표시됨' : '숨김 처리됨', 
      description: `파트너가 ${willBeVisible ? '표시' : '숨김'} 처리되었습니다.` 
    });
  }, [partners, toggleVisibility, toast]);

  // 파트너 순서 변경
  const handleMoveUp = useCallback((index: number) => {
    if (index === 0) return;
    const newPartners = [...partners];
    [newPartners[index - 1], newPartners[index]] = [newPartners[index], newPartners[index - 1]];
    reorderPartners(newPartners);
  }, [partners, reorderPartners]);

  const handleMoveDown = useCallback((index: number) => {
    if (index === partners.length - 1) return;
    const newPartners = [...partners];
    [newPartners[index], newPartners[index + 1]] = [newPartners[index + 1], newPartners[index]];
    reorderPartners(newPartners);
  }, [partners, reorderPartners]);

  // 검색된 파트너 목록
  const filteredPartners = partners.filter(partner => 
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (partner.description && partner.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">파트너 관리</h1>
        <Button onClick={() => openDialog()} className="flex items-center gap-2">
          <PlusCircle size={16} />
          <span>파트너 추가</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>파트너 목록</CardTitle>
          <CardDescription>
            VitalLab과 협력하는 파트너와 기관을 관리합니다. 이 파트너들은 홈페이지의 파트너 섹션에 표시됩니다.
          </CardDescription>
          <div className="mt-4">
            <Input
              placeholder="파트너 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            파트너 순서를 변경하려면 위아래 화살표를 사용하세요. 표시/숨김 토글을 사용하여 홈페이지에 파트너 표시 여부를 관리할 수 있습니다.
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>로고</TableHead>
                <TableHead>이름</TableHead>
                <TableHead>설명</TableHead>
                <TableHead>웹사이트</TableHead>
                <TableHead>순서</TableHead>
                <TableHead>표시 상태</TableHead>
                <TableHead className="text-right">작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.length > 0 ? (
                filteredPartners.map((partner, index) => (
                  <TableRow key={partner.id} className={!partner.visible ? "opacity-60" : ""}>
                    <TableCell>{partner.id}</TableCell>
                    <TableCell>
                      <div className="h-10 w-10 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                        {partner.logo ? (
                          <img 
                            src={partner.logo} 
                            alt={partner.name} 
                            className="h-full w-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder-logo.png';
                            }}
                          />
                        ) : (
                          <span className="text-xs text-gray-500">{partner.name.charAt(0)}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{partner.name}</TableCell>
                    <TableCell>{partner.description || '-'}</TableCell>
                    <TableCell>
                      {partner.url ? (
                        <a 
                          href={partner.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {new URL(partner.url).hostname}
                        </a>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0}
                          className="h-5 w-5"
                        >
                          <ArrowUpDown className="h-3 w-3 rotate-90" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleMoveDown(index)}
                          disabled={index === partners.length - 1}
                          className="h-5 w-5"
                        >
                          <ArrowUpDown className="h-3 w-3 -rotate-90" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={partner.visible}
                          onCheckedChange={() => handleToggleVisibility(partner.id)}
                          color={partner.visible ? "green" : "red"}
                          showText={true}
                        />
                        <span className={cn(
                          "text-sm font-medium flex items-center",
                          partner.visible 
                            ? "text-green-600 dark:text-green-400" 
                            : "text-red-600 dark:text-red-400"
                        )}>
                          {partner.visible ? (
                            <div className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              표시
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <EyeOff className="h-3 w-3 mr-1" />
                              숨김
                            </div>
                          )}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDialog(partner)}
                          title="편집"
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(partner.id)}
                          title="삭제"
                          className="text-red-500 dark:text-red-400"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                    파트너가 없거나 검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 파트너 추가/편집 다이얼로그 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedPartner ? '파트너 편집' : '새 파트너 추가'}</DialogTitle>
            <DialogDescription>
              파트너 정보를 입력하세요. 로고 이미지는 투명 배경의 PNG 파일을 권장합니다.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">파트너 이름 *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="파트너 이름"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">설명</Label>
              <Input
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="파트너에 대한 간단한 설명"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url">웹사이트 URL</Label>
              <Input
                id="url"
                value={formData.url || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label>로고 이미지</Label>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                  {logoPreview ? (
                    <div className="relative h-full w-full">
                      <img 
                        src={logoPreview} 
                        alt="로고 미리보기" 
                        className="h-full w-full object-contain"
                      />
                      <button 
                        onClick={() => {
                          setLogoPreview('');
                          setFormData(prev => ({ ...prev, logo: '' }));
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        type="button"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <label 
                      htmlFor="logo-upload" 
                      className="cursor-pointer flex flex-col items-center justify-center text-gray-500 dark:text-gray-400"
                    >
                      <Upload size={20} />
                      <span className="text-xs mt-1">업로드</span>
                    </label>
                  )}
                </div>
                
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <p>권장 크기: 200x100 픽셀</p>
                  <p>최대 파일 크기: 2MB</p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>취소</Button>
            <Button onClick={handleSubmit}>{selectedPartner ? '업데이트' : '추가'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 