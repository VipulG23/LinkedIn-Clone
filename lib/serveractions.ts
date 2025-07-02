"use server";

import { Post } from "@/models/post.model";
import { IUser } from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./db";
import { revalidatePath } from "next/cache";
import { Comment } from "@/models/comment.model";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const createPostAction = async (
  inputText: string,
  selectedFile: string
) => {
  await connectDB();
  const user = await currentUser();
  if (!user) throw new Error("User not athenticated");
  if (!inputText) throw new Error("Input field is required");

  const image = selectedFile;

  const userDatabase: IUser = {
    firstName: user.firstName || "Vipul",
    lastName: user.lastName || "Gajbhiye",
    userId: user.id,
    profilePhoto: user.imageUrl,
  };

  try {
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      await Post.create({
        description: inputText,
        user: userDatabase,
        imageUrl: uploadResponse?.secure_url,
      });
    } else {
      await Post.create({
        description: inputText,
        user: userDatabase,
      });
    }
    revalidatePath("/");
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

export const getAllPosts = async () => {
  try {
    await connectDB();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "comments", options: { sort: { createdAt: -1 } } });
    if (!posts) return [];
    return JSON.parse(JSON.stringify(posts));
  } catch (err) {
    console.error(err);
  }
};

export const deletePostAction = async (postId: string) => {
  await connectDB();
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated.");
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found.");

  if (post.user.userId !== user.id) {
    throw new Error("You are not an owner of this Post.");
  }

  try {
    await Post.deleteOne({ _id: postId });
    revalidatePath("/");
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};

export const createCommentAction = async (
  postId: string,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");
    const inputText = formData.get("inputText") as string;
    if (!inputText) throw new Error("Field is required");
    if (!postId) throw new Error("Post id required");

    const userDatabase: IUser = {
      firstName: user.firstName || "Patel",
      lastName: user.lastName || "Mern Stack",
      userId: user.id,
      profilePhoto: user.imageUrl,
    };

    const post = await Post.findById({ _id: postId });
    if (!post) throw new Error("Post not found");

    const comment = await Comment.create({
      textMessage: inputText,
      user: userDatabase,
    });

    post.comments?.push(comment._id);
    await post.save();

    revalidatePath("/");
  } catch {
    throw new Error("An error occurred");
  }
};
