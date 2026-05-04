import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      {/* 👇 这一行是手机适配核心 */}
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body style={{ margin: 0, padding: 0, minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}