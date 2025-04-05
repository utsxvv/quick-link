import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const LandingPage = () => {
    return (
        <div>
            <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white font-extrabold text-center">
                Say more with less <br />
                Every click counts
            </h2>
            <form>
                <Input />
                <Button>Shorten!</Button>
            </form>
        </div>
    );
};

export default LandingPage;
