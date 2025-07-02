import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    await connectDB();
    const post = await Post.findById(params.postId);
    if (!post) return NextResponse.json({ error: "Post not found." });

    return NextResponse.json(post.likes);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("GET /like error:", err.message);
    }
    return NextResponse.json({ error: "An error occurred." });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    await connectDB();
    const userId = await req.json();
    const post = await Post.findById(params.postId);
    if (!post) return NextResponse.json({ error: "Post not found." });

    await post.updateOne({ $addToSet: { likes: userId } });
    return NextResponse.json({ message: "Post liked successfully." });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("POST /like error:", err.message);
    }
    return NextResponse.json({ error: "An error occurred." });
  }
}
