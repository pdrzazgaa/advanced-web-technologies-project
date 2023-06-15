import { Button } from "@mui/material";
import React, { FC } from "react";
import { useUser } from "../contexts/UserProvider";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const GoogleAuthButton: FC = () => {
  const { signIn, signOut, user } = useUser();

  const SignInButton: FC = () => (
    <Button onClick={signIn}>
      <PersonIcon sx={{ fontSize: 46, color: "text.primary" }} />
    </Button>
  );

  const SignOutButton: FC = () => (
    <Button onClick={signOut}>
      <LogoutIcon sx={{ fontSize: 40, color: "text.primary" }} />
    </Button>
  );

  return user.name ? <SignOutButton /> : <SignInButton />;
};

export default GoogleAuthButton;
