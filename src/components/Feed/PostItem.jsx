import Image from "next/image";
import { SlOptionsVertical } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

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
        <div className="flex gap-2 p-3">
          <FaRegHeart className="text-xl" />2 likes
        </div>

        {/* caption */}
        <div className="flex gap-2 p-2 pt-0 items-center">
          <h1 className="font-bold">{post.username}</h1>
          <p className="truncate">{post.caption}</p>
        </div>

        {/* comments */}

        {/* comments input */}
        <div className="flex gap-2 p-3">
          <Image
            src="/instagram-short.webp"
            height={20}
            width={30}
            alt="profile"
            className="rounded-full object-contain ring"
          />
          <input
            type="text"
            placeholder="Enter your comment..."
            className="flex-1"
          />
          <button disabled className="text-blue-600 opacity-40">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
