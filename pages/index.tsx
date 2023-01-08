import Head from "next/head";
import { PostCard, PostRecent, Categories } from "../components";
import { GraphQLClient, gql } from "graphql-request";

const graphcms = new GraphQLClient(
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clckwrzth1vpw01ufehmbb64t/master"
);

const QUERY = gql`
  query MyQuery {
    postsConnection {
      edges {
        node {
          createdAt
          author {
            id
            avatar {
              url
            }
            bio
            name
          }
          slug
          title
          excerpt
          featuredImage {
            url
          }
          categories {
            name
            slug
          }
        }
      }
    }
  }
`;

export async function getStaticProps() {
  const response = await graphcms.request(QUERY);
  const posts = response.postsConnection.edges;
  return {
    props: {
      posts,
    },
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
      <div className="grid md:grid-cols-12 grid-cols-1 gap-10">
        <div className="md:col-span-8 col-span-1">
          {posts.map((post: any, index: number) => {
            return <PostCard post={post.node} key={index} />;
          })}
        </div>
        <div className="md:col-span-4 col-span-1">
          <PostRecent />
          <Categories />
        </div>
      </div>
    </>
  );
}
