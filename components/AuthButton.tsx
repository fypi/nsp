'use client';

import {useEffect, useState, useRef} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from "@/lib/supabaseClient";

export default function AuthButton() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({data}) => {
      setUser(data.user);
    });

    const {data: listener} = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined
      }
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
  };

  if (!user) {
    return (
      <button
        onClick={login}
        className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all"
      >
        Sign in
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setMenuOpen(!menuOpen)}>
        <Image
          src={user.user_metadata?.avatar_url || '/default-avatar.png'}
          alt="avatar"
          width={36}
          height={36}
          className="rounded-full border hover:opacity-80 transition-all"
        />
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl border rounded-xl py-2 text-sm z-50">
          <Link
            href="/dashboard"
            className="block px-5 py-3 hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            Profile / Dashboard
          </Link>

          <button
            onClick={logout}
            className="block w-full text-left px-5 py-3 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
