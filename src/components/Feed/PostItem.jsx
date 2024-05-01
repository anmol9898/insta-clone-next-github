import Image from "next/image";
import { SlOptionsVertical } from "react-icons/sl";

import LikeSection from "./LikeSection";
import CommentsSection from "./CommentsSection";

const PostItem = ({ post }) => {
  return (
    <div className="bg-white my-7-2 mt-10 border rounded-md">
      <div className="flex flex-col">
        {/* heading */}
        <div className="flex justify-between items-center py-6 p-2 border-b border-gray-200">
          <div className="flex justify-between items-center gap-4">
            <Image
              src={post.profileImg}
              height={60}
              width={60}
              alt="profile"
              className="rounded-full object-cover ring p-1"
            />
            <h2 className="flex-1 font-bold">{post.username}</h2>
          </div>
          <SlOptionsVertical className="text-xs cursor-pointer" />
        </div>
        {/* image */}
        <div className="border-b border-gray-200">
          <Image
            src={post.image}
            alt={post.caption}
            height={150}
            width={250}
            className="w-full max-h-[700px] object-cover"
          />
        </div>

        {/* likes */}
        <LikeSection id={post.id} />

        {/* caption */}
        <div className="flex gap-2 p-2 pt-0 items-center">
          <h1 className="font-bold">{post.username}</h1>
          <p className="truncate">{post.caption}</p>
        </div>

        {/* comments */}
        {/* comments input */}
        <CommentsSection id={post.id} />
      </div>
    </div>
  );
};

export default PostItem;
