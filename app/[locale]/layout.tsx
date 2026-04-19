import "../globals.css";

export default function Layout({
  children,
  params: { locale },
}) {
  return (
    <html lang={locale}>
      <body>
        {children}
      </body>
    </html>
  );
}