'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Lock, Check } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // URL에서 토큰 파라미터 가져오기
  useEffect(() => {
    const tokenParam = searchParams?.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setErrorMessage('유효하지 않은 비밀번호 재설정 링크입니다.');
    }
  }, [searchParams]);

  // 비밀번호 강도 검사
  const passwordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const strengthClass = () => {
    const strength = passwordStrength();
    if (strength === 0) return 'bg-gray-200 dark:bg-gray-700';
    if (strength === 1) return 'bg-red-500';
    if (strength === 2) return 'bg-yellow-500';
    if (strength === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const strengthText = () => {
    const strength = passwordStrength();
    if (strength === 0) return t('auth.resetPassword.passwordStrength.none') || '비밀번호를 입력하세요';
    if (strength === 1) return t('auth.resetPassword.passwordStrength.weak') || '약함';
    if (strength === 2) return t('auth.resetPassword.passwordStrength.fair') || '보통';
    if (strength === 3) return t('auth.resetPassword.passwordStrength.good') || '좋음';
    return t('auth.resetPassword.passwordStrength.strong') || '강함';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // 유효성 검사
    if (!password || !confirmPassword) {
      setErrorMessage('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (passwordStrength() < 3) {
      setErrorMessage('더 강력한 비밀번호를 사용해주세요.');
      return;
    }

    if (!token) {
      setErrorMessage('유효하지 않은 비밀번호 재설정 링크입니다.');
      return;
    }

    setIsLoading(true);

    try {
      // 실제 비밀번호 재설정 처리는 API 연결 후 구현
      // Mock 처리
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 비밀번호 재설정 성공
      setSuccess(true);
    } catch (error) {
      setErrorMessage('비밀번호 재설정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 space-y-8">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {t('auth.resetPassword.title') || '비밀번호 재설정'}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {t('auth.resetPassword.description') || '새로운 비밀번호를 설정해주세요.'}
        </p>
      </div>

      {success ? (
        <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800 dark:text-green-300">
                {t('auth.resetPassword.success') || '비밀번호가 성공적으로 재설정되었습니다'}
              </h3>
              <div className="mt-2 text-sm text-green-700 dark:text-green-400">
                <p>
                  {t('auth.resetPassword.successDescription') || '새 비밀번호로 로그인할 수 있습니다.'}
                </p>
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <Link
                    href="/login"
                    className="rounded-md bg-green-50 dark:bg-green-900/30 px-2 py-1.5 text-sm font-medium text-green-800 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                  >
                    {t('auth.resetPassword.login') || '로그인하기'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {errorMessage && (
            <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
              <div className="text-sm text-red-700 dark:text-red-400">
                {errorMessage}
              </div>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label 
                  htmlFor="password" 
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t('auth.resetPassword.newPassword') || '새 비밀번호'}
                </Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    className="block w-full pl-10 pr-10 text-gray-900 dark:text-gray-100"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="mt-1">
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full ${strengthClass()}`} style={{ width: `${passwordStrength() * 25}%` }}></div>
                  </div>
                  <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                    {strengthText()}
                  </p>
                  <ul className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <li className="flex items-center">
                      <span className={`mr-1 ${password.length >= 8 ? 'text-green-500' : ''}`}>
                        {password.length >= 8 ? <Check className="h-3 w-3" /> : '•'}
                      </span>
                      {t('auth.resetPassword.passwordRequirements.length') || '8자 이상'}
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-1 ${/[A-Z]/.test(password) ? 'text-green-500' : ''}`}>
                        {/[A-Z]/.test(password) ? <Check className="h-3 w-3" /> : '•'}
                      </span>
                      {t('auth.resetPassword.passwordRequirements.uppercase') || '대문자 포함'}
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-1 ${/[0-9]/.test(password) ? 'text-green-500' : ''}`}>
                        {/[0-9]/.test(password) ? <Check className="h-3 w-3" /> : '•'}
                      </span>
                      {t('auth.resetPassword.passwordRequirements.number') || '숫자 포함'}
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-1 ${/[^A-Za-z0-9]/.test(password) ? 'text-green-500' : ''}`}>
                        {/[^A-Za-z0-9]/.test(password) ? <Check className="h-3 w-3" /> : '•'}
                      </span>
                      {t('auth.resetPassword.passwordRequirements.special') || '특수문자 포함'}
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <Label 
                  htmlFor="confirm-password" 
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t('auth.resetPassword.confirmPassword') || '비밀번호 확인'}
                </Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    className={`block w-full pl-10 pr-10 ${
                      confirmPassword && password !== confirmPassword
                        ? 'border-red-500 dark:border-red-500'
                        : 'text-gray-900 dark:text-gray-100'
                    }`}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {t('auth.resetPassword.passwordMismatch') || '비밀번호가 일치하지 않습니다.'}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="group relative w-full"
                disabled={isLoading || !token}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('auth.resetPassword.resetting') || '재설정 중...'}
                  </span>
                ) : (
                  t('auth.resetPassword.reset') || '비밀번호 재설정'
                )}
              </Button>
            </div>
          </form>
        </>
      )}

      <div className="text-center mt-6">
        <Link
          href="/login"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {t('auth.resetPassword.backToLogin') || '로그인으로 돌아가기'}
        </Link>
      </div>
    </div>
  );
}