/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-refresh/only-export-components */
import { User } from "../types/User";
import jwtDecode from "jwt-decode";
import React, { useContext, useState, ReactNode } from "react";

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextValue {
  user: User;
  signIn: () => void;
  signOut: () => void;
  token: string;
}

declare global {
  interface Window {
    google: any;
  }
}

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

export const UserContext = React.createContext<UserContextValue | null>(null);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({ name: null });
  const [token, setToken] = useState("");

  const signInCallback = (res: any) => {
    setToken(res.credential);
    const userObject = jwtDecode(res.credential);
    setUser(userObject as unknown as User);
  };

  const signIn = () => {
    if (typeof window.google === "undefined") {
      console.log("Google Identity API not loaded");
      return;
    }
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: signInCallback,
    });
    window.google.accounts.id.prompt();
  };

  const signOut = () => {
    window.google.accounts.id.disableAutoSelect();
    setUser({ name: null });
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut, token }}>{children}</UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext) as UserContextValue;
}
