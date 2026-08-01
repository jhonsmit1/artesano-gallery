import { getHome, getSiteSettings } from "@/lib/data";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { DetailsAccordion } from "@/components/sections/DetailsAccordion";
import { MenuCarousel } from "@/components/sections/MenuCarousel";
import { Collage } from "@/components/sections/Collage";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage() {
  const [home, settings] = await Promise.all([getHome(), getSiteSettings()]);

  return (
    <>
      <Hero data={home.hero ?? {}} />
      <Story data={home.story ?? {}} />
      <DetailsAccordion data={home.details ?? {}} />
      <MenuCarousel data={home.menu ?? {}} />
      <Collage data={home.gallery ?? {}} />
      <Contact data={home.contact ?? {}} logoUrl={settings.logoUrl} />
    </>
  );
}
