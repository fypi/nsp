// middleware.ts
import { locales, defaultLocale } from './i18n';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};