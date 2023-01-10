import {
  PostWidget,
  PostDetail,
  Categories,
  Author,
  CommentsForm,
} from "../../components";
import { getPostDetails, getPosts } from "../../services";

type Category = {
  name: String;
  slug: String;
};

export default function PostDetails({ post }: any) {
  console.log(post);
  return (
    <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-10">
      <div className="lg:col-span-8 col-span-1">
        <PostDetail post={post} />
        <Author author={post.author} />
        {/* <AdjacentPosts /> */}
        <CommentsForm slug={post.slug} />
        {/* <Comments slug={post.slug} /> */}
      </div>
      <div className="lg:col-span-4 col-span-1">
        <div className="lg:sticky relative top-8">
          <PostWidget
            slug={post.slug}
            categories={post.categories.map(
              (category: Category) => category.slug
            )}
          />
          <Categories />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }: any) {
  const data = await getPostDetails(params.slug);

  return {
    props: { post: data },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }: any) => ({ params: { slug } })),
    fallback: false,
  };
}
