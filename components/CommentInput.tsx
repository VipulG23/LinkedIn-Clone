"use client";
import React from "react";
import ProfilePhoto from "./shared/Profilephoto";
import { useUser } from "@clerk/nextjs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createCommentAction } from "@/lib/serveractions";

const CommentInput = ({ postId }: { postId: string }) => {
  const { user } = useUser();

  const commentActionHandler = async (formData: FormData) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    await createCommentAction(postId, formData);
  };

  return (
    <form action={(formData) => commentActionHandler(formData)}>
      <div className="flex items-center gap-2">
        <ProfilePhoto src={user?.imageUrl ?? "/default-avatar.png"} />
        <Input
          type="text"
          name="inputText"
          placeholder="Add a comment"
          className="rounded-full"
        />
        <Button type="submit" variant={"outline"} className="rounded-full">
          Send
        </Button>
      </div>
    </form>
  );
};

export default CommentInput;
