import { remarkCodeHike } from '@code-hike/mdx';
<<<<<<< Updated upstream:utils/post.ts
=======
import dayjs from 'dayjs';
>>>>>>> Stashed changes:pages/lib/api.ts
import fs from 'fs';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';
import theme from 'shiki/themes/material-theme-palenight.json';
import { FrontMatter } from 'types';

export interface PostData {
  code: string;
  frontmatter: FrontMatter;
  slug: string;
}

const postsDirectory = path.join(process.cwd(), 'blog');
const files = fs.readdirSync(postsDirectory).filter((fileName) => /\.mdx?$/.test(fileName));

export function getAllSlugs() {
  return files.map((fileName) => fileName.replace(/\.mdx?$/, ''));
}

export async function getAllPosts() {
  const promises = files.map(async (fileName) => {
    const slug = fileName.replace(/\.mdx?$/, '');
    return getPostData(slug);
  });

  const results = await Promise.allSettled(promises);
  return results
    .filter((result) => result.status === 'fulfilled')
    .map((result) => (result as PromiseFulfilledResult<PostData>).value);
}

export async function getPostData(slug: string): Promise<PostData> {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const source = await fs.promises.readFile(filePath, 'utf-8');

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
            skipLanguages: ['mermaid'],
            staticMediaQuery: 'not screen, (max-width: 1023px)',
            autoImport: true,
          },
        ],
      ];
      return options;
    },
  });

  return { code, frontmatter, slug };
}
