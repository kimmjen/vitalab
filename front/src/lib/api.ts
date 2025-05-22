import axios from 'axios';

// API 기본 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 포럼 포스트 타입 정의

export interface Post {
  id: number;
  category: string;
  title: string;
  content?: string;
  author: string;
  views: number;
  created_at: string;
  updated_at?: string;
  comment_count?: number;
}

// 케이스 데이터 타입 정의
export interface Case {
  caseid: number;
  subjectid: string;
  age?: number;
  sex?: string;
  height?: number;
  weight?: number;
  department?: string;
  optype?: string;
  dx?: string;
  opname?: string;
}

// 트랙 데이터 타입 정의
export interface Track {
  caseid: number;
  tname: string;
  tid: string;
}

// 검사 데이터 타입 정의
export interface Lab {
  caseid: number;
  dt: number;
  name: string;
  result: number;
}

// 포럼 포스트 가져오기
export const fetchPosts = async (category?: string, page: number = 1, limit: number = 10): Promise<{ posts: Post[], total: number }> => {
  try {
    const response = await api.get('/forum/posts', {
      params: { category, page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    // 개발용 더미 데이터 (실제 API 연결 실패 시 표시)
    return {
      posts: [
        {
          id: 1,
          category: "Question",
          title: "How to install VitalDB?",
          author: "user123",
          views: 1234,
          created_at: "2024-02-15",
          comment_count: 5
        },
        {
          id: 2,
          category: "Discussion",
          title: "Data analysis best practices",
          author: "researcher",
          views: 890,
          created_at: "2024-03-10",
          comment_count: 3
        }
      ],
      total: 2
    };
  }
};

// 케이스 데이터 가져오기
export const fetchCases = async (page: number = 1, limit: number = 10): Promise<{ cases: Case[], total: number }> => {
  try {
    const response = await api.get('/cases', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    return { cases: [], total: 0 };
  }
};

// 트랙 데이터 가져오기
export const fetchTracks = async (caseid?: number): Promise<Track[]> => {
  try {
    const response = await api.get('/tracks', {
      params: { caseid }
    });
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    return [];
  }
};

// 트랙 상세 데이터 가져오기
export const fetchTrackData = async (tid: string): Promise<any> => {
  try {
    const response = await api.get(`/tracks/${tid}`);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    return [];
  }
};

// 검사 결과 가져오기
export const fetchLabs = async (caseid?: number): Promise<Lab[]> => {
  try {
    const response = await api.get('/labs', {
      params: { caseid }
    });
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    return [];
  }
};

export default api;