// import { StrictMode } from 'react'
import "./index.css";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// routes
import Root from "./routes/Root.tsx";
import RouteHome from "./routes/RouteHome.tsx";
import RouteGame from "./routes/RouteGame.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <RouteHome />,
            },
            {
                path: "/home",
                element: <RouteHome />,
            },
            {
                path: "/game",
                element: <RouteGame />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    // <App />
    <RouterProvider router={router} />
    // </StrictMode>,
);
