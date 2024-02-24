import React from "react";
import { Outlet } from "react-router";

function AuthBackground(props) {
  return (
    <div
      style={{
        backgroundImage: `url("/background3.png")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <Outlet />
    </div>
  );
}

export default AuthBackground;
