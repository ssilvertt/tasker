import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/default_avatar.png";
import TaskContext from "../../contexts/TaskContext";
import { AiOutlineEdit } from "react-icons/ai";

export default function ProfileCard(user) {
    const url = `http://localhost:8000${user.user.avatar}`;
    const [isLoaded, setIsLoaded] = useState(false);
    const { state } = useContext(TaskContext);

    const activeTasks = state.filter(
        (task) => task.state == "in_progress"
    ).length;
    const unstartedTasks = state.filter(
        (task) => task.state == "not_started"
    ).length;
    const doneTasks = state.filter((task) => task.state == "done").length;

    useEffect(() => {
        const img = new Image();
        img.src = url;
        img.onload = () => setIsLoaded(true);
    }, [user.user.avatar]);

    return (
        <div className="flex flex-col items-center justify-center h-full py-2 flex-grow"> 
            <div className="flex flex-col items-center justify-center mb-20 bg-white p-6 rounded-lg shadow-2xl relative animate__animated animate__fadeIn">
            <Link to="/edit/profile" className="absolute top-2 right-2 p-4"><AiOutlineEdit /></Link>
                <img
                    className="h-16 w-16 md:h-24 md:w-24 rounded-full"
                    src={isLoaded ? url : defaultAvatar}
                    alt="User avatar"
                />
    
                <h2 className="mt-4 text-xl md:text-2xl font-semibold text-gray-900">
                    {user.user.name}
                </h2>
    
                <p className="mt-2 text-md md:text-lg text-gray-900">
                    {user.user.description}
                </p>
    
                <p className="mt-2 text-md md:text-lg text-gray-600">{user.user.email}</p>
    
                <div className="mt-4">
                    <h3 className="text-md md:text-lg font-medium text-gray-900">
                        Статистика
                    </h3>
                    <div className="mt-2 space-y-5 md:space-y-0 text-xs md:text-lg md:grid md:grid-cols-3 md:gap-3">
                        <div className="p-3 bg-gray-100 rounded-lg">
                            <h4 className="font-semibold text-gray-500">
                                Unstarted tasks
                            </h4>
                            <p className="text-gray-600">{unstartedTasks}</p>
                        </div>
                        <div className="p-3 bg-amber-200 rounded-lg">
                            <h4 className="font-semibold text-amber-900">
                                Active tasks
                            </h4>
                            <p className="text-amber-700">{activeTasks}</p>
                        </div>
                        <div className="p-3 bg-gray-900 rounded-lg">
                            <h4 className="font-semibold text-white">
                                Done tasks
                            </h4>
                            <p className="text-white">{doneTasks}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
