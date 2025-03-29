import { Navigate, Outlet } from "react-router-dom";
import Layout from "../Layout/Layout.jsx"

const ProtectedRoute = () => {
    const token = localStorage.getItem("accessToken");

    return token ? (
        <Layout>
            <Outlet />
        </Layout>
    ) : (<Navigate to="/" />);
};
export default ProtectedRoute;