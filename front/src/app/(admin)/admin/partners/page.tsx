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
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export default function PartnersPage() {
  const { toast } = useToast();
  const { partners, loading, error, addPartner, updatePartner, deletePartner, togglePartnerStatus, getPartners } = usePartnersStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState<Omit<Partner, 'id'>>({
    name: '',
    logo: '',
    website: '',
    description: '',
    isActive: true,
    category: 'academic',
    country: '',
    joinedDate: new Date().toISOString().split('T')[0],
  });
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  // 컴포넌트 마운트 시 파트너 목록 로드
  useEffect(() => {
    getPartners();
  }, [getPartners]);

  // 편집 또는 추가를 위한 다이얼로그 열기
  const openDialog = useCallback((partner?: Partner) => {
    if (partner) {
      setSelectedPartner(partner);
      setFormData({
        name: partner.name,
        logo: partner.logo || '',
        website: partner.website || '',
        description: partner.description || '',
        isActive: partner.isActive,
        category: partner.category,
        country: partner.country || '',
        joinedDate: partner.joinedDate,
      });
      setLogoPreview(partner.logo || '');
    } else {
      setSelectedPartner(null);
      setFormData({
        name: '',
        logo: '',
        website: '',
        description: '',
        isActive: true,
        category: 'academic',
        country: '',
        joinedDate: new Date().toISOString().split('T')[0],
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
  const handleSubmit = useCallback(async () => {
    if (!formData.name) {
      toast({ title: '오류', description: '파트너 이름은 필수 항목입니다.', variant: 'destructive' });
      return;
    }

    try {
      if (selectedPartner) {
        // 파트너 업데이트
        await updatePartner(selectedPartner.id, formData);
        toast({ title: '성공', description: `${formData.name} 파트너가 업데이트되었습니다.` });
      } else {
        // 새 파트너 추가
        await addPartner(formData);
        toast({ title: '성공', description: `${formData.name} 파트너가 추가되었습니다.` });
      }

      setIsDialogOpen(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '파트너 저장 중 오류가 발생했습니다.';
      toast({ title: '오류', description: errorMessage, variant: 'destructive' });
    }
  }, [formData, selectedPartner, addPartner, updatePartner, toast]);

  // 파트너 삭제
  const handleDelete = useCallback(async (id: number) => {
    if (confirm('정말로 이 파트너를 삭제하시겠습니까?')) {
      try {
        const success = await deletePartner(id);
        if (success) {
          toast({ title: '삭제됨', description: '파트너가 삭제되었습니다.' });
        } else {
          throw new Error('삭제 실패');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '파트너 삭제 중 오류가 발생했습니다.';
        toast({ title: '오류', description: errorMessage, variant: 'destructive' });
      }
    }
  }, [deletePartner, toast]);

  // 파트너 활성/비활성 토글
  const handleToggleStatus = useCallback(async (id: number) => {
    try {
      const updatedPartner = await togglePartnerStatus(id);
      toast({ 
        title: updatedPartner.isActive ? '활성화됨' : '비활성화됨', 
        description: `파트너가 ${updatedPartner.isActive ? '활성화' : '비활성화'} 되었습니다.` 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '파트너 상태 변경 중 오류가 발생했습니다.';
      toast({ title: '오류', description: errorMessage, variant: 'destructive' });
    }
  }, [togglePartnerStatus, toast]);

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
                <TableHead>표시 상태</TableHead>
                <TableHead className="text-right">작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.length > 0 ? (
                filteredPartners.map((partner) => (
                  <TableRow key={partner.id} className={!partner.isActive ? "opacity-60" : ""}>
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
                      {partner.website ? (
                        <a 
                          href={partner.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {new URL(partner.website).hostname}
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={partner.isActive ? "default" : "secondary"}>
                        {partner.isActive ? "활성" : "비활성"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Switch
                          checked={partner.isActive}
                          onCheckedChange={() => handleToggleStatus(partner.id)}
                        />
                        <span className={cn(
                          "ml-2 text-sm",
                          partner.isActive 
                            ? "text-green-600 dark:text-green-400" 
                            : "text-red-600 dark:text-red-400"
                        )}>
                          {partner.isActive ? "활성화" : "비활성화"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDialog(partner)}
                          title="편집"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(partner.id)}
                          title="삭제"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 파트너 추가/편집 다이얼로그 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedPartner ? '파트너 수정' : '새 파트너 추가'}</DialogTitle>
            <DialogDescription>
              {selectedPartner ? '파트너 정보를 수정합니다.' : '새로운 파트너 정보를 입력하세요. 이 정보는 홈페이지의 파트너 섹션에 표시됩니다.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-2">
              <Label htmlFor="logo" className="text-right">
                로고
              </Label>
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden border">
                  {logoPreview ? (
                    <img 
                      src={logoPreview} 
                      alt="Logo Preview" 
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No Logo</span>
                  )}
                </div>
                <Label 
                  htmlFor="logo-upload" 
                  className="cursor-pointer p-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2"
                >
                  <Upload size={16} />
                  <span>업로드</span>
                  <Input 
                    id="logo-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </Label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">파트너명 *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="파트너 이름을 입력하세요"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">카테고리</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  category: value as 'academic' | 'industry' | 'hospital' | 'research'
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">학술기관</SelectItem>
                  <SelectItem value="industry">산업체</SelectItem>
                  <SelectItem value="hospital">병원</SelectItem>
                  <SelectItem value="research">연구기관</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">국가</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                placeholder="예: South Korea, United States"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="파트너에 대한 간략한 설명"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">웹사이트 URL</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="joinedDate">시작일</Label>
              <Input
                id="joinedDate"
                type="date"
                value={formData.joinedDate}
                onChange={(e) => setFormData(prev => ({ ...prev, joinedDate: e.target.value }))}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData(prev => ({ 
                  ...prev, 
                  isActive: checked === true
                }))}
              />
              <Label htmlFor="isActive">활성화 (홈페이지에 표시)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.name}>
              {selectedPartner ? '업데이트' : '추가'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 