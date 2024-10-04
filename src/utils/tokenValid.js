import { jwtDecode } from "jwt-decode";

const isTokenValid = (token) => {
  if (!token) return false;

  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

export default isTokenValid;
