import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let loggedIn = false;

  return (
    loggedIn ? <Outlet /> : <Navigate to='/login' />
  );
}

export default PrivateRoutes;