import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Database, 
  HardDrive, 
  Activity, 
  TrendingUp, 
  Download, 
  ArrowRight, 
  FileText 
} from 'lucide-react';

// 서버 컴포넌트로 변경
export default function AdminDashboardPage() {
  // 간단한 통계 카드 데이터
  const statsCards = [
    {
      title: '신규 사용자',
      value: '124',
      change: '+12% 지난주 대비',
      icon: <Users className="h-6 w-6 text-blue-500" />,
      trend: 'up',
    },
    {
      title: '전체 데이터셋',
      value: '1,284',
      change: '+5% 지난달 대비',
      icon: <Database className="h-6 w-6 text-purple-500" />,
      trend: 'up',
    },
    {
      title: '저장공간',
      value: '2.4 TB',
      change: '+0.8 TB 사용중',
      icon: <HardDrive className="h-6 w-6 text-yellow-500" />,
      trend: 'neutral',
    },
    {
      title: '승인 대기',
      value: '12',
      change: '+3 신규 요청',
      icon: <Activity className="h-6 w-6 text-red-500" />,
      trend: 'up',
    },
  ];

  // 최근 활동 데이터
  const recentActivities = [
    {
      user: 'Kim Researcher',
      action: '새로운 데이터셋 업로드',
      time: '10분 전',
      type: 'dataset',
    },
    {
      user: 'Lee Doctor',
      action: '새로운 계정 생성 요청',
      time: '2시간 전',
      type: 'user',
    },
    {
      user: 'Park Professor',
      action: '데이터셋 접근 요청',
      time: '3시간 전',
      type: 'access',
    },
    {
      user: 'Choi Student',
      action: '게시판에 질문 등록',
      time: '어제',
      type: 'forum',
    },
  ];
  
  // 인기 데이터셋
  const popularDatasets = [
    {
      name: '심장 초음파 데이터셋',
      downloads: 1243,
      category: '심장학',
    },
    {
      name: '폐 CT 스캔 컬렉션',
      downloads: 987,
      category: '호흡기학',
    },
    {
      name: '혈액 검사 분석 데이터',
      downloads: 756,
      category: '혈액학',
    },
    {
      name: '뇌 MRI 이미지셋',
      downloads: 682,
      category: '신경학',
    },
  ];
  
  return (
    <div className="space-y-8">
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs mt-1 flex items-center 
                ${stat.trend === 'up' ? 'text-green-500' : 
                 stat.trend === 'down' ? 'text-red-500' : 
                 'text-gray-500 dark:text-gray-400'}`}>
                {stat.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 최근 활동 */}
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">최근 활동</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start pb-4 last:pb-0 last:mb-0 last:border-0 border-b dark:border-gray-800">
                  <div className={`
                    flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3
                    ${activity.type === 'dataset' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      activity.type === 'user' ? 'bg-green-100 dark:bg-green-900/30' :
                      activity.type === 'access' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 
                      'bg-purple-100 dark:bg-purple-900/30'}
                  `}>
                    {activity.type === 'dataset' && <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                    {activity.type === 'user' && <Users className="h-5 w-5 text-green-600 dark:text-green-400" />}
                    {activity.type === 'access' && <Activity className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
                    {activity.type === 'forum' && <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{activity.user}</h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{activity.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" size="sm">
              모든 활동 보기 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* 인기 데이터셋 */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">인기 데이터셋</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularDatasets.map((dataset, index) => (
                <div key={index} className="flex items-center justify-between pb-4 last:pb-0 last:mb-0 last:border-0 border-b dark:border-gray-800">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{dataset.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{dataset.category}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Download className="h-4 w-4 mr-1" />
                    <span>{dataset.downloads}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" size="sm">
              모든 데이터셋 보기 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 