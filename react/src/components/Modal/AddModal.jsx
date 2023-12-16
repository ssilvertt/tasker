import {
    Button,
    Input,
    Option,
    Select,
    Textarea,
} from "@material-tailwind/react";
import { React, useState } from "react";

function AddTaskModal({ isOpen, onClose, onSave }) {
    const [taskState, setTaskState] = useState({
        title: "",
        description: "",
        priority: "low",
        state: "not_started",
    });

    const handleSave = () => {
        onSave(taskState);
        onClose();
        setTaskState({
            title: "",
            description: "",
            priority: "low",
            state: "not_started",
        });
    };

    return (
        <div
        className={`fixed inset-0 flex items-center justify-end z-50 transition-all duration-500 ease-in-out transform h-screen ${
            isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        >
            <div className="bg-white rounded shadow-lg w-full md:w-1/3 h-full overflow-auto p-4">
                <h2 className="text-lg font-semibold mb-4">Add Task</h2>
                <div className="mb-4">
                    <Input
                        color="amber"
                        variant="static"
                        label="Title"
                        value={taskState.title}
                        onChange={(e) => {
                            setTaskState({
                                ...taskState,
                                title: e.target.value,
                            });
                        }}
                        placeholder="Task title"
                        className=""
                    />
                </div>

                <div className="mt-6">
                    <Textarea
                        color="amber"
                        variant="static"
                        label="Description"
                        placeholder="Description"
                        value={taskState.description}
                        onChange={(e) =>
                            setTaskState({
                                ...taskState,
                                description: e.target.value,
                            })
                        }
                        className=""
                    />
                </div>

                <div className="my-4">
                    <Select
                        color="amber"
                        label="Priority"
                        variant="static"
                        value={taskState.priority}
                        onChange={(value) =>
                            setTaskState({
                                ...taskState,
                                priority: value,
                            })
                        }
                        className="mb-4"
                    >
                        <Option value="low">Low</Option>
                        <Option value="medium">Medium</Option>
                        <Option value="high">High</Option>
                    </Select>
                </div>

                <div className="my-6">
                    <Select
                        color="amber"
                        label="State"
                        variant="static"
                        value={taskState.state}
                        onChange={(value) =>
                            setTaskState({
                                ...taskState,
                                state: value,
                            })
                        }
                        className="mb-4"
                    >
                        <Option value="not_started">Not started</Option>
                        <Option value="in_progress">In progress</Option>
                        <Option value="done">Done</Option>
                    </Select>
                </div>

                <Button
                    color="amber"
                    onClick={handleSave}
                    className="font-montserrat mr-2"
                >
                    Save
                </Button>
                <Button
                    color="gray"
                    onClick={onClose}
                    className="font-montserrat px-5"
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default AddTaskModal;
