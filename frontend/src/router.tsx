import { Navigate, createBrowserRouter } from "react-router";
import { AppShell } from "./layouts/AppShell";
import { RecordsPage } from "./pages/RecordsPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage/index";
import { RegisterPage } from "./pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "records", element: <RecordsPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
  {
    path: "/login",
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: "/register",
    children: [{ index: true, element: <RegisterPage /> }],
  },
]);
