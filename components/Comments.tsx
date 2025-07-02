import { IPostDocument } from "@/models/post.model";
import { ICommentDocument } from "@/models/comment.model";
import React from "react";
import Comment from "./Comment";

const Comments = ({ post }: { post: IPostDocument }) => {
  const comments = post.comments as ICommentDocument[];

  return (
    <div>
      {comments?.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
