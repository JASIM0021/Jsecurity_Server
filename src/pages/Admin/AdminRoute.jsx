import { Outlet } from "react-router-dom";
import LoginForm from "../auth/LoginForm";

const AdminRoute = () => {
  const token = localStorage.getItem("auth-token");
  return <div>{token ? <Outlet /> : <LoginForm />}</div>;
};

export default AdminRoute;
