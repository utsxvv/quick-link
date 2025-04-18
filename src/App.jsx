import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Link from "./pages/Link";
import RedirectLink from "./pages/RedirectLink";
import UrlProvider from "./context";
import RequireAuth from "./components/Require-auth";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: (
                    <RequireAuth>
                        <LandingPage />
                    </RequireAuth>
                ),
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/auth",
                element: <Auth />,
            },
            {
                path: "/link/:id",
                element: (
                    <RequireAuth>
                        <Link />
                    </RequireAuth>
                ),
            },
            {
                path: "/:id",
                element: <RedirectLink />,
            },
        ],
    },
]);

function App() {
    return (
        <UrlProvider>
            <RouterProvider router={router} />
        </UrlProvider>
    );
}

export default App;
