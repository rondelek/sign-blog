import React from "react";
import moment from "moment";
// import Link from "next/link";

export default function PostCard({ post }: any) {
  console.log(post);
  return (
    <div>
      {post.title}
      {post.excerpt}
    </div>
  );
}
