import Navbar from "@/components/Navbar";
import "../globals.css";

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}