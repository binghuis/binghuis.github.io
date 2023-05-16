import dayjs from "dayjs";
import { PostData, getAllPost } from "lib/api";
import Link from "next/link";

export async function getStaticProps() {
  const posts = await getAllPost();

  return {
    props: {
      posts: posts
        .map((post) => ({
          frontmatter: {
            ...post?.frontmatter,
            date: dayjs(post?.frontmatter["date"]).format("YYYY-MM-DD"),
          },
          slug: post?.slug,
        }))
        .filter(Boolean),
    },
  };
}

export default function Page({ posts }: { posts: PostData[] }) {
  return (
    <div>
      <h1>Binghuis 🤞</h1>
      <div>
        {posts.map((post) => {
          const { frontmatter } = post;
          return (
            <div key={post.slug}>
              <b>{frontmatter.title}</b>
              <div>{frontmatter.description}</div>
              <Link className="no-underline" href={`/posts/${post.slug}`}>
                🕳️
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
