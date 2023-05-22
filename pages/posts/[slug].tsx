import dayjs from 'dayjs';
import { getMDXComponent } from 'mdx-bundler/client';
import Link from 'next/link';
import { PostData, getPostBySlug, getPostSlugs } from 'pages/lib/api';
import { useMemo } from 'react';

export function getStaticPaths() {
  const paths = getPostSlugs();

  return {
    paths: paths.map((path) => ({ params: { slug: path } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const data = await getPostBySlug(params.slug, ['content']);
  return {
    props: {
      ...data,
      frontmatter: {
        ...data.frontmatter,
        date: dayjs(data?.frontmatter?.['date'] ?? Date.now()).format('YYYY-MM-DD'),
      },
    },
  };
}

export default function Page(props: PostData) {
  const { content, frontmatter } = props;
  const Component = useMemo(() => getMDXComponent(content ?? ''), [content]);
  const { title, date, description, tags } = frontmatter;
  console.log(frontmatter['tags']);

  return (
    <>
      <nav>
        <Link href="/">👈 back</Link>
      </nav>
      <main>
        {title && <h1>{frontmatter['title']}</h1>}
        {date && <div>{frontmatter['date']}</div>}
        {tags && <div>{}</div>}
        {description && <div>{frontmatter['description']}</div>}
        {content && <Component />}
      </main>
    </>
  );
}
