import "../globals.css";
import Navbar from "@/components/Navbar";  // 👈 必须加这行

export default function Layout({
  children,
  params: { locale },
}) {
  return (
    <html lang={locale}>
      <body>
        <Navbar />  {/* 👈 必须加这行 */}
        {children}
      </body>
    </html>
  );
}