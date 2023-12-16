import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import TaskContext from "../contexts/TaskContext";

export default function TaskTable() {
    const { state } = useContext(TaskContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);

    let filteredTasks = state.filter(
        (task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.state.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortField) {
        filteredTasks.sort((a, b) => {
            if (a[sortField] < b[sortField]) {
                return sortDirection === "asc" ? -1 : 1;
            }
            if (a[sortField] > b[sortField]) {
                return sortDirection === "asc" ? 1 : -1;
            }
            return 0;
        });
    }

    const handleSort = (field) => {
        setSortField(field);
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    };

    return (
        <div className="overflow-auto   p-3 m-3 whitespace-normal w-min lg:w-full ">
            <Card className="h-full p-10 w-min lg:w-full whitespace-normal">
                <Typography type="h3">All your tasks:</Typography>
                <div className="flex justify-between">
                    <div className="flex flex-row items-end whitespace-normal">
                        <Input
                            variant="static"
                            className="w-[200px]"
                            
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row items-end space-x-2 whitespace-normal">
                        <Button
                            color="amber"
                            onClick={() => handleSort("state")}
                            size="sm"
                        >
                            Sort by State
                        </Button>
                        <Button
                            color="gray"
                            onClick={() => handleSort("priority")}
                            size="sm"
                        >
                            Sort by Priority
                        </Button>
                    </div>
                </div>
                <table className="w-full min-w-max table-auto text-left whitespace-normal">
                    <thead>
                        <tr>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 whitespace-normal">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70 whitespace-normal"
                                >
                                    Title
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Priority
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    State
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map((task) => (
                            <tr
                                key={task.id}
                                className="even:bg-blue-gray-50/50"
                            >
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {task.title}
                                    </Typography>
                                </td>
                                <td
                                    className={`p-4 ${
                                        task.priority === "high"
                                            ? "text-red-500"
                                            : task.priority === "medium"
                                            ? "text-yellow-500"
                                            : "text-green-500"
                                    }`}
                                >
                                    <Typography
                                        variant="small"
                                        className="font-normal"
                                    >
                                        {task.priority.charAt(0).toUpperCase() +
                                            task.priority.slice(1)}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {task.state === "not_started"
                                            ? "Not started"
                                            : task.state === "in_progress"
                                            ? "In progress"
                                            : "Done"}
                                    </Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
