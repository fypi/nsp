'use client';
import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const locales = ['en','zh','zh-TW'] as const;
type Locale = (typeof locales)[number];

export default function ForgotPasswordPage() {
  const params = useParams();
  const router = useRouter();

  const locale: Locale = useMemo(()=>{
    const raw = params?.locale;
    if (typeof raw === 'string' && locales.includes(raw as Locale)) return raw;
    return 'zh';
  }, [params]);

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string|null>(null);
  const [infoMsg, setInfoMsg] = useState<string|null>(null);

  const onSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true); setErrorMsg(null); setInfoMsg(null);
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const redirectTo = `${origin}/${locale}/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    setLoading(false);
    if (error) { setErrorMsg(error.message); return; }
    setInfoMsg(locale === 'en' ? 'If the email exists, you’ll receive a reset link.' : '如果该邮箱存在，你将收到重置链接。');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 20px',
      boxSizing: 'border-box',
      margin: 0,
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px' }}>
          {locale === 'en' ? 'Reset Password' : locale === 'zh-TW' ? '重設密碼' : '重置密码'}
        </h1>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', textAlign: 'left' }}>
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
                boxSizing: 'border-box'
              }}
            />
          </div>

          {errorMsg && <p style={{ color: 'red', fontSize: '12px', textAlign: 'center' }}>{errorMsg}</p>}
          {infoMsg && <p style={{ color: 'green', fontSize: '12px', textAlign: 'center' }}>{infoMsg}</p>}

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
            {loading ? 'Loading...' : locale === 'en' ? 'Send email' : '发送邮件'}
          </button>
        </form>

        <p style={{ marginTop: '20px', fontSize: '13px', textAlign: 'center' }}>
          <a href={`/${locale}/login`} style={{ color: '#007bff' }}>
            {locale === 'en' ? 'Back to login' : '返回登录'}
          </a>
        </p>
      </div>
    </div>
  );
}