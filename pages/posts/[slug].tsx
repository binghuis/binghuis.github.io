import dayjs from 'dayjs';
import { getMDXComponent } from 'mdx-bundler/client';
import Link from 'next/link';
import { useMemo } from 'react';
import { getAllSlugs, getPostData, PostData } from '../../lib/api';

export function getStaticPaths() {
  const paths = getAllSlugs();

  return {
    paths: paths.map((path) => ({ params: { slug: path } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const data = await getPostData(params.slug);
  data.frontmatter['date'] = dayjs(data.frontmatter['date']).format('YYYY-MM-DD') as any;
  return {
    props: {
      ...data,
    },
  };
}

export default function Page(props: PostData) {
  const { code, frontmatter } = props;
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const { title, date, description } = frontmatter;

  return (
    <>
      <nav>
        <Link href="/">👈 back</Link>
      </nav>
      <main>
        {title && <h1>{frontmatter['title']}</h1>}
        {date && <div>{frontmatter['date']}</div>}
        {description && <div>{frontmatter['description']}</div>}
        <Component />
      </main>
    </>
  );
}
