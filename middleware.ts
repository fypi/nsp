import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'zh', 'zh-TW'],
  defaultLocale: 'zh'
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};