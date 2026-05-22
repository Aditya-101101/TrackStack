import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import { isTokenExpired } from "../utils/token.js";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const expired = token ? isTokenExpired(token) : true;

  useEffect(() => {
    if (expired) {
      dispatch(logout());
    }
  }, [expired, dispatch]);

  if (expired) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;