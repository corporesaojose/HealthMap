import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Crawlers de IA explicitamente liberados (ChatGPT, Claude, Perplexity,
      // Google AI Overviews) para que a avaliação de saúde possa ser
      // referenciada em respostas geradas por IA.
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "CCBot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://healthmap.corporetraininggym.com.br/sitemap.xml",
  };
}
