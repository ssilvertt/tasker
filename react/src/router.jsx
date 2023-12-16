import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Profile from "./views/Profile";
import Dashboard from "./views/Dashboard";
import { Navigate } from "react-router-dom";
import Tasks from "./views/Tasks";
import Settings from './views/Settings'
import EditProfile from './views/EditProfile';
import TaskTable from './views/TaskTable';
const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/profile" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path:'/tasks',
                element:<Tasks/>
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/edit/profile",
                element: <EditProfile/>,
            },
            {
                path:'/settings',
                element:<Settings/>
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },

    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
