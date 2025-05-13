'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, User, Check } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

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
    if (strength === 0) return t('auth.register.passwordStrength.none');
    if (strength === 1) return t('auth.register.passwordStrength.weak');
    if (strength === 2) return t('auth.register.passwordStrength.fair');
    if (strength === 3) return t('auth.register.passwordStrength.good');
    return t('auth.register.passwordStrength.strong');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // 유효성 검사
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage(t('auth.register.error.requiredFields'));
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(t('auth.register.error.passwordMismatch'));
      return;
    }

    if (passwordStrength() < 3) {
      setErrorMessage(t('auth.register.error.weakPassword'));
      return;
    }

    if (!acceptTerms) {
      setErrorMessage(t('auth.register.error.termsRequired'));
      return;
    }

    setIsLoading(true);

    try {
      // 실제 회원가입 처리는 API 연결 후 구현
      // Mock 회원가입 처리
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 회원가입 성공 후 로그인 페이지로 이동
      router.push('/login?registered=true');
    } catch (error) {
      setErrorMessage(t('auth.register.error.registrationFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {t('auth.register.title')}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {t('auth.register.haveAccount')}{' '}
          <Link 
            href="/login" 
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t('auth.register.login')}
          </Link>
        </p>
      </div>

      {errorMessage && (
        <div className="rounded-xl bg-red-50 p-4 dark:bg-red-900/20 mb-4">
          <div className="text-sm text-red-700 dark:text-red-400">
            {errorMessage}
          </div>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Label 
              htmlFor="name"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('auth.register.name')}
            </Label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full pl-10 text-gray-900 dark:text-gray-100"
                placeholder={t('auth.register.namePlaceholder')}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label 
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('auth.register.email')}
            </Label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full pl-10 text-gray-900 dark:text-gray-100"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label 
              htmlFor="password" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('auth.register.password')}
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
                  {t('auth.register.passwordRequirements.length')}
                </li>
                <li className="flex items-center">
                  <span className={`mr-1 ${/[A-Z]/.test(password) ? 'text-green-500' : ''}`}>
                    {/[A-Z]/.test(password) ? <Check className="h-3 w-3" /> : '•'}
                  </span>
                  {t('auth.register.passwordRequirements.uppercase')}
                </li>
                <li className="flex items-center">
                  <span className={`mr-1 ${/[0-9]/.test(password) ? 'text-green-500' : ''}`}>
                    {/[0-9]/.test(password) ? <Check className="h-3 w-3" /> : '•'}
                  </span>
                  {t('auth.register.passwordRequirements.number')}
                </li>
                <li className="flex items-center">
                  <span className={`mr-1 ${/[^A-Za-z0-9]/.test(password) ? 'text-green-500' : ''}`}>
                    {/[^A-Za-z0-9]/.test(password) ? <Check className="h-3 w-3" /> : '•'}
                  </span>
                  {t('auth.register.passwordRequirements.special')}
                </li>
              </ul>
            </div>
          </div>

          <div>
            <Label 
              htmlFor="confirm-password" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('auth.register.confirmPassword')}
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
                className="block w-full pl-10 pr-10 text-gray-900 dark:text-gray-100"
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
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700 dark:text-gray-300">
                {t('auth.register.agreeTerms')}
              </label>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Button
            type="submit"
            className="w-full h-11 text-base font-medium shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('auth.register.creatingAccount')}
              </span>
            ) : (
              t('auth.register.createAccount')
            )}
          </Button>
        </div>
      </form>

      <div>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              {t('auth.register.orContinueWith')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            type="button"
            className="group relative flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:shadow-md"
          >
            <span className="flex items-center">
              <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
              </svg>
            </span>
          </button>

          <button 
            type="button"
            className="group relative flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:shadow-md"
          >
            <span className="flex items-center">
              <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </>
  );
} 