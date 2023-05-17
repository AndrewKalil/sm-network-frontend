import { FC } from "react";

import { Card, Row, Text } from "@nextui-org/react";

import { useRouter } from "next/router";
import { Post } from "@/types";
import Link from "next/link";

interface IProps {
  post: Post;
}

export const PostCard: FC<IProps> = ({ post }) => {
  const { id, body, title, user_id } = post;

  const router = useRouter();

  const onClick = () => {
    router.push(`/comments/${id}`);
  };

  return (
    <Card onClick={onClick} css={{ ds: "none", height: 300 }}>
      <Card.Header>
        <Text h3 b>
          {title}
        </Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body css={{ display: "flex", flexDirection: "row" }}>
        <Card.Image
          src={`https://robohash.org/${id}.png?size=300x300&set=set1`}
          width={300}
          loading="lazy"
        />
        <div className="text-gray-400 flex-1 overflow-hidden">{body}</div>
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <Row justify="space-between">
          <Text>#{id}</Text>
          <Link href={`comments/${id}`}>Comments</Link>
        </Row>
      </Card.Footer>
    </Card>
  );
};
