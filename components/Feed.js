import React from "react";
import Stories from "./Feed/Stories";
import InputBox from "./Feed/InputBox";
import Posts from "./Feed/Posts";

const Feed = ({ posts }) => {
  return (
    <div className="h-[800px] flex-1 flex flex-col pb-44 pt-6 mr-4 xl:mr-40  ">
      <div className="flex-1 mx-auto max-w-md md:max-w-lg lg:max-w-2xl overflow-y-auto scrollbar-hide">
        {/* stories */}
        <Stories />
        {/* InputBox */}
        <InputBox />
        {/* Posts */}
        <Posts posts={posts} />
      </div>
    </div>
  );
};

export default Feed;
