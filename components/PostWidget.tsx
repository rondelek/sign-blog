import { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment";
import { getRecentPosts, getSimilarPosts } from "../services";
import { Avatar } from "@mui/material";
import Box from "./Box";

type PostWidget = {
  categories?: String[];
  slug?: String;
};

export default function PostWidget({ categories, slug }: PostWidget) {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  return (
    <Box title={slug ? "Related posts" : "Recent posts"}>
      {relatedPosts?.map((post) => {
        return (
          <div
            key={post["title"]}
            className="flex items-center border-b py-4 gap-4"
          >
            <Link href={`/post/${post["slug"]}`}>
              <Avatar
                src={post["featuredImage"]["url"]}
                sx={{ width: 56, height: 56 }}
              />
            </Link>
            <div>
              <p className="text-gray-600">
                {moment(post["createdAt"]).format("MMM DD, YYYY")}
              </p>
              <Link href={`/post/${post["slug"]}`} key={post["title"]}>
                <h4 className="hover:text-red-600 transition duration-400">
                  {post["title"]}
                </h4>
              </Link>
            </div>
          </div>
        );
      })}
    </Box>
  );
}
