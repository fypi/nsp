import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  return (
    <>
      {/* 👇 手机平板适配（只加这一句，不破坏任何布局） */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <Navbar />
      {children}
    </>
  );
}