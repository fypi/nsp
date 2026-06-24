import BasicPage from "@/components/BasicPage";

export default function NotFound() {
  return (
    <BasicPage
      locale="en"
      content={{
        eyebrow: "404",
        title: "Page Not Found",
        desc: "This page has not been created yet, or the link has changed.",
        cards: [
          { title: "Back Home", desc: "Return to the NINESPRO homepage.", href: "/" },
          { title: "Contact Us", desc: "If this is a broken link, contact support.", href: "mailto:support@ninespro.com" },
        ],
      }}
    />
  );
}
