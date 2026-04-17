'use client';

import {useTranslations} from 'next-intl';
import NavBar from '@/components/NavBar';

export default function ProductPage() {
  const t = useTranslations();

  return (
    <>
      <NavBar />
      <main className="pt-20 max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">{t('nav.product')}</h1>
        <p className="text-lg text-gray-600 mb-8">
          {t('product.intro', {defaultValue: 'Our core products for global users.'})}
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold mb-2">Cloud Engine</h2>
            <p className="text-sm text-gray-600">
              High-availability infrastructure for your digital services.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
