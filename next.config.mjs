import { remarkCodeHike } from "@code-hike/mdx";
import theme from "shiki/themes/material-theme-palenight.json" assert { type: "json" };
import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-blog",
  themeConfig: "./theme.config.tsx",
  staticImage: true,
  mdxOptions: {
    remarkPlugins: [[remarkCodeHike, { theme }]],
  },
});

export default withNextra({
  reactStrictMode: true,
});
