"use client";

import React, { useState } from "react";
import ProfilePhoto from "./shared/Profilephoto";
import { Input } from "./ui/input";
import { PostDialog } from "./PostDialog";

interface UserType {
  imageUrl: string;
}

const Postinput = ({ user }: { user: unknown }) => {
  const typedUser = user as UserType | null;
  const [open, setOpen] = useState<boolean>(false);

  const inputHandler = () => {
    setOpen(true);
  };

  if (!typedUser) return null; // 🛡️ Guard against null user

  return (
    <div className="bg-white p-4 m-2 md:m-0 border border-gray-300 rounded-lg">
      <div className="flex items-center gap-3">
        <ProfilePhoto src={typedUser.imageUrl} />
        <Input
          type="text"
          placeholder="Start a post"
          className="rounded-full hover:bg-gray-100 h-12 cursor-pointer"
          onClick={inputHandler}
        />
        <PostDialog setOpen={setOpen} open={open} src={typedUser.imageUrl} />
      </div>
    </div>
  );
};

export default Postinput;
