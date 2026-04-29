'use client';
import { useMemo, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const locales = ['en','zh','zh-TW'] as const;
type Locale = (typeof locales)[number];

export default function RegisterPage() {
  const router = useRouter();
  const params = useParams();

  const locale: Locale = useMemo(()=>{
    const raw = params?.locale;
    if (typeof raw === 'string' && locales.includes(raw as Locale)) return raw;
    return 'zh';
  }, [params]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string|null>(null);
  const [infoMsg, setInfoMsg] = useState<string|null>(null);

  const onSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setInfoMsg(null);

    try {
      const origin = window.location.origin;
      const redirectTo = `${origin}/${locale}/login`;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectTo }
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setInfoMsg(locale === 'en' ? 'Check your email to confirm your account.' : '请到邮箱确认账号。');
      }
    } catch (err) {
      setErrorMsg('网络异常，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    // 👇 这里我修复了手机版！！！
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: '#fff'
    }}>
      <div style={{ width: '100%', maxWidth: '380px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px' }}>
          {locale === 'en' ? 'Register' : '注册'}
        </h1>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              style={{
                width: '100%',
                border: '1px solid #ddd',
                borderRadius: '999px',
                padding: '14px 18px',
                fontSize: '15px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>密码</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              style={{
                width: '100%',
                border: '1px solid #ddd',
                borderRadius: '999px',
                padding: '14px 18px',
                fontSize: '15px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {errorMsg && <p style={{ color: 'red', fontSize: '13px', textAlign: 'center' }}>{errorMsg}</p>}
          {infoMsg && <p style={{ color: 'green', fontSize: '13px', textAlign: 'center' }}>{infoMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '999px',
              padding: '14px',
              fontSize: '15px',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Loading...' : '创建账号'}
          </button>
        </form>

        <p style={{ marginTop: '20px', fontSize: '14px', textAlign: 'center' }}>
          <a href={`/${locale}/login`} style={{ color: '#007bff' }}>
            {locale === 'en' ? 'Back to login' : '返回登录'}
          </a>
        </p>
      </div>
    </div>
  );
}