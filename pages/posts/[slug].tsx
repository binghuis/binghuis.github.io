import Utterances from 'components/utterances';
import dayjs from 'dayjs';
import { getMDXComponent } from 'mdx-bundler/client';
import Link from 'next/link';
import { useMemo } from 'react';
import {
  PostData,
  getPostBySlug,
  getPostSlugs,
} from '../../lib/api';

export function getStaticPaths() {
  const paths = getPostSlugs();

  return {
    paths: paths.map((path) => ({
      params: { slug: path },
    })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getPostBySlug(params.slug, [
    'content',
  ]);
  return {
    props: {
      ...data,
      frontmatter: {
        ...data.frontmatter,
        date: dayjs(
          data?.frontmatter?.['date'] ??
            Date.now(),
        ).format('YYYY-MM-DD'),
      },
    },
  };
}

export default function Page(props: PostData) {
  const { content, frontmatter } = props;
  const Component = useMemo(
    () => getMDXComponent(content ?? ''),
    [content],
  );
  const { title, date, description, tags } =
    frontmatter;

  return (
    <>
      <nav>
        <Link href="/" className="text-lg">
          👈 back
        </Link>
      </nav>
      <main className="mt-6">
        {title && <h1>{frontmatter['title']}</h1>}
        {date && (
          <div className="text-sm text-gray-400 dark:text-gray-500">
            {frontmatter['date']}
          </div>
        )}
        {description && (
          <div className="text-base text-gray-400 dark:text-gray-500">
            {frontmatter['description']}
          </div>
        )}
        {content && <Component />}
        <Utterances />
      </main>
    </>
  );
}
