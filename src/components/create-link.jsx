/* eslint-disable react-hooks/exhaustive-deps */
import { UrlState } from "@/context";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import Error from "./Error";
import * as yup from "yup";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/use-fetch";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const CreateLink = () => {
    const { user } = UrlState();
    const navigate = useNavigate();
    const ref = useRef();
    let [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const [errors, setErrors] = useState({});
    const [formValues, setFormValues] = useState({
        title: "",
        longUrl: longLink ? longLink : "",
        customUrl: "",
    });

    const schema = yup.object().shape({
        title: yup.string().required("Oops! Title is missing."),
        longUrl: yup
            .string()
            .url("Invalid URL format.")
            .required("The long URL cannot be blank."),
        customUrl: yup.string(),
    });

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value,
        });
    };

    const {
        loading,
        error,
        data,
        fn: fnCreateUrl,
    } = useFetch(createUrl, { ...formValues, user_id: user.id });

    useEffect(() => {
        if (error === null && data) {
            navigate(`/link/${data[0].id}`);
        }
    }, [error, data]);

    const createNewLink = async () => {
        setErrors([]);
        try {
            await schema.validate(formValues, { abortEarly: false });
            const canvas = ref.current.canvasRef.current;
            const blob = await new Promise((resolve) => canvas.toBlob(resolve));

            await fnCreateUrl(blob);
        } catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        }
    };

    return (
        <Dialog
            defaultOpen={longLink}
            onOpenChange={(res) => {
                if (!res) {
                    setSearchParams({});
                }
            }}
        >
            <DialogTrigger>
                <Button>Add New Link</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New</DialogTitle>
                </DialogHeader>

                {formValues?.longUrl && (
                    <QRCode
                        value={formValues?.longUrl}
                        size={250}
                        ref={ref}
                        logoImage="/qr-image.png"
                        logoWidth={100}
                        logoHeight={100}
                        fgColor="#000000"
                        bgColor="#ffffff"
                        removeQrCodeBehindLogo={true}
                    />
                )}

                <Input
                    id="title"
                    placeholder="Link Title"
                    value={formValues.title}
                    onChange={handleChange}
                />
                {errors.title && <Error message={errors.title} />}

                <Input
                    id="longUrl"
                    placeholder="Long URL Here"
                    value={formValues.longUrl}
                    onChange={handleChange}
                />
                {errors.longUrl && <Error message={errors.longUrl} />}

                <div className="flex items-center gap-2">
                    <Card className="p-2">quicklink.in</Card> /
                    <Input
                        id="customUrl"
                        placeholder="Custom Link (Optional)"
                        value={formValues.customUrl}
                        onChange={handleChange}
                    />
                </div>
                {error && <Error message={error.message} />}

                <DialogFooter className="sm:justify-start">
                    <Button disabled={loading} onClick={createNewLink}>
                        {loading ? (
                            <BeatLoader size={10} color="white" />
                        ) : (
                            "Create"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateLink;
