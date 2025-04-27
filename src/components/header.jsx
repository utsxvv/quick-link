/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";

const header = () => {
    const navigate = useNavigate();

    const { user, fetchUser } = UrlState();

    const { loading, fn: fnLogout } = useFetch(logout);

    return (
        <>
            <nav className="flex justify-between items-center">
                <Link to="/">
                    <img
                        src="/logo.png"
                        alt="Quick Link Logo"
                        className="h-32"
                    />
                </Link>

                <div className="flex gap-4">
                    {!user ? (
                        <Button onClick={() => navigate("/auth")}>Login</Button>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-8 rounded-full overflow-hidden">
                                <Avatar>
                                    <AvatarImage
                                        src={user?.user_metadata?.profile_pic}
                                        className="object-contain"
                                    />
                                    <AvatarFallback>QL</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel className="text-center">
                                    {user?.user_metadata?.name}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link to="/dashboard" className="flex">
                                        <LinkIcon className="mr-2 h-4 w-4" />
                                        <span className="pl-2">My Links</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        fnLogout().then(() => {
                                            fetchUser();
                                            navigate("/auth");
                                        });
                                    }}
                                    className="text-red-400"
                                >
                                    <LogOut className="mr-2 h-4 w-4 text-red-400" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </nav>
            {loading && (
                <BarLoader className="mb-4" width={"100%"} color="white" />
            )}
        </>
    );
};

export default header;
