import { Card, CardHeader, Typography } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import Chart from "react-apexcharts";
import TaskList from "../components/Lists/TaskList";
import TaskListItemStart from "../components/Lists/TaskListItemStart";
import AddTaskModal from "../components/Modal/AddModal";
import TaskContext from "../contexts/TaskContext";
import { filterTasksByPriority, getMessage } from "../utils.js";
import TaskTable from "./TaskTable";
export default function Dashboard() {
    const { state } = useContext(TaskContext);
    const sortTasks = (a, b) => {
        const priorityOrder = ["high", "medium", "low"];
        return (
            priorityOrder.indexOf(a.priority) -
            priorityOrder.indexOf(b.priority)
        );
    };

    const [note, setNote] = useState("");

    const handleSaveNote = () => {
        // Здесь вы можете добавить код для сохранения заметки
        console.log(note);
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

    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const sortedTasks = [...state].sort(sortTasks);
    const highPriorityTasks = filterTasksByPriority(state, "high").filter(
        (task) => task.state === "in_progress"
    );
    const mediumPriorityTasks = filterTasksByPriority(state, "medium").filter(
        (task) => task.state === "in_progress"
    );
    const lowPriorityTasks = filterTasksByPriority(state, "low").filter(
        (task) => task.state === "in_progress"
    );
    const startedTasksCount = state.filter(
        (task) => task.state === "in_progress"
    ).length;
    const notStartedTasksCount = state.filter(
        (task) => task.state === "not_started"
    ).length;
    const doneTasksCount = state.filter((task) => task.state === "done").length;

    const chartConfig = {
        type: "pie",
        width: 220,
        height: 220,
        series: [startedTasksCount, notStartedTasksCount, doneTasksCount],
        options: {
            labels: ["Started tasks", "Not started tasks", "Done tasks"],
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: "",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#ffc107", "#212121", "#4dd0e1"],
            legend: {
                show: false,
            },
        },
    };
    const tasksInProgress = [
        ...highPriorityTasks,
        ...mediumPriorityTasks,
        ...lowPriorityTasks,
    ];

    const notStartedTasks = [
        ...filterTasksByPriority(state, "high"),
        ...filterTasksByPriority(state, "medium"),
        ...filterTasksByPriority(state, "low"),
    ].filter((task) => task.state === "not_started");

    return (
        <div>
            <div className="flex flex-col lg:flex-row">
                <div className="order-1 lg:order-1 flex-grow">
                    <div className="flex flex-row lg:flex-grow">
                        <Card className="overflow-auto border-[1px] border-gray-300 w-min lg:w-full shadow-lg p-3 m-3">
                            <Typography
                                component="div"
                                className="font-montserrat pl-6 pt-2 font-semibold text-xs lg:text-xl text-gray-900"
                            >
                                {getMessage(
                                    highPriorityTasks,
                                    mediumPriorityTasks,
                                    lowPriorityTasks
                                )}
                            </Typography>
                            <TaskList tasks={tasksInProgress} />
                        </Card>
                    </div>
                    <div>
                        <Card className="overflow-auto border-[1px] border-gray-300 mt-4 p-3 m-3 shadow-lg">
                            <Typography
                                component="div"
                                className="font-montserrat pl-6 pt-2 font-semibold text-xs lg:text-xl text-gray-900"
                            >
                                Or maybe we can start working on a new one?
                            </Typography>
                            {notStartedTasks.length > 0 ? (
                                <TaskList
                                    tasks={notStartedTasks}
                                    ListItemComponent={TaskListItemStart}
                                />
                            ) : (
                                <Typography
                                    variant="paragraph"
                                    component="div"
                                    className="font-montserrat pl-6 pt-2 underline cursor-pointer font-semibold"
                                    onClick={() => setAddModalOpen(true)}
                                >
                                    No unstarted tasks.. Why not create a new
                                    one?
                                </Typography>
                            )}
                        </Card>
                    </div>
                </div>
                <div className="order-2 lg:order-2 flex-grow lg:mt-auto lg:mb-auto">
                    <div className="flex flex-col lg:flex-grow pl-[12px]">
                        <Card className="border-[1px] border-gray-300 shadow-lg flex w-min lg:w-full lg:py-[80px]">
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col lg:flex-row lg:items-center gap-4 rounded-none"
                            >
                                <div className="w-full lg:w-1/2">
                                    <Chart {...chartConfig} />
                                </div>
                                <div className="w-full lg:w-1/2 text-lg lg:text-2xl">
                                    <Typography
                                        component="div"
                                        className="font-montserrat pt-2 font-semibold 
                                        text-gray-900 text-xs lg:text-xl "
                                    >
                                        Your tasks in statistics
                                    </Typography>
                                    <Typography
                                        component="div"
                                        className="max-w-sm font-normal text-gray-900 text-xs lg:text-xl "
                                    >
                                        Here you can see stats of all of your
                                        tasks in simple chart
                                    </Typography>
                                    <Typography
                                        component="div"
                                        className="font-montserrat pt-2 font-semibold text-gray-900 text-xs lg:text-xl "
                                    >
                                        Tasks, you are working on:{" "}
                                        {startedTasksCount}
                                    </Typography>
                                    <Typography
                                        component="div"
                                        className="font-montserrat pt-2 font-semibold text-gray-900 text-xs lg:text-xl "
                                    >
                                        Tasks, you didn't start yet:{" "}
                                        {notStartedTasksCount}
                                    </Typography>
                                    <Typography
                                        component="div"
                                        className="font-montserrat pt-2 font-semibold text-gray-900 text-xs lg:text-xl "
                                    >
                                        Tasks, you've done: {doneTasksCount}
                                    </Typography>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="order-3 lg:order-3 w-full p-3 flex"></div>
            <div className="order-4 lg:order-4 w-full hidden lg:block border-[0px]">
                <TaskTable lassName="order-4 lg:order-4 w-full hidden lg:block" />
            </div>

            <AddTaskModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                onSave={handleSave}
            />
        </div>
    );
}
