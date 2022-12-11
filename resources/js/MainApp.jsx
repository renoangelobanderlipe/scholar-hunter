import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { DashboardPage } from "./components/DashboardPage";

export const MainApp = () => {
  // {isLoggedIn} = useAuth();
  const isLoggedIn = true;
  const role = "admin";

  return (
    <>
      <Routes>
        <Route path="/a">
          <Route path="/home" element={<DashboardPage />} />
          {/* <Route path="/home" />
          <Route path="/home" /> */}
        </Route>
      </Routes>
    </>
  );
};
