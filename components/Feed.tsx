import React from "react";
import Postinput from "./Postinput";
import Posts from "./Posts";
import { getAllPosts } from "@/lib/serveractions";
import { UserResource } from "@clerk/types"; // ✅ Add this

const Feed = async ({ user }: { user: UserResource }) => {
  const userData = JSON.parse(JSON.stringify(user));
  const posts = await getAllPosts();

  return (
    <div className="flex-1">
      <Postinput user={userData} />
      <Posts posts={posts} />
    </div>
  );
};

export default Feed;
