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
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {sections.map((s, i) => (
        <section
          key={i}
          className="h-screen snap-start relative flex flex-col items-center justify-between text-center"
        >
          {/* 背景图 */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${s.bg})` }}
          />

          {/* 蒙层（Tesla关键） */}
          <div className="absolute inset-0 bg-black/20" />

          {/* 内容 */}
          <div className="relative z-10 mt-24">
            <h1 className="text-5xl font-medium tracking-wide text-white">
              {s.title}
            </h1>
            <p className="text-lg text-white/80 mt-2">{s.subtitle}</p>
          </div>

          {/* 按钮 */}
          <div className="relative z-10 mb-16 flex gap-4">
            <button className="btn-white">开始使用</button>
            <button className="btn-dark">了解更多</button>
          </div>
        </section>
      ))}
    </div>
  );
}