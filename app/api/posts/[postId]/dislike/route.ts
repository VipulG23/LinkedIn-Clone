import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    await connectDB();
    const userId = await req.json();
    const post = await Post.findById(params.postId);
    if (!post) return NextResponse.json({ error: "Post not found." });

    await post.updateOne({ $pull: { likes: userId } });
    return NextResponse.json({ message: "Post disliked successfully." });
  } catch (err) {
    console.error(err); // optional: for logging
    return NextResponse.json({ error: "An error occurred." });
  }
}
