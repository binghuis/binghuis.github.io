import dayjs from 'dayjs';
import Link from 'next/link';
import { PostData, getAllPosts } from './lib/api';

export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts: posts.map((post) => ({
        frontmatter: {
          ...post?.frontmatter,
          date: dayjs(post?.frontmatter['date'] ?? Date.now()).format('YYYY-MM-DD'),
        },
        slug: post?.slug,
      })),
    },
  };
}

export default function Page({ posts }: { posts: PostData[] }) {
  const postList = posts.map((post) => (
    <div key={post.slug}>
      <b>{post.frontmatter.title}</b>
      <div>{post.frontmatter.description}</div>
      <Link className="no-underline" href={`/posts/${post.slug}`}>
        🕳️
      </Link>
    </div>
  ));
  return (
    <div>
      <h1>Binghuis 🤞</h1>
      <div>{postList}</div>
    </div>
  );
}
