import "@testing-library/jest-dom";
import { postServices } from "@/services";
import { Comment, Post } from "@/types";
import { goRestApi } from "@/pages/api";

describe("getAll", () => {
  it("should return an array of posts when API is called on /posts endpoint", async () => {
    const mockData: Post[] = [
      {
        id: 1,
        title: "First Post",
        body: "This is the first post",
        user_id: 2,
      },
      {
        id: 2,
        title: "Second Post",
        body: "This is the second post",
        user_id: 2,
      },
      {
        id: 3,
        title: "Third Post",
        body: "This is the third post",
        user_id: 1,
      },
    ];
    const fakeFunction = jest.spyOn(postServices, "getAll");
    fakeFunction.mockResolvedValueOnce({ data: mockData }.data);

    const result = await postServices.getAll();

    expect(result).toEqual(mockData);
    expect(fakeFunction).toHaveBeenCalled();
  });

  it("should log the error when API returns an error", async () => {
    const mockError = new Error("API Error");
    jest.spyOn(goRestApi, "get").mockRejectedValueOnce(mockError);

    console.log = jest.fn();

    await postServices.getAll();

    expect(console.log).toHaveBeenCalledWith(mockError);
  });
});

describe("getPostComments", () => {
  it("should return an array of comments when API is called with /posts/{id}/comments", async () => {
    const postId = "1";
    const mockData: Comment[] = [
      {
        id: 1,
        name: "Comment 1",
        body: "This is comment 1",
        email: "test@email.example",
        post_id: 1,
      },
      {
        id: 2,
        name: "Comment 2",
        body: "This is comment 2",
        email: "test_2@email.example",
        post_id: 1,
      },
      {
        id: 3,
        name: "Comment 3",
        body: "This is comment 3",
        email: "test_3@email.example",
        post_id: 1,
      },
    ];
    const fakeFunction = jest
      .spyOn(goRestApi, "get")
      .mockResolvedValueOnce({ data: mockData });

    const result = await postServices.getPostComments(postId);

    expect(result).toEqual(mockData);
    expect(fakeFunction).toHaveBeenCalled();
  });

  it("should log the error when API returns an error", async () => {
    const mockError = new Error("API Error");

    jest.spyOn(goRestApi, "get").mockRejectedValueOnce(mockError);

    console.log = jest.fn();

    await postServices.getPostComments("");

    expect(console.log).toHaveBeenCalledWith(mockError);
  });
});

describe("postCommentToPost", () => {
  it("should call goRestApi.post with the correct arguments", async () => {
    let comment: Omit<Comment, "id"> = {
      post_id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      body: "This is a comment",
    };

    const fakeFunction = jest
      .spyOn(goRestApi, "post")
      .mockResolvedValueOnce({ data: { id: 1, ...comment } }.data);

    const result = await postServices.postCommentOnPost(comment);

    expect(goRestApi.post).toHaveBeenCalledWith("/comments", comment);
    expect(result).toEqual({ id: 1, ...comment });
    expect(fakeFunction).toHaveBeenCalled();
  });

  it("should log the error when API returns an error", async () => {
    const mockError = new Error("API Error");

    jest.spyOn(goRestApi, "post").mockRejectedValueOnce(mockError);

    console.log = jest.fn();

    type ExpectedValue = Omit<Comment, "id">;

    await postServices.postCommentOnPost({} as ExpectedValue);

    expect(console.log).toHaveBeenCalledWith(mockError);
  });
});
