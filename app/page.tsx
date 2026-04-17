'use client';

import { useState } from 'react';

export default function Home() {
  const [currentLang, setCurrentLang] = useState<'zh' | 'en' | 'zh-TW'>('zh');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const translations = {
    zh: {
      logo: "九域",
      navHome: "首页",
      navProduct: "产品",
      navAbout: "关于我们",
      navSolution: "解决方案",
      navSupport: "支持",
      heroTitle: "欢迎来到九域",
      heroSubtitle: "为全人类提供简单而强大的数字服务",
      button1: "立即体验",
      button2: "了解更多",
    },
    en: {
      logo: "Ninespro",
      navHome: "Home",
      navProduct: "Products",
      navAbout: "About Us",
      navSolution: "Solutions",
      navSupport: "Support",
      heroTitle: "Welcome to Ninespro",
      heroSubtitle: "Simple and powerful digital services for all humanity",
      button1: "Try Now",
      button2: "Learn More",
    },
    'zh-TW': {
      logo: "九域",
      navHome: "首頁",
      navProduct: "產品",
      navAbout: "關於我們",
      navSolution: "解決方案",
      navSupport: "支援",
      heroTitle: "歡迎來到九域",
      heroSubtitle: "為全人類提供簡單而強大的數位服務",
      button1: "立即體驗",
      button2: "了解更多",
    }
  };

  const t = translations[currentLang];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b">
        <div className="h-15 max-w-screen-3xl mx-auto px-5 flex items-center">

          {/* 九域 - 最左边 */}
          <div className="font-bold text-4xl tracking-tighter text-black">
            {t.logo}
          </div>

          {/* 导航菜单 - 靠右一些 */}
          <div className="flex- 8 flex justify-end gap-x-20 text-sm font-medium text-black pl-150">
            <a href="#" className="hover:underline transition-all">{t.navHome}</a>
            <a href="#" className="hover:underline transition-all">{t.navProduct}</a>
            <a href="#" className="hover:underline transition-all">{t.navAbout}</a>
            <a href="#" className="hover:underline transition-all">{t.navSolution}</a>
            <a href="#" className="hover:underline transition-all">{t.navSupport}</a>
          </div>

          {/* 右边三个图标 - 紧贴最右边 */}
          <div className="flex items-center gap-x-6 text-x1 text-black ml-4">
            <button className="hover:text-gray-600 transition-colors">
              <i className="fa-solid fa-question"></i>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)} 
                className="hover:text-gray-700 transition-colors"
              >
                <i className="fa-solid fa-globe"></i>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-4 bg-white shadow-2xl border rounded-2xl py-2 w-44 text-sm z-50">
                  <a href="#" onClick={() => {setCurrentLang('zh'); setShowLangMenu(false);}} className="block px-6 py-3 hover:bg-gray-100">简体中文</a>
                  <a href="#" onClick={() => {setCurrentLang('en'); setShowLangMenu(false);}} className="block px-6 py-3 hover:bg-gray-100">English</a>
                  <a href="#" onClick={() => {setCurrentLang('zh-TW'); setShowLangMenu(false);}} className="block px-6 py-3 hover:bg-gray-100">繁體中文</a>
                </div>
              )}
            </div>

            <button 
              onClick={() => alert('注册 / 登录功能开发中...')}
              className="hover:text-gray-700 transition-colors"
            >
              <i className="fa-regular fa-user"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* 英雄区 */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://picsum.photos/id/1015/1920/1080')" }}
        ></div>
        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-2xl mb-12 max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-black px-10 py-4 rounded font-medium hover:bg-gray-200 transition-all">
              {t.button1}
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded font-medium hover:bg-white/10 transition-all">
              {t.button2}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}