'use client';

import {useEffect, useState} from 'react';
import {supabase} from '@/lib/supabaseClient';
import {useRouter} from 'next/navigation';
import Navbar from '../../../components/Navbar';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({data}) => {
      if (!data.user) {
        router.push('/login-required');
      } else {
        setUser(data.user);
      }
    });
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-700">Welcome, {user.email}</p>
      </main>
    </>
  );
}
