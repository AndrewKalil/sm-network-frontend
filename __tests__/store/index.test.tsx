import { act, render, renderHook, screen } from "@testing-library/react";
import { AppProvider, useAppContext } from "@/store";

describe("AppContext", () => {
  it("should provide default context values", () => {
    const TestComponent = () => {
      const { user } = useAppContext();
      return <div>{user.name}</div>;
    };
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    expect(screen.getByText("Guest User")).toBeInTheDocument();
  });

  it("should update modalIsVisible value when handleModalOpen is called", () => {
    function TestComponent() {
      const { modalIsVisible, handleModalOpen } = useAppContext();
      return (
        <div>
          <button onClick={handleModalOpen}>Open modal</button>
          <span>{modalIsVisible ? "Modal is open" : "Modal is closed"}</span>
        </div>
      );
    }
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    const openModalButton = screen.getByText("Open modal");
    const modalStatus = screen.getByText("Modal is closed");

    expect(modalStatus).toBeInTheDocument();
    act(() => openModalButton.click());
    expect(modalStatus).toHaveTextContent("Modal is open");
  });

  it("should update postId value when assignPostId is called", () => {
    function TestComponent() {
      const { postId, assignPostId } = useAppContext();
      return (
        <div>
          <button onClick={() => assignPostId(1)}>Assign post id</button>
          <span>{`Post id: ${postId}`}</span>
        </div>
      );
    }
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    const assignPostIdButton = screen.getByText("Assign post id");
    const postIdStatus = screen.getByText("Post id: 0");

    expect(postIdStatus).toBeInTheDocument();
    act(() => assignPostIdButton.click());
    expect(postIdStatus).toHaveTextContent("Post id: 1");
  });

  it("should update modalIsVisible value when handleModalClose is called", () => {
    function TestComponent() {
      const { modalIsVisible, handleModalClose, handleModalOpen } =
        useAppContext();
      return (
        <div>
          <button onClick={handleModalOpen}>Open modal</button>
          <button onClick={handleModalClose}>Close modal</button>
          <span>{modalIsVisible ? "Modal is open" : "Modal is closed"}</span>
        </div>
      );
    }
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    const openModalButton = screen.getByText("Open modal");
    const closeModalButton = screen.getByText("Close modal");
    const modalStatus = screen.getByText("Modal is closed");

    expect(modalStatus).toBeInTheDocument();
    act(() => openModalButton.click());
    act(() => closeModalButton.click());
    expect(modalStatus).toHaveTextContent("Modal is closed");
  });

  it("should render children", () => {
    const { getByTestId } = render(
      <AppProvider>
        <div data-testid="child" />
      </AppProvider>
    );
    expect(getByTestId("child")).toBeInTheDocument();
  });

  it("should throw an error if used outside of AppProvider", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation();
    expect(() => useAppContext()).toThrowError();
    errorSpy.mockRestore();
  });

  it("should return the default context values", () => {
    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppProvider,
    });
    expect(result.current).toEqual({
      user: {
        name: "Guest User",
        email: "guest.user@email.com",
      },
      modalIsVisible: false,
      postId: 0,
      assignPostId: expect.any(Function),
      handleModalClose: expect.any(Function),
      handleModalOpen: expect.any(Function),
    });
  });
});
