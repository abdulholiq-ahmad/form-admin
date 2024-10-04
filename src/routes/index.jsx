import { Outlet, useLocation, useRoutes } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Suspense from "../utils";
import { lazy } from "react";
import Settings from "./settings/Settings";
import Response from "./response/Response";
import Questions from "./questions/Questions";

const Home = lazy(() => import("./home/Home"));
const AuthLayout = lazy(() => import("./auth/authLayout/AuthLayout"));
const Signin = lazy(() => import("./auth/sign-in/Signin"));

const Layout = ({ children }) => {
  const isAuthRoute = useLocation().pathname.startsWith("/auth");

  return (
    <>
      {!isAuthRoute && <Header />}
      <Outlet />
      {!isAuthRoute && <Footer />}
      {children}
    </>
  );
};

const RouteController = () => {
  return (
    <Suspense>
      {useRoutes([
        {
          element: <Layout />,
          children: [
            {
              path: "/",
              element: <Home title={"Home"} />,
            },
            {
              path: "/auth",
              element: <AuthLayout title={"Sign in"} />,
              children: [
                {
                  path: "/auth/login",
                  element: <Signin />,
                },
              ],
            },
            {
              path: "/questions",
              element: <Questions title={"Create a question"} />,
            },
            {
              path: "/response",
              element: <Response title={"Response"} />,
            },
            {
              path: "/settings",
              element: <Settings title={"Settings"} />,
            },
          ],
        },
      ])}
    </Suspense>
  );
};

export default RouteController;
