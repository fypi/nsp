'use client';

import {useTranslations} from 'next-intl';
import NavBar from '@/components/Navbar';

export default function SolutionPage() {
  const t = useTranslations();

  return (
    <>
      <NavBar />
      <main className="pt-20 max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">{t('nav.solution')}</h1>
        <p className="text-lg text-gray-600 mb-8">
          {t('solution.intro', {defaultValue: 'Solutions tailored for every scale.'})}
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold mb-2">SaaS Platforms</h2>
            <p className="text-sm text-gray-600">
              Multi-tenant, multi-region, multi-language by default.
            </p>
          </div>

          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold mb-2">Enterprise Systems</h2>
            <p className="text-sm text-gray-600">
              High reliability and security for mission-critical workloads.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
