'use client';

import {useTranslations} from 'next-intl';
import NavBar from '@/components/NavBar';

export default function SupportPage() {
  const t = useTranslations();

  return (
    <>
      <NavBar />
      <main className="pt-20 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">{t('nav.support')}</h1>
        <p className="text-lg text-gray-600 mb-8">
          {t('support.intro', {defaultValue: 'We are here to help you succeed.'})}
        </p>

        <ul className="space-y-3 text-gray-700">
          <li>• 24/7 incident response</li>
          <li>• Dedicated support channels</li>
          <li>• Architecture guidance</li>
        </ul>
      </main>
    </>
  );
}
