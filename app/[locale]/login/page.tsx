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

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: '#ffffff'
    }}>
      <div style={{ width: '100%', maxWidth: '380px' }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          {locale === 'en' ? 'Login' : locale === 'zh-TW' ? '登入' : '登录'}
        </h1>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>
              {locale === 'en' ? 'Email' : '邮箱'}
            </label>
            <input
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '9999px',
                padding: '14px 18px',
                fontSize: '15px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>
              {locale === 'en' ? 'Password' : '密码'}
            </label>
            <input
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '9999px',
                padding: '14px 18px',
                fontSize: '15px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>

          {errorMsg && (
            <div style={{ color: '#dc2626', fontSize: '13px', textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}

          <button
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '9999px',
              border: 'none',
              fontSize: '15px',
              cursor: 'pointer'
            }}
            disabled={loading}
            type="submit"
          >
            {loading ? '...' : locale === 'en' ? 'Sign in' : '登录'}
          </button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '14px', textAlign: 'center', gap: '8px', display: 'flex', flexDirection: 'column' }}>
          <Link href={`/${locale}/register`} style={{ color: '#007bff' }}>
            {locale === 'en' ? 'Create an account' : '注册账号'}
          </Link>
          <Link href={`/${locale}/forgot-password`} style={{ color: '#007bff' }}>
            {locale === 'en' ? 'Forgot password?' : '忘记密码？'}
          </Link>
        </div>
      </div>
    </div>
  );
}