import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 🔧 移除重复的 viewport meta —— 根 layout.tsx 已统一处理 */}
      <Navbar />
      {children}
    </>
  );
}
