import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../../utils/UserSession";

const AdminProtectedRoute = ({ children }) => {
    const user = getUser();
    if (user.role !== 'Admin') {
        return <Navigate to="/login" />;
    }
    return children;
};

export default AdminProtectedRoute;
