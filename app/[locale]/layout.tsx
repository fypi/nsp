import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>; // Next.js 16 必须是 Promise
};

// --- SEO ---
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params; // ✔ 必须 await

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    title: messages['hero.title'] || 'Ninespro',
    description: messages['hero.subtitle'] || 'Simple and powerful digital services for all humanity',
    alternates: {
      languages: {
        en: '/en',
        zh: '/zh',
        'zh-TW': '/zh-TW'
      }
    }
  };
}

// --- Layout ---
export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params; // ✔ 必须 await

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
