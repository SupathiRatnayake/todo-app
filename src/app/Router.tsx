import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TodosPage from "../pages/TodosPage";
import Layout from "../shared/components/Layout";
import ProfilePage from "../pages/ProfilePage";
import UserCard from "../features/auth/components/UserCard";
import UserForm from "../features/auth/components/UserForm";

const router = createBrowserRouter([
    { 
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "todos", element: <TodosPage /> },	//protect
            { 
                path: "profile", 
                element: <ProfilePage />,
                children: [
                    { index: true, element: <UserCard /> },
                    { path: "create", element: <UserForm /> },
                ], 
            },	//protect
        ]
    },
]);

export default router;