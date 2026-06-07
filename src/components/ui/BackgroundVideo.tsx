"use client";

import { useEffect, useState } from "react";

type Props = {
  desktopUrl?: string;
  mobileUrl?: string;
  posterUrl?: string;
  className?: string;
};

/**
 * Video de fondo responsivo. Sirve la versión mobile/desktop según el ancho,
 * usa `poster` mientras carga y se reproduce silenciado en bucle.
 * El navegador descarga sólo el video que corresponde al viewport.
 */
export function BackgroundVideo({
  desktopUrl,
  mobileUrl,
  posterUrl,
  className = "",
}: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const src = (isMobile && mobileUrl) || desktopUrl || mobileUrl;

  if (!src) {
    return (
      <div
        className={`bg-neutral-900 ${className}`}
        style={
          posterUrl
            ? {
                backgroundImage: `url(${posterUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      />
    );
  }

  return (
    <video
      key={src}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={posterUrl}
    >
      <source src={src} />
    </video>
  );
}
