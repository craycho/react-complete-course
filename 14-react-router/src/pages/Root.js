import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
} // <Outlet /> obiljezi mjesto gdje ce se renderovati child routes

export default RootLayout;
