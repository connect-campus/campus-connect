import React from "react";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import CreatePost from "../Post/Post";

const HomePage = () => {
  const user = useAuthUser();
  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();

  return (
    <div>
      <CreatePost />
      <h1>Welcome to my website!</h1>
      <button onClick={() => signOut()}>Sign Out</button>
      <p>Here you can find all sorts of cool stuff.</p>
    </div>
  );
};

export default HomePage;
