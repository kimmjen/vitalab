import { redirect } from 'next/navigation';

export default function AuthNotFound() {
  // 인증 경로에서 존재하지 않는 페이지에 접근하면 로그인 페이지로 리다이렉트
  redirect('/login');
} 