"use client";

const sections = [
  {
    title: "NinesPro",
    subtitle: "尽知天下事，弹指皆可得",
    bg: "/images/hero-1.jpg",
  },
  {
    title: "Products",
    subtitle: "Powerful tools for everyone",
    bg: "/images/hero-2.jpg",
  },
  {
    title: "Tools",
    subtitle: "永久免费工具集合",
    bg: "/images/hero-3.jpg",
  },
];

export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {sections.map((s, i) => (
        <section
          key={i}
          className="h-screen snap-start relative flex flex-col items-center justify-between text-center"
        >
          {/* 背景 */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${s.bg})` }}
          />

          {/* 黑色渐变遮罩（关键） */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

          {/* 标题 */}
          <div className="relative z-10 mt-24 animate-fadeUp">
            <h1 className="text-5xl md:text-6xl font-medium text-white tracking-wide">
              {s.title}
            </h1>
            <p className="text-lg text-white/80 mt-3">{s.subtitle}</p>
          </div>

          {/* 按钮 */}
          <div className="relative z-10 mb-16 flex gap-4 animate-fadeUp delay-200">
            <button className="btn-white">开始使用</button>
            <button className="btn-dark">了解更多</button>
          </div>
        </section>
      ))}
    </div>
  );
}