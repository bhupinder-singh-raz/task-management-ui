import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthPage from "../pages/Auth/AuthPage";
import { TaskPage } from "../pages/Task";

export const routes = createBrowserRouter([
  { path: "/", element: <Navigate to="/signup" replace /> },
  { path: "/signin", element: <AuthPage /> },
  { path: "/signup", element: <AuthPage /> },
  { path: "/task", element: <TaskPage /> },
  { path: '*', element: <Navigate to="/signup" replace /> }
]);