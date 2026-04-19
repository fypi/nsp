import "../globals.css";
import Navbar from "@/components/Navbar";

export default function Layout({
  children,
  params: { locale },
}) {
  return (
    <html lang={locale}>
      {/* 👇 只有一个 body！！！ */}
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}