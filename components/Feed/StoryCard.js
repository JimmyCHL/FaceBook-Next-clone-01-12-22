import Image from "next/image";
import React from "react";

const StoryCard = ({ name, src, profile }) => {
  return (
    <div className="relative h-11 w-11 md:h-20 md:w-20 lg:h-56 lg:w-32 cursor-pointer overflow-x p-3 transition-all duration-200 ease-in hover:scale-105 hover:animate-pulse">
      <Image
        className="absolute opacity-0 lg:opacity-100 rounded-full z-50 top-10"
        src={profile}
        width={40}
        height={40}
        layout="fixed"
        objectFit="cover"
      />
      <Image
        className="object-cover filter backdrop-brightness-75 rounded-full lg:rounded-3xl"
        src={src}
        layout="fill"
      />
      <p className="hidden lg:block absolute bottom-2 text-white">{name}</p>
    </div>
  );
};

export default StoryCard;
