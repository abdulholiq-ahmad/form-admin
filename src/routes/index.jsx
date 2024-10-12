import { Outlet, useLocation, useRoutes } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Suspense from "../utils";
import { lazy, memo } from "react";
import Questions from "./questions/Questions";
import CreateQuestions from "./questions/CreateQuestions";
import SingleQuestion from "./singleQuestion/SingleQuestion";

const Home = lazy(() => import("./home/Home"));
const AuthLayout = lazy(() => import("./auth/authLayout/AuthLayout"));
const Signin = lazy(() => import("./auth/sign-in/Signin"));
const NotFound = lazy(() => import("./not-found/NotFound"));

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
              element: <Questions title={"Questions"} />,
            },
            {
              path: "/create-question",
              element: <CreateQuestions title={"Create a question"} />,
            },
            {
              path: "/questions/:id",
              element: <SingleQuestion />,
            },
          ],
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ])}
    </Suspense>
  );
};

export default memo(RouteController);
