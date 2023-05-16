import fs from "fs";
import path from "path";
import { remarkCodeHike } from "@code-hike/mdx";
import theme from "shiki/themes/material-theme-palenight.json";
import { bundleMDX } from "mdx-bundler";
import { FrontMatter } from "types";

export interface PostData {
  code: string;
  frontmatter: FrontMatter;
  slug: string;
}

const postFiles = fs.readdirSync("blog").filter((path) => /\.mdx?$/.test(path));

export function getAllSlugs() {
  return postFiles.map((fileName) => {
    return fileName.replace(/\.mdx?$/, "");
  });
}

export function getAllPost() {
  const promises = postFiles.map(async (fileName) => {
    const postName = fileName.replace(/\.mdx?$/, "");
    return await getPostData(postName);
  });

  return Promise.allSettled(promises).then((results) => {
    return results.map((result) =>
      result.status === "fulfilled" ? result.value : null
    );
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

  const { code, frontmatter } = await bundleMDX<FrontMatter>({
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
