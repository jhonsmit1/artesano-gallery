import { getHome } from "@/lib/data";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { MenuCarousel } from "@/components/sections/MenuCarousel";
import { ClosingScene } from "@/components/sections/ClosingScene";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage() {
  const home = await getHome();

  return (
    <>
      <Hero data={home.hero ?? {}} />
      <Story data={home.story ?? {}} />
      <MenuCarousel data={home.menu ?? {}} />
      <ClosingScene data={home.closing ?? {}} />
      <Contact data={home.contact ?? {}} />
    </>
  );
}
