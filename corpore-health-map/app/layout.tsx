import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { faqs } from "@/lib/health-map/faq";

const META_PIXEL_ID = "1841018156120390";
// Mesma URL usada em lib/meta-capi-webhook.ts — fixada no código porque o
// build do Hostinger não repassa variáveis de ambiente para `next build`.
const N8N_WEBHOOK_URL = "https://n8n.corporetraininggym.com.br/webhook/health-map-lead";

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
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            if (!window.__metaPixelInitialized) {
              window.__metaPixelInitialized = true;
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');

              var pvEventId = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : ('pv_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9));
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView', {}, { eventID: pvEventId });

              // Espelha o PageView pro Meta CAPI (servidor) com o mesmo
              // event_id — cobre visitantes com o pixel bloqueado (iOS,
              // ad-blockers). Delay dá tempo do fbevents.js gravar _fbp/_fbc.
              setTimeout(function() {
                var fbp = (document.cookie.match(/(?:^|; )_fbp=([^;]+)/) || [])[1] || null;
                var fbc = (document.cookie.match(/(?:^|; )_fbc=([^;]+)/) || [])[1] || null;
                fetch('${N8N_WEBHOOK_URL}', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    event_name: 'PageView',
                    event_id: pvEventId,
                    event_time: Math.floor(Date.now() / 1000),
                    page_url: window.location.href,
                    client_user_agent: navigator.userAgent,
                    fbp: fbp,
                    fbc: fbc
                  })
                }).catch(function() {});
              }, 1200);
            }
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
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
