import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import './css/global.scss'  // 引入全局CSS样式文件

// import App from './App.tsx'

import router from './router/index.tsx'
import { RouterProvider } from 'react-router-dom'
import { store } from './store/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,

  // <RouterProvider router={router} />

  /*
  StrictMode 是 React 提供的一个开发工具，
  用于突出显示潜在问题并帮助开发者编写更健壮的代码。

  作用和意义：
  用于突出显示应用程序中潜在问题的工具。
  它不会渲染任何可见的 UI，只是为其后代元素执行额外的检查和警告。
  这些检查只在开发模式下运行，不会影响生产构建。

  主要功能包括：
  1.识别不安全的生命周期方法;
  2.验证组件是否符合推荐写法;
  3.检测副作用;
  4.检测过时的 ref 用法;
  5.检查过时的 context API 用法。
  */
)