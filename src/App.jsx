import { useNavigate } from "react-router-dom";
import RouteController from "./routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "./redux/slices/authSlice";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
    }
  }, [navigate]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "token") {
        dispatch(signOut());
        navigate("/auth/login");
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate, dispatch]);

  return (
    <>
      <RouteController />
    </>
  );
};

export default App;
