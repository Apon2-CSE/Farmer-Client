// src/routes/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(Authcontext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
