/**
 * 신호 데이터 포인트의 타입
 * 키-값 쌍으로 구성된 객체로, 
 * 각 필드는 시간과 신호값을 나타냅니다.
 */
export interface SignalData {
  time: number;
  [signalName: string]: number | null | undefined;
}

/**
 * 임상 정보 타입
 */
export interface ClinicalInfo {
  caseid: string;
  age?: string;
  sex?: string;
  height?: string;
  weight?: string;
  bmi?: string;
  asa?: string;
  department?: string;
  dx?: string;
  opname?: string;
}

/**
 * 신호 통계 정보 타입
 */
export interface SignalStatistics {
  min: number | null;
  max: number | null;
  mean: number | null;
  std: number | null;
  count: number;
  missing: number;
}

/**
 * 데이터 요청 매개변수 타입
 */
export interface DataRequestParams {
  signals?: string[];
  startTime?: number;
  endTime?: number;
  resolution?: number;
}

/**
 * 데이터 응답 메타데이터 타입
 */
export interface DataResponseMeta {
  original_points: number;
  returned_points: number;
  start_time: number | null;
  end_time: number | null;
  message?: string;
}

/**
 * 데이터 응답 타입
 */
export interface DataResponse {
  data: SignalData[];
  meta: DataResponseMeta;
}

/**
 * 통계 응답 타입
 */
export interface StatisticsResponse {
  statistics: Record<string, SignalStatistics>;
} 