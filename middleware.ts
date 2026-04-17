import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'zh', 'zh-TW'],
  defaultLocale: 'en',
  localeDetection: true
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
};
