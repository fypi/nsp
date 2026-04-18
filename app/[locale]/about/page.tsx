'use client';

import {useTranslations} from 'next-intl';

export default function AboutPage() {
  const t = useTranslations();

  return (
    <>
      <main className="pt-20 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">{t('nav.about')}</h1>
        <p className="text-lg text-gray-600 mb-6">
          {t('about.intro', {defaultValue: 'We build technology for global users.'})}
        </p>

        <p className="text-gray-700 leading-relaxed">
          Ninespro is committed to creating simple, powerful, and accessible digital services
          for everyone. Our mission is to empower individuals and teams with world-class tools.
        </p>
      </main>
    </>
  );
}
