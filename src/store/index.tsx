import { User } from "@/types";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type AppContextType = {
  user: User;
  modalIsVisible: boolean;
  postId: number;
  assignPostId: (id: number) => void;
  handleModalClose: () => void;
  handleModalOpen: () => void;
};

export const AppContextDefaultValues: AppContextType = {
  // Temporary user until there is an authenticated user
  user: {
    name: "Guest User",
    email: "guest.user@email.com",
  },
  modalIsVisible: false,
  postId: 0,
  assignPostId: (id: number) => {},
  handleModalClose: () => {},
  handleModalOpen: () => {},
};

export const AppContext = createContext<AppContextType>(
  AppContextDefaultValues
);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [postId, setPostId] = useState(0);

  const handleModalClose = () => {
    setModalIsVisible(false);
  };

  const assignPostId = (id: number) => {
    setPostId(id);
  };

  const handleModalOpen = () => {
    setModalIsVisible(true);
  };

  const value = {
    modalIsVisible,
    handleModalClose,
    handleModalOpen,
    postId,
    assignPostId,
    user: AppContextDefaultValues.user,
  };
  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
};
