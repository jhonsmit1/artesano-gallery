import { getSiteSettings } from "@/lib/data";
import { AppShell } from "@/components/ui/AppShell";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { SmartHeader } from "@/components/layout/SmartHeader";
import { JsonLd } from "@/components/seo/JsonLd";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <JsonLd settings={settings} />
      <AppShell>
        <SmoothScroll>
          <SmartHeader
            brandName={settings.brandName ?? "Artesano Gallery"}
            navLinks={settings.navLinks ?? []}
            menuPdfUrl={settings.menuPdfUrl}
          />
          <main>{children}</main>
          <Footer settings={settings} />
        </SmoothScroll>
      </AppShell>
    </>
  );
}
