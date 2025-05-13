// Types related to translation management

export interface Language {
  code: string;
  name: string;
  progress: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface Translation {
  [langCode: string]: string;
}

export interface TranslationItem {
  key: string;
  category: string;
  translations: Translation;
  lastUpdated: string;
}

export interface TranslationsState {
  languages: Language[];
  categories: Category[];
  items: TranslationItem[];
}

// Represents the structure of the translations.json file
export interface TranslationsFile {
  [langCode: string]: {
    [category: string]: {
      [key: string]: string | {
        [subKey: string]: string | any;
      }
    }
  }
}

export interface ImportRequest {
  data: Record<string, any>;
  importMode: 'merge' | 'overwrite' | 'keep';
  language?: string;
}

export interface ImportStats {
  total: number;
  added: number;
  updated: number;
  skipped: number;
}

// 번역 관리 시스템에 사용되는 타입 정의

// 번역 관리 API 응답
export interface TranslationApiResponse {
  success: boolean;
  data?: TranslationsFile;
  error?: string;
  timestamp?: string;
} 