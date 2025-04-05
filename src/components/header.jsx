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

const header = () => {
    const navigate = useNavigate();
    const user = false;

    return (
        <nav className="flex justify-between items-center">
            <Link to="/">
                <img src="/logo.png" alt="Quick Link Logo" className="h-32" />
            </Link>

            <div>
                {!user ? (
                    <Button onClick={() => navigate("/auth")}>Login</Button>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="w-8 rounded-full overflow-hidden">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>UP</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel className="text-center">
                                Utsav Patel
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LinkIcon className="mr-2 h-4 w-4" />
                                <span>My Links</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400">
                                <LogOut className="mr-2 h-4 w-4 text-red-400" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </nav>
    );
};

export default header;
