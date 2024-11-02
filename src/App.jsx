import { useNavigate } from "react-router-dom";
import RouteController from "./routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "./redux/slices/authSlice";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/auth/login");
  //     dispatch(signOut());
  //   }
  // }, [navigate]);

  return (
    <>
      <RouteController />
    </>
  );
};

export default App;
