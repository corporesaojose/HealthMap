import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { faqs } from "@/lib/health-map/faq";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Avaliação de Saúde Online Gratuita | Corpore Health Map",
  description:
    "Descubra como estão seu sono, energia, estresse, alimentação e hábitos com uma avaliação de saúde online gratuita da Corpore.",
  metadataBase: new URL("https://healthmap.corporetraininggym.com.br"),
  alternates: {
    canonical: "https://healthmap.corporetraininggym.com.br",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Avaliação de Saúde Online Gratuita | Corpore Health Map",
    description:
      "Entenda melhor sono, energia, estresse, alimentação, dores e hábitos com o Corpore Health Map.",
    url: "https://healthmap.corporetraininggym.com.br",
    siteName: "Corpore São José dos Campos",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Corpore Health Map — Avaliação de Saúde Online Gratuita",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avaliação de Saúde Online Gratuita | Corpore Health Map",
    description:
      "Entenda melhor sono, energia, estresse, alimentação, dores e hábitos com o Corpore Health Map.",
    images: ["/og-image.png"],
  },
  keywords: [
    "avaliação de saúde online",
    "avaliação de saúde online gratuita",
    "avaliação de saúde e estilo de vida",
    "cansaço constante",
    "falta de energia",
    "sono ruim",
    "Medicina do Estilo de Vida",
    "saúde preventiva",
    "São José dos Campos",
    "Corpore Health Map",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Corpore São José dos Campos",
              alternateName: "Corpore Health Map",
              url: "https://healthmap.corporetraininggym.com.br",
              logo: "https://healthmap.corporetraininggym.com.br/logo-preto.webp",
              description:
                "Academia especializada em Medicina do Estilo de Vida, oferecendo o Corpore Health Map: uma avaliação online gratuita de saúde e estilo de vida.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. Barão do Rio Branco, 540",
                addressLocality: "São José dos Campos",
                addressRegion: "SP",
                addressCountry: "BR",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Corpore Health Map",
              serviceType: "Avaliação online de saúde e estilo de vida",
              provider: {
                "@type": "LocalBusiness",
                name: "Corpore São José dos Campos",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Av. Barão do Rio Branco, 540",
                  addressLocality: "São José dos Campos",
                  addressRegion: "SP",
                  addressCountry: "BR",
                },
              },
              areaServed: {
                "@type": "City",
                name: "São José dos Campos",
              },
              description:
                "Avaliação online gratuita que ajuda a identificar pontos de atenção relacionados a sono, energia, estresse, alimentação, dores, hábitos e estilo de vida.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "BRL",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            }),
          }}
        />
      </head>
      <body className="font-inter bg-offwhite text-petroleum antialiased">
        {children}
      </body>
    </html>
  );
}
