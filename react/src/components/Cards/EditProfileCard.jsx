import { Button, Input, Textarea } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { IoIosReturnLeft } from "react-icons/io";
import { Link, redirect, useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/default_avatar.png";
import axiosInstance from "../../axios-instance";
import { useStateContext } from "../../contexts/ContextProvider";

import toast from "react-hot-toast";

export default function EditProfileCard() {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { user, setUser } = useStateContext();
    const url = `http://localhost:8000${user.avatar}`;
    const [isLoaded, setIsLoaded] = useState(false);

    const validateEmail = (email) => {
        var re =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    const [userDetails, setUserDetails] = useState({
        name: user.name,
        description: user.description,
        email: user.email,
        avatar: user.avatar,
        selectedFile: null,
    });

    useEffect(() => {
        const img = new Image();
        img.src = url;
        img.onload = () => setIsLoaded(true);
    }, [user.avatar]);

    const handleSave = () => {
        let errors = {};
        if (!userDetails.name) errors.name = "Name is required";
        if (!userDetails.description)
            errors.description = "Description is required";
        if (!userDetails.email) {
            errors.email = "Email is required";
        } else if (!validateEmail(userDetails.email)) {
            errors.email = "Email is not valid";
        }
        const formData = new FormData();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        Object.keys(userDetails).forEach((key) => {
            if (key !== "selectedFile" && key !== "avatar") {
                formData.append(key, userDetails[key]);
            }
        });

        if (userDetails.selectedFile) {
            formData.append("avatar", userDetails.selectedFile);
        }

        const updateUser = async () => {
            try {
                const response = await axiosInstance.post(
                    "http://localhost:8000/user/update",
                    formData
                );
                setUser(response.data.user);
            } catch (err) {
                console.log(err);
            }
        };

        toast.promise(updateUser(), {
            loading: "Updating your profile...",
            success: "Profile updated!",
            error: "Error when updating profile",
        });
        redirect("/profile"); // Добавьте эту строку
    };

    const handleFileChange = (event) => {
        setUserDetails({ ...userDetails, selectedFile: event.target.files[0] });
    };

    const fileInput = useRef();

    const triggerFileInput = () => {
        fileInput.current.click();
    };

    return (
        <div className="flex flex-col items-center justify-center h-full py-2 flex-grow">
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg mb-[100px] md:mb-0 py-[80px] md:py-[20px] shadow-2xl px-[60px] md:px-[60px] relative animate__animated animate__fadeIn">
                <Link
                    className="absolute top-0 left-0 m-4 h-5 w-5"
                    to="/profile"
                >
                    <IoIosReturnLeft />
                </Link>
    
                <div>
                    <img
                        className="h-16 w-16 md:h-24 md:w-24 rounded-full"
                        src={
                            userDetails.selectedFile
                                ? URL.createObjectURL(userDetails.selectedFile)
                                : isLoaded
                                ? url
                                : defaultAvatar
                        }
                        alt="User avatar"
                    />
                </div>
                <div className="mt-2">
                    <input
                        type="file"
                        className="hidden"
                        ref={fileInput}
                        onChange={handleFileChange}
                    />
                    <Button
                        onClick={triggerFileInput}
                        color="amber"
                        size="sm"
                        className="font-montserrat"
                    >
                        Upload avatar
                    </Button>
                </div>
                <div className="mb-7 mt-4">
                    <Input
                        className="font-montserrat text-gray-900"
                        label="Name"
                        placeholder="Name"
                        variant="static"
                        value={userDetails.name}
                        onChange={(e) =>
                            setUserDetails({
                                ...userDetails,
                                name: e.target.value,
                            })
                        }
                    />
                    {errors.name && <p className="text-red-500 ">{errors.name}</p>}
                </div>
                <div>
                    <Textarea
                        variant="static"
                        label="Description"
                        placeholder="Description"
                        value={userDetails.description}
                        onChange={(e) =>
                            setUserDetails({
                                ...userDetails,
                                description: e.target.value,
                            })
                        }
                        className="text-gray-900"
                    />
                    {errors.description && <p className="text-red-500 ">{errors.description}</p>}
                </div>
    
                <div className="mt-4">
                    <Input
                        className="font-montserrat text-gray-900"
                        label="Email"
                        placeholder="Email"
                        variant="static"
                        value={userDetails.email}
                        onChange={(e) =>
                            setUserDetails({
                                ...userDetails,
                                email: e.target.value,
                            })
                        }
                    />
                    {errors.email && (
                        <p className="text-red-500 ">{errors.email}</p>
                    )}
                </div>
    
                <Button
                    className="mt-5 font-montserrat"
                    color="amber"
                    size="md"
                    onClick={handleSave}
                >
                    Save
                </Button>
            </div>
        </div>
    );
    
}
