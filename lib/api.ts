import fs from "fs";
import path from "path";
import { remarkCodeHike } from "@code-hike/mdx";
import theme from "shiki/themes/material-theme-palenight.json";
import { bundleMDX } from "mdx-bundler";
//  dracula material-theme-darker material-theme-ocean  one-dark-pro
export interface PostData {
  code: string;
  frontmatter: {
    [key: string]: any;
  };
  slug: string;
}

export function getPostNames() {
  return fs
    .readdirSync("blog")
    .filter((path) => /\.mdx?$/.test(path))
    .map((fileName) => {
      const postName = fileName.replace(/\.mdx?$/, "");
      return postName;
    });
}

export async function getPostData(slug: string): Promise<PostData> {
  // can be from a local file, database, anywhere
  const source = fs.readFileSync(`blog/${slug}.mdx`, "utf-8");

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === "win32") {
    process.env["ESBUILD_BINARY_PATH"] = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env["ESBUILD_BINARY_PATH"] = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  const { code, frontmatter } = await bundleMDX({
    source,
    files: {},
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        [
          remarkCodeHike,
          {
            theme,
            lineNumbers: true,
            showCopyButton: true,
            skipLanguages: ["mermaid"],
            staticMediaQuery: "not screen, (max-width: 768px)",
            autoImport: true,
          },
        ],
      ];
      return options;
    },
  });

  return { code, frontmatter, slug };
}
