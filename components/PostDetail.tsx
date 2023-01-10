import { Fragment } from "react";
import Image from "next/image";
import moment from "moment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function PostDetail({ post }: any) {
  const getContentFragment = (index: any, text: any, obj: any, type?: any) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-two":
        return (
          <h2 key={index} className="text-2xl font-semibold mb-4">
            {modifiedText.map((item: any, i: any) => (
              <Fragment key={i}>{item}</Fragment>
            ))}
          </h2>
        );
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item: any, i: any) => (
              <Fragment key={i}>{item}</Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item: any, i: any) => (
              <Fragment key={i}>{item}</Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item: any, i: any) => (
              <Fragment key={i}>{item}</Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  console.log(post);
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
          {post.title}
        </div>

        <div className="flex md:gap-8 gap-2 py-6">
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
        <div className="flex flex-col text-left">
          {post.content.raw.children.map((typeObj: any, index: Number) => {
            const children = typeObj.children.map(
              (item: any, itemIndex: Number) =>
                getContentFragment(itemIndex, item.text, item)
            );

            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>
      </div>
    </div>
  );
}
