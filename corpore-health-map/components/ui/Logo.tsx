"use client";

import Image from "next/image";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textColor = variant === "light" ? "#FFFFFF" : "#0D2B2B";
  const subColor = variant === "light" ? "rgba(255,255,255,0.7)" : "#2F6F6E";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Crescent C symbol */}
      <Image
        src="/logo-marca-lima.webp"
        alt=""
        width={36}
        height={31}
        className="object-contain flex-shrink-0"
      />

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span
          className="font-sora font-bold tracking-widest text-sm uppercase"
          style={{ color: textColor, letterSpacing: "0.18em" }}
        >
          Corpore
        </span>
        <span
          className="font-inter font-semibold text-xs tracking-wider uppercase"
          style={{ color: subColor, letterSpacing: "0.12em" }}
        >
          Health Map
        </span>
      </div>
    </div>
  );
}
