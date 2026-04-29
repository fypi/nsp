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
        options: {
          emailRedirectTo: redirectTo
        }
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setInfoMsg(locale === 'en' 
          ? 'Check your email to confirm your account.' 
          : locale === 'zh-TW' 
          ? '請到郵箱確認帳號。' 
          : '请到邮箱确认账号。'
        );
      }
    } catch (err) {
      setErrorMsg('网络异常，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 20px',
      boxSizing: 'border-box',
      margin: 0,
      backgroundColor: '#fff',
      zIndex: 10
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          textAlign: 'center',
          margin: '0 0 24px 0'
        }}>
          {locale === 'en' ? 'Register' : locale === 'zh-TW' ? '註冊' : '注册'}
        </h1>

        <form onSubmit={onSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              marginBottom: '6px',
              textAlign: 'left'
            }}>
              {locale === 'en' ? 'Email' : '邮箱'}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              style={{
                width: '100%',
                border: '1px solid #ddd',
                borderRadius: '999px',
                padding: '12px 16px',
                fontSize: '15px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              marginBottom: '6px',
              textAlign: 'left'
            }}>
              {locale === 'en' ? 'Password' : '密码'}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              style={{
                width: '100%',
                border: '1px solid #ddd',
                borderRadius: '999px',
                padding: '12px 16px',
                fontSize: '15px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          {errorMsg && <p style={{ color: 'red', fontSize: '12px', textAlign: 'center', margin: 0 }}>{errorMsg}</p>}
          {infoMsg && <p style={{ color: 'green', fontSize: '12px', textAlign: 'center', margin: 0 }}>{infoMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '999px',
              padding: '12px',
              fontSize: '15px',
              cursor: 'pointer',
              boxSizing: 'border-box'
            }}
          >
            {loading ? 'Loading...' : locale === 'en' ? 'Create account' : '创建账号'}
          </button>
        </form>

        <p style={{ marginTop: '20px', fontSize: '13px', textAlign: 'center', margin: 0 }}>
          <a href={`/${locale}/login`} style={{ color: '#007bff', textDecoration: 'none' }}>
            {locale === 'en' ? 'Back to login' : '返回登录'}
          </a>
        </p>
      </div>
    </div>
  );
}