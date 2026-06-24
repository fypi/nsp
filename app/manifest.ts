import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NinesPro",
    short_name: "NinesPro",
    description: "Tools, documents, learning, knowledge, and automation.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icon.svg", sizes: "512x512", type: "image/svg+xml" },
      { src: "/apple-icon.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
  };
}
