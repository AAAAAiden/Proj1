import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div
        className="background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          background: "linear-gradient(45deg, #83a4d4, #b6fbff)",
          animation: "moveBackground 20s linear infinite",
        }}
      >
      </div>

      <div
        className="foreground"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
