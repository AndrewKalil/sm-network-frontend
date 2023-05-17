import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Button } from "@nextui-org/react";

import { MainLayout } from "@/components/layouts";
import { Comment } from "@/types";
import { postServices } from "@/services";
import { CommentCard, CommentModal, NoComments } from "@/components/comments";
import { useAppContext } from "@/store";

interface IProps {
  comments: Comment[];
  postId: number;
}

const PostComments: NextPage<IProps> = ({ comments, postId }) => {
  const { handleModalOpen, assignPostId } = useAppContext();

  const openModal = () => {
    assignPostId(postId);
    handleModalOpen();
  };

  return (
    <MainLayout title={`Comments`}>
      <div className="h-full w-full flex flex-col p-4">
        {comments && comments.length > 0 ? (
          <div
            className="flex-1 overflow-y-auto"
            style={{ display: "grid", gridAutoRows: "130px", gap: "10px" }}
          >
            {comments.map((comment) => {
              return <CommentCard comment={comment} key={comment.id} />;
            })}
          </div>
        ) : (
          <NoComments />
        )}
        <div className="w-full h-20 flex items-center justify-center">
          <Button onPress={openModal}>Add a comment</Button>
        </div>
      </div>
      <CommentModal />
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const posts = (await postServices.getAll()) || [];
  const paths = posts.map((post) => ({ params: { id: post.id.toString() } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const comments = (await postServices.getPostComments(id)) || [];

  return {
    props: {
      comments,
      postId: id,
    },
  };
};

export default PostComments;
