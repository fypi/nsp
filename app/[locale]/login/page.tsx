'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const locales = ['en', 'zh', 'zh-TW'] as const;
type Locale = (typeof locales)[number];

export default function LoginPage() {
  const router = useRouter();
  const params = useParams();
  const search = useSearchParams();

  // 修复：直接从 params 获取 locale，避免 useMemo 不生效
  const locale = (() => {
    const raw = params?.locale;
    if (typeof raw === 'string' && locales.includes(raw as Locale)) return raw as Locale;
    return 'zh';
  })();

  const nextPath = search.get('next') ?? '';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    const target = nextPath && nextPath.startsWith('/') ? nextPath : `/${locale}`;
    router.replace(target);
  };

  // 修复：内联样式 + Tailwind 双重保障，强制居中
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      paddingTop: '5rem', // 避开导航栏
      backgroundColor: '#ffffff'
    }}>
      <div style={{ width: '100%', maxWidth: '28rem' }}>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          {locale === 'en' ? 'Login' : locale === 'zh-TW' ? '登入' : '登录'}
        </h1>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              marginBottom: '0.25rem',
              fontWeight: 500
            }}>
              {locale === 'en' ? 'Email' : '邮箱'}
            </label>
            <input
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '9999px',
                padding: '0.75rem 1rem',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#000000';
                e.target.style.boxShadow = '0 0 0 2px rgba(0,0,0,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              marginBottom: '0.25rem',
              fontWeight: 500
            }}>
              {locale === 'en' ? 'Password' : '密码'}
            </label>
            <input
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '9999px',
                padding: '0.75rem 1rem',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#000000';
                e.target.style.boxShadow = '0 0 0 2px rgba(0,0,0,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              autoComplete="current-password"
            />
          </div>

          {errorMsg && (
            <div style={{
              color: '#dc2626',
              fontSize: '0.875rem',
              textAlign: 'center'
            }}>
              {errorMsg}
            </div>
          )}

          <button
            style={{
              width: '100%',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#000000',
              color: '#ffffff',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#1f2937';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
            }}
            disabled={loading}
            type="submit"
          >
            {loading ? '...' : locale === 'en' ? 'Sign in' : locale === 'zh-TW' ? '登入' : '登录'}
          </button>
        </form>

        <div style={{
          marginTop: '1.25rem',
          fontSize: '0.875rem',
          color: '#4b5563',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <Link
            href={`/${locale}/register`}
            style={{ color: '#2563eb', textDecoration: 'underline' }}
          >
            {locale === 'en' ? 'Create an account' : '注册账号'}
          </Link>
          <Link
            href={`/${locale}/forgot-password`}
            style={{ color: '#2563eb', textDecoration: 'underline' }}
          >
            {locale === 'en' ? 'Forgot password?' : '忘记密码？'}
          </Link>
        </div>
      </div>
    </div>
  );
}