/* eslint-disable no-unused-vars */
import { UrlState } from "@/context";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const CreateLink = () => {
    const { user } = UrlState();
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();

    return <div>create-link</div>;
};

export default CreateLink;
