import { remarkCodeHike } from "@code-hike/mdx";
import theme from "shiki/themes/material-theme-palenight.json" assert { type: "json" };
import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [[remarkCodeHike, { theme }]],
  },
});

export default withMDX({
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  eslint: { ignoreDuringBuilds: true },
});
