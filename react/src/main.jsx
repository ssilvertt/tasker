import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ContextProvider } from "./contexts/ContextProvider.jsx";
import { TaskProvider } from "./contexts/TaskContext.jsx";
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider>
            <ContextProvider>
                <TaskProvider>
                    <RouterProvider router={router} />
                </TaskProvider>
            </ContextProvider>
        </ThemeProvider>
    </React.StrictMode>
);
