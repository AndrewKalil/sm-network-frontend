import { postServices } from "@/services";
import { useAppContext } from "@/store";
import { Comment } from "@/types";
import { Button, Modal, Text, Textarea } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";

export const CommentModal = () => {
  const { modalIsVisible, handleModalClose, user, postId } = useAppContext();
  const [comment, setComment] = useState("");
  const router = useRouter();

  const handlePost = async () => {
    let newComment: Omit<Comment, "id"> = {
      name: user.name,
      email: user.email,
      body: comment,
      post_id: postId,
    };

    try {
      if (comment.length > 0) {
        const res = await postServices.postCommentOnPost(newComment);
        router.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleModalClose();
    }
  };

  return (
    <Modal
      closeButton
      aria-labelledby="Comment for post"
      open={modalIsVisible}
      onClose={handleModalClose}
    >
      <Modal.Header>
        <Text id="Comment for post" size={18}>
          Write a comment
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Textarea
          aria-labelledby="comment"
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Add a comment"
          title="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto onPress={handlePost}>
          Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
