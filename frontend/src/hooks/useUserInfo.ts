import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export type UserInfo = {
  id: string;
  email: string;
};

export type UserInfoContextValue = {
  userInfo: UserInfo | null;
  setUserInfo: Dispatch<SetStateAction<UserInfo | null>>;
};

export const UserInfoContext = createContext<UserInfoContextValue | null>(null);

export const useUserInfo = () => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("useUserInfo must be used within UserInfoContext provider");
  }
  return context;
};
