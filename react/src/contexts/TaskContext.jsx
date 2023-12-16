// TaskContext.js
import React, { createContext, useEffect, useReducer } from "react";
import axiosInstance from "../axios-instance";

const TaskContext = createContext();

const taskReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_TASKS":
            return action.payload;
        case "ADD_TASK":
            return [...state, action.payload];
        case "EDIT_TASK":
            return state.map((task) =>
                task.id === action.payload.id
                    ? { ...task, ...action.payload }
                    : task
            );
        case "DELETE_TASK":
            return state.filter((task) => task.id !== action.payload);
        case "UPDATE_TASK":
            return state.map((task) =>
                task.id === action.payload.id
                    ? { ...task, state: action.payload.state }
                    : task
            );

        default:
            return state;
    }
};

export const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, []);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                };

                const res = await axiosInstance.get(
                    "http://localhost:8000/api/tasks",
                    config
                );

                const tasks = res.data;

                dispatch({
                    type: "LOAD_TASKS",
                    payload: tasks,
                });
            } catch (err) {
                console.log(err);
            }
        };

        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;
