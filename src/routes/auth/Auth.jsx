import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-[400px] w-full shadow-3xl p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
