"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: "#health-map", label: "O que é" },
    { href: "#ciencia", label: "Ciência" },
    { href: "#perfis", label: "Perfis" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">

        {/* Logo + HEALTH MAP label */}
        <a href="#hero" aria-label="Corpore Health Map — Início" className="flex items-center gap-3">
          <Image
            src={scrolled ? "/logo-preto.webp" : "/logo-branco.webp"}
            alt="Corpore — Avaliação de saúde online gratuita"
            width={120}
            height={40}
            className="h-9 w-auto object-contain"
            priority
          />
          <span
            className="hidden sm:block text-xs font-bold uppercase tracking-widest leading-none border-l pl-3"
            style={{
              color: scrolled ? "#2F6F6E" : "rgba(215,233,74,0.85)",
              borderColor: scrolled ? "rgba(47,111,110,0.3)" : "rgba(215,233,74,0.25)",
              letterSpacing: "0.14em",
            }}
          >
            Health Map
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-semibold transition-colors ${
                scrolled
                  ? "text-petroleum hover:text-teal"
                  : "text-white/85 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
          {/* Botão lima */}
          <a
            href="https://healthmap.corporetraininggym.com.br/health-map/"
            className="font-sora font-bold text-sm rounded-full px-6 py-3 transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "#D7E94A",
              color: "#0D2B2B",
              boxShadow: "0 8px 24px rgba(215,233,74,0.3)",
            }}
          >
            Fazer meu Health Map
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-petroleum" : "bg-white"} ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-petroleum" : "bg-white"} ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-petroleum" : "bg-white"} ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu md:hidden bg-petroleum/95 backdrop-blur-md border-t border-white/10 ${open ? "open" : ""}`}>
        <nav className="flex flex-col px-5 py-4 gap-4" aria-label="Menu mobile">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-base font-semibold text-white/85 hover:text-white transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://healthmap.corporetraininggym.com.br/health-map/"
            className="font-sora font-bold text-center rounded-full py-3 px-6 mt-2"
            style={{ background: "#D7E94A", color: "#0D2B2B" }}
            onClick={() => setOpen(false)}
          >
            Fazer meu Health Map
          </a>
        </nav>
      </div>
    </header>
  );
}

