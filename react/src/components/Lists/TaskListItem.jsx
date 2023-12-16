import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    ListItem,
    ListItemSuffix,
    Typography,
} from "@material-tailwind/react";
import { React, useContext, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCheck } from "react-icons/ai";
import axiosInstance from "../../axios-instance";
import TaskContext from "../../contexts/TaskContext";

export default function TaskListItem({ task }) {
    const [open, setOpen] = useState(false);
    const { dispatch } = useContext(TaskContext);
    const handleOpen = () => {
        setOpen(!open);
    };

    const completeTask = (taskId) => {
        const stateChange = async () => {
            await axiosInstance.put(
                `http://localhost:8000/api/tasks/${taskId}`,
                { state: "done" }
            );
            dispatch({
                type: "UPDATE_TASK",
                payload: { id: taskId, state: "done" },
            });
        };

        toast.promise(stateChange(), {
            loading: "Completing task...",
            success: "Task completed",
            error: "Error when completing task",
        });
    };

    return (
        <ListItem
        ripple={false}
        className="py-1 pr-1 pl-4 whitespace-normal"
        onClick={handleOpen}
    >
            {task.title}
            <ListItemSuffix>
                <IconButton
                    variant="text"
                    color="blue-gray"
                    onClick={(e) => {
                        e.stopPropagation();
                        completeTask(task.id);
                    }}
                >
                    <AiOutlineCheck className="h-5 w-5" />
                </IconButton>
            </ListItemSuffix>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className='font-montserrat '>{task.title}</DialogHeader>
                <DialogBody>
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
                    <Button
                    className='font-montserrat'
                        variant="gradient"
                        color="green"
                        onClick={() => completeTask(task.id)}
                    >
                        <span>Complete Task</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </ListItem>
    );
}
