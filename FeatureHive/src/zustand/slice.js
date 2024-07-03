import useStore from "./store";
import { Navigate, Outlet } from "react-router-dom";

const AuthCheck = () => {
  const isLoggedIn = useStore((state) => state.isUserLoggedIn);
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };
  const token = getCookie('auth-token');
  if (token) {
    useStore.setState({ isUserLoggedIn: true });
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthCheck;