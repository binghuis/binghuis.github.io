import dayjs from 'dayjs';
import { PostData, getAllPost } from 'lib/api';
import Link from 'next/link';

export async function getStaticProps() {
  const posts = await getAllPost();

  return {
    props: {
      posts: posts.map((post) => ({
        frontmatter: {
          ...post?.frontmatter,
          date: dayjs(post?.frontmatter['date']).format('YYYY-MM-DD'),
        },
        slug: post?.slug,
      })),
    },
  };
}

export default function Page({ posts }: { posts: PostData[] }) {
  const postList = posts.map((post) => {
    const { frontmatter } = post;
    const content = (
      <div key={post.slug}>
        <b>{frontmatter.title}</b>
        <div>{frontmatter.description}</div>
        <Link className="no-underline" href={`/posts/${post.slug}`}>
          🕳️
        </Link>
      </div>
    );

    return content;
  });
  return (
    <div>
      <h1>Binghuis 🤞</h1>
      <div>{postList}</div>
    </div>
  );
}
