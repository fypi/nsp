import Navbar from "@/components/Navbar";

export default function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}