import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../../utils/UserSession";

const ProtectedRoute = ({ children }) => {
    const user = getUser();
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;
