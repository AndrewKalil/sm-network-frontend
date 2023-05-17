import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CommentModal } from "@/components/comments";
import { postServices } from "@/services";
import { AppContext } from "@/store";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      isReady: true,
      route: {
        pathname: "/",
        asPath: "/",
      },
    };
  },
}));

describe("CommentModal component", () => {
  beforeEach(() => {
    const value = {
      user: {
        name: "Guest User",
        email: "guest.user@email.com",
      },
      modalIsVisible: true,
      postId: 0,
      assignPostId: (id: number) => jest.fn(),
      handleModalClose: jest.fn(),
      handleModalOpen: jest.fn(),
    };

    render(
      <AppContext.Provider value={{ ...value }}>
        <CommentModal />
      </AppContext.Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the modal with the correct title", () => {
    const modalTitle = screen.getByText("Write a comment");

    expect(modalTitle).toBeInTheDocument();
  });

  it("should render a textarea with the correct placeholder", () => {
    const textarea = screen.getByPlaceholderText("Add a comment");

    expect(textarea).toBeInTheDocument();
  });

  it("should update the comment state when typing in the textarea", () => {
    const textarea = screen.getByPlaceholderText(
      "Add a comment"
    ) as HTMLTextAreaElement;

    act(() =>
      fireEvent.change(textarea, {
        target: { value: "This is a test comment." },
      })
    );

    expect(textarea.value).toBe("This is a test comment.");
  });

  it("should call the postServices.postCommentonPost function with the correct comment object when posting a comment", async () => {
    const textarea = screen.getByPlaceholderText("Add a comment");
    const postButton = screen.getByText("Post");
    const sample_data = {
      name: "John Doe",
      email: "johndoe@example.com",
      body: "This is a test comment.",
      post_id: 1,
    };

    const fakeFunction = jest
      .spyOn(postServices, "postCommentOnPost")
      .mockResolvedValue({ id: 1, ...sample_data });

    act(() =>
      fireEvent.change(textarea, {
        target: { value: "This is a test comment." },
      })
    );
    act(() => fireEvent.click(postButton));

    await postServices.postCommentOnPost(sample_data).then((res) => {
      expect(res).toEqual({ id: 1, ...sample_data });
    });

    expect(fakeFunction).toHaveBeenCalledWith(sample_data);
  });
});
