import Image from "next/image";

export default function Author({ author }: any) {
  return (
    <div className="text-center text-white mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className="flex justify-center absolute left-0 right-0 -top-14">
        <Image
          src={author.avatar.url}
          alt={author.name}
          width={100}
          height={100}
          className="align-middle"
        />
      </div>
      <div>
        <div className="text-3xl font-bold py-2">{author.name}</div>
        <div>{author.bio}</div>
      </div>
    </div>
  );
}
