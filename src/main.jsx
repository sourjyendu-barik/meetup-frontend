import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Details from "./pages/Details.jsx";
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/detail/:id", element: <Details /> },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
