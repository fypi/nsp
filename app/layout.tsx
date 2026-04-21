import "../globals.css";
import Navbar from "@/components/Navbar";

export default function Layout({
  children,
  params: { locale },
}) {
  return (
    <html lang={locale}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}