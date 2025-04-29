import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const Signup = () => {
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        profile_pic: null,
    });

    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    };

    const { data, error, loading, fn: fnSignup } = useFetch(signup, formData);

    useEffect(() => {
        if (error === null && data) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
        }
    }, [error, loading]);

    const handleSignup = async () => {
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required("Please enter your name."),
                email: Yup.string()
                    .email("Oops! Please enter a correct email.")
                    .required("Please enter your email address."),
                password: Yup.string()
                    .min(6, "Password must be 6 characters or longer.")
                    .required("Please enter your password."),
                profile_pic: Yup.mixed().required(
                    "Please upload a profile picture."
                ),
            });

            await schema.validate(formData, { abortEarly: false });

            await fnSignup();
        } catch (e) {
            const newErrors = {};

            if (e?.inner) {
                e?.inner?.forEach((err) => {
                    newErrors[err.path] = err.message;
                });

                setErrors(newErrors);
            } else {
                setErrors({ api: e.message });
            }
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>
                    Create a new account if you haven&rsquo;t already
                </CardDescription>
                {error && <Error message={error.message} />}
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Input
                        name="name"
                        type="text"
                        placeholder="Enter Your Name"
                        onChange={handleInputChange}
                    />
                    {errors.name && <Error message={errors.name} />}
                </div>
                <div className="space-y-1">
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter Your Email"
                        onChange={handleInputChange}
                    />
                    {errors.email && <Error message={errors.email} />}
                </div>
                <div className="space-y-1">
                    <Input
                        name="password"
                        type="password"
                        placeholder="Enter Your Password"
                        onChange={handleInputChange}
                    />
                    {errors.password && <Error message={errors.password} />}
                </div>
                <div className="flex items-center space-x-3">
                    <Input
                        id="profile_pic"
                        name="profile_pic"
                        type="file"
                        accept="image/*"
                        onChange={handleInputChange}
                        className="border-gray-300 text-white"
                    />
                    {errors.profile_pic && (
                        <Error message={errors.profile_pic} />
                    )}
                    <label
                        htmlFor="profile_pic"
                        className="text-sm text-muted-foreground inline-flex items-center"
                    >
                        Profile Picture
                    </label>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSignup}>
                    {loading ? (
                        <BeatLoader size={10} color="white" />
                    ) : (
                        "Create Account"
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default Signup;
