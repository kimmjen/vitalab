import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 파트너 타입 정의
export interface Partner {
  id: number;
  name: string;
  logo: string;
  website: string;
  description: string;
  isActive: boolean;
  category: 'academic' | 'industry' | 'hospital' | 'research';
  country: string;
  joinedDate: string;
  contacts?: {
    email?: string;
    phone?: string;
  };
}

// 초기 파트너 데이터
const initialPartners: Partner[] = [
  {
    id: 1,
    name: '서울대학교병원',
    logo: '/images/partners/snuh.png',
    website: 'https://www.snuh.org',
    description: '서울대학교병원은 최고 수준의 진료, 연구, 교육을 통해 국민 건강과 생명을 지키는 국가중앙병원입니다.',
    isActive: true,
    category: 'hospital',
    country: 'South Korea',
    joinedDate: '2020-01-15'
  },
  {
    id: 2,
    name: '카이스트(KAIST)',
    logo: '/images/partners/kaist.png',
    website: 'https://www.kaist.ac.kr',
    description: '카이스트는 한국의 대표적인 과학기술 연구중심 대학으로, 의료기기 및 AI 연구에 협력하고 있습니다.',
    isActive: true,
    category: 'academic',
    country: 'South Korea',
    joinedDate: '2020-03-22'
  },
  {
    id: 3,
    name: 'MedData Inc.',
    logo: '/images/partners/meddata.png',
    website: 'https://example.com/meddata',
    description: '의료 데이터 분석 및 AI 솔루션을 제공하는 기업으로, VitalDB와 협력하여 새로운 통찰력을 제공합니다.',
    isActive: true,
    category: 'industry',
    country: 'United States',
    joinedDate: '2021-05-10'
  },
  {
    id: 4,
    name: '보스턴 종합병원',
    logo: '/images/partners/boston-general.png',
    website: 'https://example.com/boston-general',
    description: '미국 최고의 의료기관 중 하나로, 빅데이터 및 AI 기반 의료 연구에 참여하고 있습니다.',
    isActive: true,
    category: 'hospital',
    country: 'United States',
    joinedDate: '2021-08-17'
  },
  {
    id: 5,
    name: '국립보건연구원',
    logo: '/images/partners/nih.png',
    website: 'https://example.com/nih',
    description: '국가 보건 연구를 주도하는 기관으로, 의학 데이터 표준화 및 공유 프로젝트에 협력하고 있습니다.',
    isActive: true,
    category: 'research',
    country: 'South Korea',
    joinedDate: '2022-01-05'
  },
  {
    id: 6,
    name: 'MedTech Solutions',
    logo: '/images/partners/medtech.png',
    website: 'https://example.com/medtech',
    description: '의료기기 및 소프트웨어 개발 기업으로, 사용자 친화적인 의료 데이터 시각화 도구를 개발합니다.',
    isActive: false,
    category: 'industry',
    country: 'Germany',
    joinedDate: '2022-06-30'
  }
];

// 파트너 스토어 상태 정의
interface PartnersState {
  partners: Partner[];
  loading: boolean;
  error: string | null;
  
  // 액션
  getPartners: () => Promise<Partner[]>;
  addPartner: (partner: Omit<Partner, 'id'>) => Promise<Partner>;
  updatePartner: (id: number, updates: Partial<Partner>) => Promise<Partner>;
  deletePartner: (id: number) => Promise<boolean>;
  togglePartnerStatus: (id: number) => Promise<Partner>;
}

// Zustand 스토어 생성
export const usePartnersStore = create<PartnersState>((set, get) => ({
  partners: [],
  loading: false,
  error: null,
  
  // 모든 파트너 가져오기
  getPartners: async () => {
    set({ loading: true, error: null });
    
    try {
      // 모의 API 호출 - 실제 구현에서는 axios나 fetch로 대체
      await new Promise(resolve => setTimeout(resolve, 500));
      const partners = initialPartners;
      
      set({ partners, loading: false });
      return partners;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '파트너 정보를 가져오는 중 오류가 발생했습니다.';
      set({ error: errorMessage, loading: false });
      return [];
    }
  },
  
  // 새 파트너 추가
  addPartner: async (partnerData) => {
    set({ loading: true, error: null });
    
    try {
      // 모의 API 호출
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 새 ID 생성
      const newId = Math.max(0, ...get().partners.map(p => p.id)) + 1;
      
      const newPartner: Partner = {
        ...partnerData,
        id: newId,
        joinedDate: partnerData.joinedDate || new Date().toISOString().split('T')[0]
      };
      
      // 스토어 업데이트
      set(state => ({
        partners: [...state.partners, newPartner],
        loading: false
      }));
      
      return newPartner;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '파트너를 추가하는 중 오류가 발생했습니다.';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },
  
  // 파트너 정보 업데이트
  updatePartner: async (id, updates) => {
    set({ loading: true, error: null });
    
    try {
      // 모의 API 호출
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 파트너 찾기 및 업데이트
      const partnerIndex = get().partners.findIndex(p => p.id === id);
      
      if (partnerIndex === -1) {
        throw new Error(`ID ${id}에 해당하는 파트너를 찾을 수 없습니다.`);
      }
      
      const updatedPartner: Partner = {
        ...get().partners[partnerIndex],
        ...updates
      };
      
      // 스토어 업데이트
      set(state => {
        const updatedPartners = [...state.partners];
        updatedPartners[partnerIndex] = updatedPartner;
        
        return {
          partners: updatedPartners,
          loading: false
        };
      });
      
      return updatedPartner;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '파트너 정보를 업데이트하는 중 오류가 발생했습니다.';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },
  
  // 파트너 삭제
  deletePartner: async (id) => {
    set({ loading: true, error: null });
    
    try {
      // 모의 API 호출
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 스토어 업데이트
      set(state => ({
        partners: state.partners.filter(p => p.id !== id),
        loading: false
      }));
      
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '파트너를 삭제하는 중 오류가 발생했습니다.';
      set({ error: errorMessage, loading: false });
      return false;
    }
  },
  
  // 파트너 활성 상태 토글
  togglePartnerStatus: async (id) => {
    set({ loading: true, error: null });
    
    try {
      // 모의 API 호출
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 파트너 찾기 및 상태 토글
      const partnerIndex = get().partners.findIndex(p => p.id === id);
      
      if (partnerIndex === -1) {
        throw new Error(`ID ${id}에 해당하는 파트너를 찾을 수 없습니다.`);
      }
      
      const updatedPartner: Partner = {
        ...get().partners[partnerIndex],
        isActive: !get().partners[partnerIndex].isActive
      };
      
      // 스토어 업데이트
      set(state => {
        const updatedPartners = [...state.partners];
        updatedPartners[partnerIndex] = updatedPartner;
        
        return {
          partners: updatedPartners,
          loading: false
        };
      });
      
      return updatedPartner;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '파트너 상태를 변경하는 중 오류가 발생했습니다.';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  }
})); 