import { Outlet } from "react-router-dom";
import Suspense from "../../../utils";

const AuthLayout = () => {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
};

export default AuthLayout;
