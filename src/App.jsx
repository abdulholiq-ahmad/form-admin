import { useNavigate } from "react-router-dom";
import RouteController from "./routes";
import { useEffect } from "react";
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
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
