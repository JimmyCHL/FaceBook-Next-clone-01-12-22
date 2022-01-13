import React from "react";
import Image from "next/image";
import { ChatAltIcon, ShareIcon, ThumbUpIcon } from "@heroicons/react/outline";

const Post = ({ name, message, email, postImage, image, timestamp }) => {
  return (
    <div className="flex flex-col bg-white p-5 mt-5 rounded-2xl shadow-xl">
      <div className="flex items-center space-x-2">
        <img
          className="rounded-full"
          src={image}
          width={40}
          height={40}
          alt=""
        />

        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-gray-600">
            {timestamp
              ? new Date(timestamp.toDate()).toLocaleString()
              : "loading..."}
          </p>
        </div>
      </div>
      <p className="pt-4">{message}</p>
      {postImage && (
        <div className="mt-3 relative h-56 md:h-96 bg-white">
          <Image src={postImage} objectFit="cover" layout="fill" />
        </div>
      )}

      {/* Footer of post */}
      <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t overflow-hidden">
        <div className="inputIcon rounded-none">
          <ThumbUpIcon className="h-4" />
          <p className="text-xs sm:text-base">Like</p>
        </div>
        <div className="inputIcon rounded-none">
          <ChatAltIcon className="h-4" />
          <p className="text-xs sm:text-base">Like</p>
        </div>
        <div className="inputIcon rounded-none">
          <ShareIcon className="h-4" />
          <p className="text-xs sm:text-base">Like</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
