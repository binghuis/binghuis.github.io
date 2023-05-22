import { remarkCodeHike } from '@code-hike/mdx';
import dayjs from 'dayjs';
import { bundleMDX } from 'mdx-bundler';
import fs from 'node:fs';
import path from 'node:path';
import theme from 'shiki/themes/material-theme-palenight.json';
import { FrontMatter } from 'types';

export interface PostData {
  content?: string;
  frontmatter: FrontMatter;
  slug: string;
}

type Fields = (keyof Pick<PostData, 'content'>)[];

const postsDirectory = path.join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter((slug) => /\.mdx?$/.test(slug))
    .map((slug) => slug.replace(/\.mdx?$/, ''));
}

export async function getAllPosts(fields?: Fields) {
  const promises = getPostSlugs().map((slug) => getPostBySlug(slug, fields));

  const results = await Promise.allSettled(promises);
  return results
    .filter((result) => result.status === 'fulfilled')
    .map((result) => (result as PromiseFulfilledResult<PostData>).value)
    .sort((p, c) => {
      return dayjs(p.frontmatter.date).isBefore(dayjs(c.frontmatter.date)) ? 1 : -1;
    });
}

export async function getPostBySlug(slug: string, fields?: Fields): Promise<Partial<PostData>> {
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

  const items: Partial<PostData> = {};

  fields?.forEach((field) => {
    if (field === 'content') {
      items['content'] = code;
    }
  });
  if (frontmatter) {
    items['frontmatter'] = frontmatter;
  }
  if (slug) {
    items['slug'] = slug;
  }
  return items;
}
