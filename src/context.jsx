import { Children, createContext, useContext, useEffect } from "react";
import useFetch from "./hooks/use-fatch";
import { getCurrentUser } from "./db/apiAuth";

const UrlContext = createContext();

const UrlProvider = ({ Children }) => {
    const { data: user, loading, fn: fetchuser } = useFetch(getCurrentUser);

    const isAuthenticated = user?.role === "authenticated";

    useEffect(() => {
        fetchuser();
    }, []);

    return (
        <UrlContext.Provider
            value={{ user, fetchuser, loading, isAuthenticated }}
        >
            {Children}
        </UrlContext.Provider>
    );
};

export const UrlState = () => {
    return useContext(UrlContext);
};

export default UrlProvider;
