"use client";
import { useState, useEffect } from "react";
import Logo from "@/components/ui/Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
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
        scrolled ? "bg-white/90 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <a href="#hero" aria-label="Corpore Health Map - Início">
          <Logo />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-petroleum hover:text-teal transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a href="#cta-final" className="btn-primary text-sm py-3 px-6">
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
          <span className={`block w-6 h-0.5 bg-petroleum transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-petroleum transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-petroleum transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu md:hidden bg-white/95 backdrop-blur-md border-t border-mistgray ${open ? "open" : ""}`}>
        <nav className="flex flex-col px-5 py-4 gap-4" aria-label="Menu mobile">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-base font-semibold text-petroleum hover:text-teal transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#cta-final"
            className="btn-primary text-center mt-2"
            onClick={() => setOpen(false)}
          >
            Fazer meu Health Map
          </a>
        </nav>
      </div>
    </header>
  );
}
