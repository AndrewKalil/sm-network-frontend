import { NextPage } from "next";
import { GetStaticProps } from "next";

import { Grid } from "@nextui-org/react";

import { MainLayout } from "@/components/layouts";
import { PostCard } from "@/components/posts";
import { Post } from "@/types";
import { postServices } from "@/services";

interface IProps {
  posts: Post[];
}

const HomePage: NextPage<IProps> = ({ posts }) => {
  // console.log(data);
  return (
    <MainLayout title="Posts">
      <Grid.Container gap={2} justify="flex-start">
        {posts.map((post) => {
          return (
            <Grid xs={12} md={6} key={post.id}>
              <PostCard post={post} />
            </Grid>
          );
        })}
      </Grid.Container>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts = await postServices.getAll();

  return {
    props: { posts: posts },
  };
};

export default HomePage;
