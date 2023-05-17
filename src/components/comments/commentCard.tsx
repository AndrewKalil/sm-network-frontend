import { FC } from "react";

import { Avatar, Card, Grid, Spacer, Text } from "@nextui-org/react";
import { Comment } from "@/types";

interface IProps {
  comment: Comment;
}

export const CommentCard: FC<IProps> = ({ comment }) => {
  const { id, body, email, name, post_id } = comment;

  const createInitials = () => {
    const stringList = name.split(" ");
    return `${stringList[0].charAt(0).toUpperCase()}${stringList[1]
      .charAt(0)
      .toUpperCase()}`;
  };

  return (
    <Grid xs={12} key={id}>
      <Card
        css={{
          padding: "10px",
          ds: "none",
          borderRadius: "0px 8px 8px 8px",
          // height: 100,
          position: "relative",
        }}
      >
        <Card.Body
          css={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Avatar
            size="xl"
            text={createInitials()}
            style={{ alignSelf: "center" }}
          />
          <Spacer />
          <div className="flex gap-0 flex-col">
            <Text b>
              {name} &#183; {email}
            </Text>
            <Text color="gray">{body}</Text>
          </div>
        </Card.Body>

        <Text css={{ position: "absolute", right: "10px", bottom: "10px" }}>
          #{post_id}
        </Text>
      </Card>
    </Grid>
  );
};
