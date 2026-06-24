import SectionPage, { getLocale } from "@/components/SectionPage";
import { getSectionContent } from "@/lib/i18n";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = getLocale(params?.locale);
  const content = getSectionContent("technology", locale);

  return <SectionPage content={content} locale={locale} />;
}
