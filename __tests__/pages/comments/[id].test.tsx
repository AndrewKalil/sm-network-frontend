import PostComments, {
  getStaticPaths,
  getStaticProps,
} from "@/pages/comments/[id]";
import { fireEvent, render, screen } from "@testing-library/react";
import { AppContext } from "@/store";
import "@testing-library/jest-dom";
import React from "react";
import { postServices } from "@/services";
import { Comment, Post } from "@/types";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      isReady: true,
      route: {
        pathname: "/",
        asPath: "/",
      },
      reload: jest.fn,
    };
  },
}));

describe("PostComments", () => {
  it("should render a list of comments", async () => {
    const comments = [
      {
        id: 1,
        name: "user 1",
        post_id: 1,
        body: "This is a body",
        email: "user1@email.example",
      },
      {
        id: 2,
        name: "user 2",
        post_id: 1,
        body: "This is another comment",
        email: "user2@email.example",
      },
    ];
    const postId = 1;

    render(<PostComments comments={comments} postId={postId} />);

    const screenWithComments = screen;

    expect(
      screenWithComments.getByText("This is another comment")
    ).toBeInTheDocument();
  });

  it("should render a message that there are no comments when there are no comments", async () => {
    const comments: Comment[] = [];

    render(<PostComments comments={comments} postId={0} />);

    const noComments = screen.getByText(
      "There are currently no comments on this post. Start a conversation!"
    );
    expect(noComments).toBeInTheDocument();
  });

  it("should call the handleModalOpen function with the expected arguments", () => {
    const comments = [
      {
        id: 1,
        name: "user 1",
        post_id: 1,
        body: "This is a body",
        email: "user1@email.example",
      },
      {
        id: 2,
        name: "user 2",
        post_id: 1,
        body: "This is another comment",
        email: "user2@email.example",
      },
    ];
    const postId = 1;
    const value = {
      user: {
        name: "Guest User",
        email: "guest.user@email.com",
      },
      modalIsVisible: false,
      postId: 0,
      assignPostId: (id: number) => jest.fn(),
      handleModalClose: jest.fn(),
    };
    const handleModalOpen = jest.fn();

    render(
      <AppContext.Provider value={{ ...value, handleModalOpen }}>
        <PostComments comments={comments} postId={postId} />
      </AppContext.Provider>
    );

    const openModalButton = screen.getByRole("button");
    expect(openModalButton).toBeInTheDocument();

    fireEvent.click(openModalButton);

    expect(handleModalOpen).toHaveBeenCalledTimes(1);
  });
});

describe("getStaticProps", () => {
  const testComments: Comment[] = [
    {
      id: 1,
      name: "user 1",
      post_id: 1,
      body: "This is a body",
      email: "user1@email.example",
    },
    {
      id: 2,
      name: "user 2",
      post_id: 1,
      body: "This is another comment",
      email: "user2@email.example",
    },
  ];

  it("should return the correct list of posts from the API", async () => {
    // spy on function and mock implementation

    jest.spyOn(postServices, "getPostComments").mockImplementation(
      async () =>
        ({
          comments: testComments,
        }.comments)
    );

    const response = await getStaticProps({ params: { id: "1" } });

    expect(response).toEqual({
      props: {
        comments: testComments,
        postId: "1",
      },
    });
  });

  it("should call the getPostComments() function was called", async () => {
    jest.spyOn(postServices, "getPostComments").mockImplementation(
      async () =>
        ({
          comments: testComments,
        }.comments)
    );

    await getStaticProps({ params: { id: "1" } });

    expect(postServices.getPostComments).toHaveBeenCalled();
  });
});

describe("getStaticPaths", () => {
  const testPosts: Post[] = [
    {
      id: 1,
      title: "Post 1",
      user_id: 1,
      body: "Post description for post 1",
    },
    {
      id: 2,
      title: "Post 2",
      user_id: 1,
      body: "Post description for post 2",
    },
  ];

  it("should return the correct paths from a list of ids", async () => {
    jest.spyOn(postServices, "getAll").mockImplementation(
      async () =>
        ({
          posts: testPosts,
        }.posts)
    );

    const response = await getStaticPaths({});
    expect(response).toEqual({
      paths: testPosts.map((x) => ({ params: { id: x.id.toString() } })),
      fallback: false,
    });
  });

  it("should call the getAll() frunction", async () => {
    // spy on function and mock implementation
    jest.spyOn(postServices, "getAll").mockImplementation(
      async () =>
        ({
          posts: testPosts,
        }.posts)
    );

    await getStaticPaths({});

    expect(postServices.getPostComments).toHaveBeenCalled();
  });
});
