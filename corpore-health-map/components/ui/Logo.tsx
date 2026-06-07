"use client";

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
      <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M85 50C85 69.33 69.33 85 50 85C30.67 85 15 69.33 15 50C15 30.67 30.67 15 50 15C44 22 40 35 40 50C40 65 44 78 50 85C30.67 85 15 69.33 15 50"
          fill="none"
        />
        <path
          d="M50 10C72.09 10 90 27.91 90 50C90 72.09 72.09 90 50 90C52 82 53 66 53 50C53 34 52 18 50 10Z"
          fill="#D7E94A"
        />
        <path
          d="M50 10C28 10 10 27.91 10 50C10 72.09 28 90 50 90C48 82 47 66 47 50C47 34 48 18 50 10Z"
          fill="#D7E94A"
          opacity="0"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M50 8C27.91 8 10 25.91 10 48C10 70.09 27.91 88 50 88C50 88 45 72 45 48C45 24 50 8 50 8Z"
          fill="#D7E94A"
          opacity="0"
        />
        {/* Main crescent shape */}
        <path
          d="M78 22C66 14 50 12 36 18C20 25 10 41 10 58C10 76 22 90 38 94C54 98 70 92 80 80C86 72 90 62 90 50C90 38 85 28 78 22ZM38 86C26 80 18 68 18 54C18 40 28 27 42 22C36 30 33 40 33 50C33 62 37 74 44 82C42 84 40 85 38 86Z"
          fill="#D7E94A"
        />
      </svg>

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
