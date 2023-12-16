import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Tooltip,
    Typography,
} from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import axiosInstance from "../axios-instance";
import TaskContext from "../contexts/TaskContext";
import EditTaskModal from "./Modal/EditModal";
function Task({ task }) {
    const { dispatch } = useContext(TaskContext);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const deleteTask = async (taskid) => {
        const taskDelete = async () => {
            await axiosInstance.delete(
                `http://localhost:8000/api/tasks/${taskid}`
            );
            dispatch({ type: "DELETE_TASK", payload: taskid });
        };

        toast.promise(taskDelete(), {
            loading: "Deleting...",
            success: "Task deleted!",
            error: "Error when deleting task",
        });
    };
    const handleStateChange = async (taskid, newState) => {
        const stateChange = async () => {
            await axiosInstance.put(
                `http://localhost:8000/api/tasks/${taskid}`,
                { state: newState }
            );
            dispatch({
                type: "UPDATE_TASK",
                payload: { id: taskid, state: newState },
            });
        };

        toast.promise(stateChange(), {
            loading: "Changing state...",
            success: "Task state changed!",
            error: "Error when changing task state",
        });
    };

    const handleEdit = async (taskid, updates) => {
        const taskEdit = async () => {
            await axiosInstance.put(
                `http://localhost:8000/api/tasks/${taskid}`,
                updates
            );
            dispatch({
                type: "EDIT_TASK",
                payload: { id: taskid, ...updates },
            });
        };

        toast.promise(taskEdit(), {
            loading: "Editing...",
            success: "Task edited!",
            error: "Error when editing task",
        });
    };

    let circleColor = "";
    if (task.priority === "low") {
        circleColor = "bg-green-500";
    } else if (task.priority === "medium") {
        circleColor = "bg-yellow-500";
    } else if (task.priority === "high") {
        circleColor = "bg-red-500";
    }

    return (
        <div
        className={`bg-white border font-medium rounded-md py-2 pl-2 pr-10 relative animate__animated animate__fadeIn min-h-[100px] hover:shadow-md`}
        >
            <div
                className="text-sm w-full h-full flex  cursor-pointer"
                onClick={handleOpen}
            >
                {task.title}
            </div>
            <Tooltip
                placement="bottom"
                className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                content={
                    <div className="w-80">
                        <Typography color="blue-gray" className="font-medium">
                            Task Priority
                        </Typography>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-80"
                        >
                            The color of the circle indicates the task priority:{" "}
                            <br />
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                                <span>High priority</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                                <span>Medium priority</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                <span>Low priority</span>
                            </div>
                        </Typography>
                    </div>
                }
            >
                <div
                    className={`w-2 h-2 rounded-full absolute bottom-0 right-0 m-2 ${circleColor}`}
                ></div>
            </Tooltip>

            <Menu
                placement="right"
                offset={10}
                className="border-none hover:border-none active:border-none focus:border-none"
            >
                <MenuHandler>
                    <div className="absolute top-0 right-0 m-1">
                        <HiOutlineDotsHorizontal className="cursor-pointer" />
                    </div>
                </MenuHandler>

                <MenuList className="min-w-[100px] p-2 border-none hover:border-none active:border-none focus:border-none">
                    <div className="text-xs border-none hover:border-none active:border-none focus:border-none">
                        {task.state !== "not_started" && (
                            <MenuItem
                                onClick={() =>
                                    handleStateChange(task.id, "not_started")
                                }
                                className="p-1"
                            >
                                Move to "Not Started"
                            </MenuItem>
                        )}
                        {task.state !== "in_progress" && (
                            <MenuItem
                                onClick={() =>
                                    handleStateChange(task.id, "in_progress")
                                }
                                className="p-1"
                            >
                                Move to "In Progress"
                            </MenuItem>
                        )}
                        {task.state !== "done" && (
                            <MenuItem
                                onClick={() =>
                                    handleStateChange(task.id, "done")
                                }
                                className="p-1"
                            >
                                Move to "Done"
                            </MenuItem>
                        )}
                        <MenuItem
                            onClick={() => setEditModalOpen(true)}
                            className="p-1"
                        >
                            Edit
                        </MenuItem>
                        <MenuItem
                            onClick={() => deleteTask(task.id)}
                            className="bg-red-500 text-white p-1 
                hover:bg-red-500 active:bg-red-500 active:text-white hover:shadow-md hover:text-white w-auto px-2
                "
                        >
                            Delete
                        </MenuItem>
                    </div>
                </MenuList>
            </Menu>

            <EditTaskModal
                task={task}
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSave={handleEdit}
            />
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className='font-montserrat'>{task.title}</DialogHeader>
                <DialogBody >
                    <Typography variant="h4" className='font-montserrat text-gray-900'>{task.description}</Typography>
                    <p
                        className={`font-montserrat font-bold ${
                            task.state === "not_started"
                                ? "text-gray-500"
                                : task.state === "in_progress"
                                ? "text-amber-500"
                                : "text-gray-900"
                        }`}
                    >
                        {task.state
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </p>

                    <p
                        className={`font-montserrat font-bold ${
                            task.priority === "high"
                                ? "text-red-500"
                                : task.priority === "medium"
                                ? "text-yellow-500"
                                : "text-green-500"
                        }`}
                    >
                        {task.priority.charAt(0).toUpperCase() +
                            task.priority.slice(1)}
                    </p>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1 font-montserrat"
                    >
                        <span>Close</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

export default Task;
