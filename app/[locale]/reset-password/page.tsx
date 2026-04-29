'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const locales = ['en', 'zh', 'zh-TW'] as const;
type Locale = (typeof locales)[number];

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();

  const locale: Locale = useMemo(() => {
    const raw = params?.locale;
    if (typeof raw === 'string' && locales.includes(raw as Locale)) return raw as Locale;
    return 'zh';
  }, [params]);

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') return;
    });
    return () => subscription.unsubscribe();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setInfoMsg(null);

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setInfoMsg(locale === 'en' ? 'Password updated!' : '密码已更新！');
    setTimeout(() => router.replace(`/${locale}/login`), 1500);
  };

  return (
<div className="min-h-screen flex items-center justify-center px-4 pt-20">      
  <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {locale === 'en' ? 'New Password' : locale === 'zh-TW' ? '新密碼' : '新密码'}
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 font-medium">
              {locale === 'en' ? 'New Password' : '新密码'}
            </label>
            <input
              className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              autoComplete="new-password"
            />
          </div>

          {errorMsg && <div className="text-red-600 text-sm text-center">{errorMsg}</div>}
          {infoMsg && <div className="text-green-700 text-sm text-center">{infoMsg}</div>}

          <button
            disabled={loading}
            className="w-full px-6 py-3 bg-black text-white rounded-full disabled:opacity-60 hover:bg-gray-800 transition"
            type="submit"
          >
            {loading ? '...' : locale === 'en' ? 'Update password' : '更新密码'}
          </button>
        </form>
      </div>
    </div>
  );
}