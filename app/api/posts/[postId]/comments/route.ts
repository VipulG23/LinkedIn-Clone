import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

// GET /api/posts/[postId]/comments
export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    // extract postId from the URL
    const url = new URL(req.url);
    const postId = url.pathname.split("/").at(-2); // e.g., /api/posts/123/comments → 123

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is missing." },
        { status: 400 }
      );
    }

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    const comments = await post.populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
};
