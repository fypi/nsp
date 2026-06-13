import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import NetworkStatusToast from "@/components/NetworkStatusToast";

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
      <NetworkStatusToast />
    </>
  );
}