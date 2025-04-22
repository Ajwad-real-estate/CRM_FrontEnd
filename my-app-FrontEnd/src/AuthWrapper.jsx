import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import App from "./App";

const AuthWrapper = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Check for access token in cookies
    const accessToken = Cookies.get("accessToken");

    if (
      !accessToken &&
      !window.location.pathname.includes("/signin") &&
      !window.location.pathname.includes("/signup")
    ) {
      navigate("/signin");
    }
  }, [navigate]);

  return <App />;
};

export default AuthWrapper;
