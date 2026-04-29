'use client';
import Link from 'next/link';

export default function LoginRequired() {
  return (
<div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">Login Required</h1>
        <p className="text-gray-600 mb-6">You must sign in to access this page.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}