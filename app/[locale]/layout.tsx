import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <Navbar />
        <main style={{ paddingTop: '60px' }}>{children}</main>
      </body>
    </html>
  );
}