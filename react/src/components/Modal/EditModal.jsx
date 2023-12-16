import {
    Button,
    Input,
    Option,
    Select,
    Textarea,
} from "@material-tailwind/react";
import { React, useState } from "react";

function EditTaskModal({ task, isOpen, onClose, onSave }) {
    const [taskState, setTaskState] = useState(task);

    const handleSave = () => {
        onSave(taskState.id, taskState);
        onClose();
    };

    return (
        <div
        className={`fixed inset-0 flex items-center justify-end z-50 transition-all duration-500 ease-in-out transform h-screen ${
            isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        >
            <div className="bg-white rounded shadow-lg w-full md:w-1/3 h-full overflow-auto p-4">
                <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
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
                        className='font-montserrat'
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
                        className="font-montserrat"
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

                <Button color="amber" onClick={handleSave} className='font-montserrat mr-2 justify-center'>
                    Save
                </Button>
                <Button color="gray" onClick={onClose} className='font-montserrat px-5'>
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default EditTaskModal;
