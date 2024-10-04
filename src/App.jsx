import { useNavigate } from "react-router-dom";
import RouteController from "./routes";
import { useEffect } from "react";
import isTokenValid from "./utils/tokenValid";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!isTokenValid(token)) {
      navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <>
      <RouteController />
    </>
  );
}

export default App;
