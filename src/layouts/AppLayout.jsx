import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AppLayout = () => {
    return (
        <div>
            <main className="min-h-screen container px-16">
                <Header />
                <Outlet />
            </main>

            <div className="p-10 text-center bg-card mt-10">
                <p>Made with ❤️ by Utsav</p>
                <p className="mt-3">
                    For queries or feedback, reach out at:{" "}
                    <a
                        href="mailto:utssavvpatel@gmail.com"
                        className="text-blue-500"
                    >
                        utssavvpatel@gmail.com
                    </a>
                </p>
            </div>
        </div>
    );
};

export default AppLayout;
