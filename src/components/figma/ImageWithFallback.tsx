"use client";

import { useState } from "react";

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
};

export function ImageWithFallback({
  src,
  alt,
  className = "",
  loading = "lazy",
}: ImageWithFallbackProps) {
  const [ok, setOk] = useState(true);

  if (!ok) {
    return (
      <div
        className={`flex items-center justify-center bg-neutral-900 text-neutral-500 ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="px-4 text-center text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- intentional fallback control
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => setOk(false)}
    />
  );
}
