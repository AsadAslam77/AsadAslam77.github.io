import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build to plain HTML/CSS/JS in out/ so GitHub Pages can serve it with no server.
  output: "export",

  // next/image's optimizer is a server feature; static export needs it off.
  images: { unoptimized: true },

  // Next 16 writes an AGENTS.md during dev. CLAUDE.md is the only rules file here.
  agentRules: false,

  // Tailwind v4 is compiled by Turbopack in Next 16, not by PostCSS.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
