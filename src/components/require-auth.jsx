/* eslint-disable react-hooks/exhaustive-deps */
import { UrlState } from "@/context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

function RequireAuth({ children }) {
    const navigate = useNavigate();

    const { loading, isAuthenticated } = UrlState();

    useEffect(() => {
        if (!isAuthenticated && loading === false) navigate("/auth");
    }, [isAuthenticated, loading]);

    if (loading) return <BarLoader width={"100%"} color="white" />;

    if (isAuthenticated) return children;
}

export default RequireAuth;
