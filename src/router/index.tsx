import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import BasePage from "../pages/Base";

const Login = lazy(() => import("../pages/lgoin"));
const ConditionRenderPage = lazy(() => import("../pages/Base/condition-render"));
const EventBindingPage = lazy(() => import("../pages/Base/event-binding"));
const HooksPage = lazy(() => import("../pages/Base/hooks"));
const HooksUseStatePage = lazy(() => import("../pages/Base/hooks/system-hooks/hooks-usestate"));
const HooksUseRefPage = lazy(() => import("../pages/Base/hooks/system-hooks/hooks-useref"));



const router = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense>,
    },

    {
        path: "/base",
        element: <Suspense fallback={<div>Loading...</div>}><BasePage /></Suspense>,
        children: [
            // 跳转到默认组件，且浏览器显示路径
            { index: true, element: <Navigate to="condition-render" replace /> },
            { path: "condition-render", element: <Suspense fallback={<div>Loading...</div>}><ConditionRenderPage /></Suspense> },
            { path: "event-binding", element: <Suspense fallback={<div>Loading...</div>}><EventBindingPage /></Suspense> },
            {
                path: "hooks", element: <Suspense fallback={<div>Loading...</div>}><HooksPage /></Suspense>,
                children: [
                    { path: "hooks-usestate", element: <Suspense fallback={<div>Loading...</div>}><HooksUseStatePage /></Suspense> },
                    { path: "hooks-useref", element: <Suspense fallback={<div>Loading...</div>}><HooksUseRefPage /></Suspense> },
                ]
            },
            { path: "**", element: <div>404</div> },
        ],
    }

]);


export default router;