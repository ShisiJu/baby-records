import { Navigate, createBrowserRouter } from "react-router-dom";
import { AppShell } from "./layouts/AppShell";
import { DashboardPage } from "./pages/DashboardPage";
import { RecordsPage } from "./pages/RecordsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "records", element: <RecordsPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
