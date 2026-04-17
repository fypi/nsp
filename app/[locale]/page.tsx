'use client';

import {useTranslations} from 'next-intl';
import NavBar from '@/components/NavBar';

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <NavBar />

      {/* 1. Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 animate-slow-zoom"
          style={{backgroundImage: "url('https://picsum.photos/id/1015/1920/1080')"}}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center text-white px-6 fade-in">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-2xl mb-10 max-w-2xl mx-auto opacity-90">
            {t('hero.subtitle')}
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-black px-10 py-4 rounded font-medium hover:bg-gray-200 transition-all">
              {t('button.try')}
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded font-medium hover:bg-white/10 transition-all">
              {t('button.more')}
            </button>
          </div>
        </div>
      </section>

      <main className="bg-white">

        {/* 2. 信任背书 */}
        <section className="py-16 border-b">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-6">
              TRUSTED BY TEAMS WORLDWIDE
            </p>
            <div className="flex flex-wrap justify-center gap-10 text-gray-400">
              <span>AlphaCloud</span>
              <span>NovaTech</span>
              <span>DeepLink</span>
              <span>SkyBridge</span>
            </div>
          </div>
        </section>

        {/* 3. 三大核心价值 */}
        <section className="py-20 border-b">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8">Why Ninespro</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="font-semibold mb-2">Global by Design</h3>
                <p className="text-sm text-gray-600">
                  Built for multi-region, multi-language, multi-tenant from day one.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Simple, not basic</h3>
                <p className="text-sm text-gray-600">
                  A clean, opinionated experience that hides complexity without limiting power.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Secure & Reliable</h3>
                <p className="text-sm text-gray-600">
                  Enterprise-grade security, observability, and uptime guarantees.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 产品模块预览 */}
        <section className="py-20 border-b">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">{t('nav.product')}</h2>
            <p className="text-gray-600 mb-10">
              A unified platform for building, deploying, and scaling digital services.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="border rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-2">Compute</h3>
                <p className="text-sm text-gray-600">
                  Auto-scaling compute for APIs, workers, and background jobs.
                </p>
              </div>
              <div className="border rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-2">Data</h3>
                <p className="text-sm text-gray-600">
                  Managed databases, caching, and analytics in one place.
                </p>
              </div>
              <div className="border rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-2">Edge</h3>
                <p className="text-sm text-gray-600">
                  Low-latency edge functions and routing for global users.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 工具模块预览 */}
        <section className="py-20 border-b bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">{t('nav.tool')}</h2>
            <p className="text-gray-600 mb-10">
              Tools that help teams move from idea to production faster.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="border rounded-xl p-6 bg-white">
                <h3 className="font-semibold mb-2">CLI & SDKs</h3>
                <p className="text-sm text-gray-600">
                  First-class tooling for TypeScript, Python, and more.
                </p>
              </div>
              <div className="border rounded-xl p-6 bg-white">
                <h3 className="font-semibold mb-2">Observability</h3>
                <p className="text-sm text-gray-600">
                  Logs, metrics, and traces in a single, unified view.
                </p>
              </div>
              <div className="border rounded-xl p-6 bg-white">
                <h3 className="font-semibold mb-2">Workflows</h3>
                <p className="text-sm text-gray-600">
                  Orchestrate complex jobs with visual workflows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. 解决方案 */}
        <section className="py-20 border-b">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">{t('nav.solution')}</h2>
            <p className="text-gray-600 mb-10">
              From startups to enterprises, Ninespro adapts to your scale.
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="border rounded-xl p-6">
                <h3 className="font-semibold mb-2">SaaS Platforms</h3>
                <p className="text-sm text-gray-600">
                  Multi-tenant, multi-region, and multi-language by default.
                </p>
              </div>
              <div className="border rounded-xl p-6">
                <h3 className="font-semibold mb-2">Internal Tools</h3>
                <p className="text-sm text-gray-600">
                  Build internal dashboards and workflows with production-grade infra.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. 关于我们 */}
        <section className="py-20 border-b bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">{t('nav.about')}</h2>
            <p className="text-gray-600 mb-6">
              Ninespro is built for teams who care about both craft and scale.
            </p>
            <p className="text-gray-600">
              We believe infrastructure should feel invisible, opinionated where it matters,
              and flexible where it counts.
            </p>
          </div>
        </section>

        {/* 8. 支援 */}
        <section className="py-20 border-b">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">{t('nav.support')}</h2>
            <p className="text-gray-600 mb-8">
              Dedicated support for teams that run critical workloads on Ninespro.
            </p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>• 24/7 incident response</li>
              <li>• Dedicated Slack channel</li>
              <li>• Architecture reviews and best practices</li>
            </ul>
          </div>
        </section>

        {/* 9. CTA */}
        <section className="py-20 border-b bg-black text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to build what&apos;s next?
            </h2>
            <p className="text-gray-300 mb-8">
              Start with the free tier. Scale when you&apos;re ready.
            </p>
            <button className="bg-white text-black px-10 py-4 rounded font-medium hover:bg-gray-200 transition-all">
              {t('button.try')}
            </button>
          </div>
        </section>

        {/* 10. Footer */}
        <footer className="py-10 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Ninespro. All rights reserved.
        </footer>
      </main>
    </>
  );
}
