import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Corpore Health Map",
    short_name: "Health Map",
    description: "Avaliação de saúde online gratuita da Corpore São José dos Campos.",
    start_url: "/",
    display: "standalone",
    background_color: "#0D2B2B",
    theme_color: "#0D2B2B",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
