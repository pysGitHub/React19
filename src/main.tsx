import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './css/global.scss'  // 引入全局CSS样式文件

// import App from './App.tsx'

import router from './router/index.tsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)