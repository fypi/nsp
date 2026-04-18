'use client';

import {useTranslations} from 'next-intl';

export default function ToolPage() {
  const t = useTranslations();

  return (
    <>
      <Navbar />
      <main className="pt-20 max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">{t('nav.tool')}</h1>
        <p className="text-lg text-gray-600 mb-8">
          {t('tool.intro', {defaultValue: 'Tools that accelerate your workflow.'})}
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold mb-2">Developer CLI</h2>
            <p className="text-sm text-gray-600">
              A powerful command-line toolkit for developers.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
