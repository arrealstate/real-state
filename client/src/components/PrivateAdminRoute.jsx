import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateAdminRoute() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  return currentUser?.role?.toLowerCase() === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="404" />
  );
}
