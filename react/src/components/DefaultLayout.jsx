import { Button } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Greeting from "../Greetings.jsx";
import {
    GoTasklist,
    IoMdSettings,
    MdDashboard,
    MdOutlineSupervisedUserCircle,
} from "../assets/Icons.js";
import picture from "../assets/icon.svg";
import axiosInstance from "../axios-instance";
import { useStateContext } from "../contexts/ContextProvider";
import TaskContext from "../contexts/TaskContext.jsx";
import StyledNavLink from "./Buttons/StyledNavLink";
import AddTaskModal from "./Modal/AddModal.jsx";
import AvatarMenu from "./Modal/AvatarMenu.jsx";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    const location = useLocation();
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const { dispatch } = useContext(TaskContext);

    if (!token) {
        return <Navigate to="/login" />;
    }

   

    const onAddButton = (ev) => {
        ev.preventDefault();
    };

    const handleSave = async (task) => {
        const saveTask = async () => {
            const response = await axiosInstance.post(
                "http://localhost:8000/api/tasks/",
                { ...task }
            );

            const newTask = response.data;

            dispatch({ type: "ADD_TASK", payload: newTask });

            return newTask;
        };

        toast.promise(saveTask(), {
            loading: "Saving...",
            success: "Task added successfully!",
            error: "Error when adding task",
        });
    };

    useEffect(() => {
        axiosInstance.get("http://localhost:8000/sanctum/csrf-cookie");
        axiosInstance.get("http://localhost:8000/api/user").then(({ data }) => {
            setUser(data);
        });

        
    }, []);

    return (
        <div className="flex h-screen bg-white font-montserrat overflow-auto md:overflow-visible">
            <div className="flex flex-col overflow-y-auto bg-white w-20 md:w-64 lg:w-64">
                <div className="flex items-start p-5 mb-9">
                    <Link to="/dashboard">
                        <img src={picture} className="w-12" />  
                    </Link>
                </div>
                <nav className="flex flex-col h-max-screen pr-4 justify-center">
                    <StyledNavLink to={"/dashboard"}>
                        <MdDashboard className="mr-1" /> Dashboard
                    </StyledNavLink>
                    <StyledNavLink to={"/tasks"}>
                        <GoTasklist className="mr-1" />
                        Tasks
                    </StyledNavLink>
                    <StyledNavLink to={"/profile"}>
                        <MdOutlineSupervisedUserCircle className="mr-1" />
                        Profile
                    </StyledNavLink>
                    
                </nav>
                <div className="mt-auto">
                    <Button
                        className="m-2 md:m-5 text-xs md:text-md font-montserrat"
                        color="amber"
                        onClick={() => setAddModalOpen(true)}
                    >
                        <span className="hidden md:inline-block">
                            Add new task
                        </span>
                        <span className="inline-block md:hidden">
                            <IoMdAdd />
                        </span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div>
                    <Toaster />
                </div>
                <header className="p-[20px] lg:pl-[300px] bg-white flex items-center justify-between">
                    <div className="mx-auto text-center md:text-lg lg:text-xl font-bold">
                        <Greeting user={user} />
                    </div>
                    <div className="ml-auto flex flex-col items-center">
                        <p className="font-montserrat text-gray-900 text-xs mx-auto">
                            {user.name}
                        </p>
                        <AvatarMenu user={user} />
                    </div>
                </header>
                <main className="p-4 overflow-y-auto flex-grow ">
                    <Outlet />
                </main>
            </div>

            <AddTaskModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                onSave={handleSave}
            />
        </div>
    );
}
