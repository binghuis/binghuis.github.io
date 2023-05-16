import { getPostNames } from "../src/posts";

type PageProps = {
  postNames: string[];
};

export async function getStaticProps() {
  const postNames = getPostNames();
  return { props: { postNames } };
}

export default function Page({ postNames }: PageProps) {
  return (
    <div style={{ width: 800, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1>My Blog</h1>
      <ul>
        {postNames.map((postName) => (
          <li key={postName}>
            <a href={`/posts/${postName}`}>{postName}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
