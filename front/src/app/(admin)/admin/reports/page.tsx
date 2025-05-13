import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">보고서</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <BarChart className="h-16 w-16 text-blue-500 mb-4" />
          <h3 className="text-xl font-medium mb-2">보고서 페이지 준비 중</h3>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
            현재 보고서 페이지를 개발 중입니다. 곧 사용 가능해질 예정입니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 