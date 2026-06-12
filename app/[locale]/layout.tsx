import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <SiteFooter />
    </>
  );
}