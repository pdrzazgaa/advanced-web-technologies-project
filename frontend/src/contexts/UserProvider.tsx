/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-refresh/only-export-components */
import { User } from "../types/User";
import jwtDecode from "jwt-decode";
import React, { useContext, useState, ReactNode } from "react";
import { Mode } from "../types/Mode";

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextValue {
  user: User;
  signIn: () => void;
  signOut: () => void;
  token: string;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

declare global {
  interface Window {
    google: any;
  }
}

// const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
const CLIENT_ID = "1041308792303-l9dj3bgmb5pgolf52ods8uet3n6jnp7s.apps.googleusercontent.com";

export const UserContext = React.createContext<UserContextValue | null>(null);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({ name: null });
  const [token, setToken] = useState("");
  const [mode, setMode] = useState<Mode>("opt");

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
    <UserContext.Provider value={{ user, signIn, signOut, token, mode, setMode }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext) as UserContextValue;
}
