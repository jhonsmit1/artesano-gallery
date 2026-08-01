"use client";

import { PortableText as PT } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";

export function PortableText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return (
    <div className="space-y-4 text-pretty text-base leading-relaxed text-[#6a5443] sm:text-lg">
      <PT value={value} />
    </div>
  );
}
