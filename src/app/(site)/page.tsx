import { getHome } from "@/lib/data";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { MomentsScroll } from "@/components/sections/MomentsScroll";
import { Concept } from "@/components/sections/Concept";
import { ScrollVideo } from "@/components/sections/ScrollVideo";
import { Space } from "@/components/sections/Space";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage() {
  const home = await getHome();

  return (
    <>
      <Hero data={home.hero ?? {}} />
      <Story data={home.story ?? {}} />
      <MomentsScroll data={home.moments ?? {}} />
      <Concept data={home.concept ?? {}} />
      <ScrollVideo data={home.experience ?? {}} />
      <Space data={home.space ?? {}} />
      <Contact data={home.contact ?? {}} />
    </>
  );
}
