import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [longUrl, setLongUrl] = useState();
    const navigate = useNavigate();

    const handleShorten = (e) => {
        e.preventDefault();
        if (longUrl) navigate(`/auth?createNew=${longUrl}`);
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white font-extrabold text-center">
                Say more with less <br />
                Every click counts
            </h2>
            <form
                onSubmit={handleShorten}
                className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
            >
                <Input
                    type="url"
                    value={longUrl}
                    placeholder="Drop the URL, we'll handle the rest"
                    onChange={(e) => setLongUrl(e.target.value)}
                    className="h-full flex-1 py-4 px-4"
                />
                <Button className="h-full" type="submit" variant="destructive">
                    Shorten!
                </Button>
            </form>
            <img
                src="/banner.jpg"
                alt="Banner"
                className="w-full my-11 md:px-11"
            />

            <Accordion type="multiple" collapsible className="w-full md:px=11">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        How does the Quick Link works?
                    </AccordionTrigger>
                    <AccordionContent>
                        Paste your long URL, click the button, and get a sleek
                        short link instantly. This shortened URL redirects to
                        the original URL when accessed.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        Do I need an account to use Quick Link?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes, you’ll need to create an account. Having one lets
                        you manage your links, track performance, and even
                        customize your shortened URLs.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                        What kind of analytics do I get for my short links?
                    </AccordionTrigger>
                    <AccordionContent>
                        Quick Link provides detailed insights including total
                        clicks, visitor locations, and the type of device used
                        for each shortened URL.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default LandingPage;
