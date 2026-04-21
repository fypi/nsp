import Navbar from "@/components/Navbar";
import "../globals.css";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}