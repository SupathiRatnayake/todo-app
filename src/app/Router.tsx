import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TodosPage from "../pages/TodosPage";
import Layout from "../shared/components/Layout";
import ProfilePage from "../pages/ProfilePage";
import UserCard from "../features/auth/components/UserCard";
import UserForm from "../features/auth/components/UserForm";
import TodoFormPage from "../pages/TodoFormPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />
	},
    { 
        path: "/app",
        element: <Layout />,
        children: [
            { 
                path: "todos", 
                children: [
                    { index: true, element: <TodosPage />},
                    { path: "create", element: <TodoFormPage />},
                    { path: ":id/edit", element: <TodoFormPage />},
                ],

            },	// todo protect
            { 
                path: "profile", 
                element: <ProfilePage />,
                children: [
                    { index: true, element: <UserCard /> },
                    { path: "create", element: <UserForm /> },
                ], 
            },	// todo protect
        ]
    },
]);

export default router;