import React from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import Button from "@mui/material/Button";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function PostCard({ post }: any) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 my-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <img
          src={post.featuredImage.url}
          alt=""
          className="object-top absolute h-80 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>
      <div className="flex flex-col items-center text-center px-8">
        <div className="text-3xl font-semibold hover:text-red-600 transition duration-400">
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </div>

        <div className="flex md:flex-row flex-col md:gap-8 gap-2 py-6">
          <div className="flex items-center gap-2">
            <Image
              src={post.author.avatar.url}
              alt={post.author.name}
              width={30}
              height={30}
            />
            <p>{post.author.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <CalendarMonthIcon />
            <div>{moment(post.createdAt).format("MMM DD, YYYY")}</div>
          </div>
        </div>
        <div className="text-gray-600 text-xl pb-8">{post.excerpt}</div>
        <Link href={`/post/${post.slug}`}>
          <Button variant="outlined">Read more</Button>
        </Link>
      </div>
    </div>
  );
}
