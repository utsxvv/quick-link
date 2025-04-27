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
import Error from "./error";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const Login = () => {
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const { data, error, loading, fn: fnLogin } = useFetch(login, formData);
    const { fetchUser } = UrlState();

    useEffect(() => {
        if (error === null && data) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
            fetchUser();
        }
    }, [error, data]);

    const handleLogin = async () => {
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email("Oops! Please enter a correct email.")
                    .required("Please enter your email address."),
                password: Yup.string()
                    .min(6, "Password must be at least 6 characters")
                    .required("Password must be 6 characters or longer."),
            });

            await schema.validate(formData, { abortEarly: false });

            await fnLogin();
        } catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>To your Quick Link Account</CardDescription>
                {error && <Error message={error.message} />}
            </CardHeader>
            <CardContent className="space-y-2">
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
            </CardContent>
            <CardFooter>
                <Button onClick={handleLogin}>
                    {loading ? <BeatLoader size={10} color="white" /> : "Login"}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default Login;
