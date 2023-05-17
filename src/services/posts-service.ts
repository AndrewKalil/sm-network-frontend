import { goRestApi } from "@/pages/api";
import { Comment, Post } from "@/types";

const getAll = async () => {
  try {
    const res = await goRestApi.get<Post[]>("/posts");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getPostComments = async (id: string) => {
  try {
    const res = await goRestApi.get<Comment[]>(`/posts/${id}/comments`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const postCommentOnPost = async (body: Omit<Comment, "id">) => {
  try {
    const res = await goRestApi.post(`/comments`, { ...body });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAll,
  getPostComments,
  postCommentOnPost,
};
