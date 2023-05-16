import { getMDXComponent } from "mdx-bundler/client";
import { getPostNames, getPostData, PostData } from "../../lib/api";
import Link from "next/link";
import { useMemo } from "react";
import dayjs from "dayjs";

export function getStaticPaths() {
  const paths = getPostNames().map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);
  postData.frontmatter["date"] = dayjs(postData.frontmatter["date"]).format(
    "YYYY/MM/DD HH:mm"
  ) as any;
  return {
    props: {
      ...postData,
    },
  };
}

export default function Page(props: PostData) {
  const { code, frontmatter } = props;
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const { title, date, description } = frontmatter;

  return (
    <div style={{ width: 800, margin: "0 auto", fontFamily: "sans-serif" }}>
      <nav>
        <Link href="/">👈 Go back home</Link>
      </nav>
      <main>
        {title && <h1>{frontmatter["title"]}</h1>}
        {description && <div>{frontmatter["description"]}</div>}
        {date && <div>{frontmatter["date"]}</div>}
        <Component />
      </main>
    </div>
  );
}
