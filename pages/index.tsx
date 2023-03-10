import Head from "next/head";
import { PostCard, PostWidget, Categories } from "../components";
import { getPosts } from "../services";

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
    revalidate: 10,
  };
}

export default function Home({ posts }: any) {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-10">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post: any, index: number) => {
            return <PostCard post={post.node} key={index} />;
          })}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </>
  );
}
