import { Spin } from "antd";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const Login = lazy(() => import("../pages/login"));

const Layout = lazy(() => import("../pages/layout"));
const ConditionRender = lazy(() => import("../pages/base-data/default/condition-render"));
const EventBinding = lazy(() => import("../pages/base-data/default/event-binding"));
const HooksUseState = lazy(() => import("../pages/base-data/default/hooks-usestate"));
const HooksUseRef = lazy(() => import("../pages/base-data/default/hooks-useref"));
const HooksUseReducer = lazy(() => import("../pages/base-data/default/hooks-reducer"));
const HooksUseEffect = lazy(() => import("../pages/base-data/default/hooks-useEffect"));
const FatherToSon = lazy(() => import("../pages/base-data/component-pass-value/father-to-son"));
const SonToFather = lazy(() => import("../pages/base-data/component-pass-value/son-to-father"));
const ContextPassValue = lazy(() => import("../pages/base-data/component-pass-value/context-pass-value"));
const Books = lazy(() => import("../pages/base-data/component-pass-value/redux/books"));
const UseMemo = lazy(() => import("../pages/optimize-performance/use-memo"));
const UseCallback = lazy(() => import("../pages/optimize-performance/use-callback"));
const ReactMemo = lazy(() => import("../pages/optimize-performance/react-memo"));
const HooksForwardRef = lazy(() => import("../pages/base-data/default/forward-ref"));
const RouterDefault = lazy(() => import("../pages/base-data/router-introduce/router-default"));
const RouterPassValue = lazy(() => import("../pages/base-data/router-introduce/router-pass-value"));
const KanBan = lazy(() => import("../pages/kanban"));

function lazySuspense(reactNode: React.ReactNode) {
  return <Suspense fallback={<Spin />}>{reactNode}</Suspense>;
}

const router = createBrowserRouter([
  /**
   * fallback 是React的Suspense组件的一个属性，用于指定在等待懒加载组件加载期间显示的备用UI
   * 在以下场景中发挥作用：
   * 1. 组件懒加载时的加载状态：当使用React.lazy动态导入组件时，
   *    从开始加载到组件完全渲染之间需要一定时间，fallback会在此期间显示;
   * 2. 异步数据加载时的加载状态：如果组件内部有异步数据请求（如从API获取数据），
   *    在数据加载完成之前，fallback也可以用来显示加载状态;
   * 3. 改善用户体验：防止页面出现空白，让用户知道内容正在加载中.
   */
  {
    path: "/",
    element: lazySuspense(<Login />),
  },
  {
    path: "/login",
    element: lazySuspense(<Login />),
  },

  {
    path: "/kanban",
    element: lazySuspense(<KanBan />),
  },
  {
    path: "/layout",
    element: lazySuspense(<Layout />),
    children: [
      // 跳转到默认组件，且浏览器显示路径
      { index: true, element: <Navigate to="condition-render" replace /> },
      { path: "condition-render", element: lazySuspense(<ConditionRender />) },
      { path: "event-binding", element: lazySuspense(<EventBinding />) },
      { path: "hooks-usestate", element: lazySuspense(<HooksUseState />) },
      { path: "hooks-useref", element: lazySuspense(<HooksUseRef />) },
      { path: "hooks-usereducer", element: lazySuspense(<HooksUseReducer />) },
      { path: "hooks-useeffect", element: lazySuspense(<HooksUseEffect />) },
      { path: "hooks-forward-ref", element: lazySuspense(<HooksForwardRef />) },
      { path: "father-to-son", element: lazySuspense(<FatherToSon />) },
      { path: "son-to-father", element: lazySuspense(<SonToFather />) },
      {
        path: "context-pass-value",
        element: lazySuspense(<ContextPassValue />),
      },
      { path: "redux-books", element: lazySuspense(<Books />) },
      { path: "router-default", element: lazySuspense(<RouterDefault />) },
      { path: "router-pass-value", element: lazySuspense(<RouterPassValue />) },
      { path: "use-memo", element: lazySuspense(<UseMemo />) },
      { path: "use-callback", element: lazySuspense(<UseCallback />) },
      { path: "react-memo", element: lazySuspense(<ReactMemo />) },
      // {
      //     path: "hooks", element: <Suspense fallback={<div>Loading...</div>}><Hooks /></Suspense>,
      //     children: [
      //         { path: "hooks-usestate", element: <Suspense fallback={<div>Loading...</div>}><HooksUseState /></Suspense> },
      //         { path: "hooks-useref", element: <Suspense fallback={<div>Loading...</div>}><HooksUseRef /></Suspense> },
      //     ]
      // },
      { path: "**", element: <div>404</div> },
    ],
  },
  // { path: "/condition-render", element: <Suspense fallback={<div>Loading...</div>}><ConditionRender /></Suspense> },
]);

export default router;
