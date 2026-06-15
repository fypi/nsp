import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import NetworkStatusToast from "@/components/NetworkStatusToast";
import type { ReactNode } from "react";

export default function LocaleLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <SiteFooter />
      <NetworkStatusToast />
    </>
  );
}
