import  {lazy} from "react";
import {createHashRouter, Navigate} from "react-router-dom";
import Main from '../App.tsx'
const About = lazy(() => import('@/views/about/index.tsx'));
const Error =lazy(() => import('@/views/Error.tsx'));
const Login  = lazy(() => import("@/views/Login"));



// 获取路由
const route = createHashRouter([
  {
    path: '/',
    element: <Main/>,
    errorElement:<Error/>,
    children:[
      {
        path:'/about',
        element:<About/>
      },
      {
        path:'*',
        element:<Navigate to='/' replace={true}/>
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  }
]);
export default route
