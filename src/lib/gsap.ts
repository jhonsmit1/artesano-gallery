import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Registro único de plugins. Desde GSAP 3.13 todos los plugins
// (incluido SplitText) son gratuitos.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer, SplitText);
}

export { gsap, ScrollTrigger, ScrollToPlugin, Observer, SplitText };
