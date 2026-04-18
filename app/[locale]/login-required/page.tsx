'use client';

import Link from 'next/link';

export default function LoginRequired() {
  return (
    <>
      <Navbar />
      <main className="pt-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Login Required</h1>
        <p className="text-gray-600 mb-6">You must sign in to access this page.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800"
        >
          Go Home
        </Link>
      </main>
    </>
  );
}
