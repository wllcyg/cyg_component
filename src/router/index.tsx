import  {lazy} from "react";
import {createHashRouter, Navigate} from "react-router-dom";
import Main from '../App.tsx'
const About = lazy(() => import('@/views/about/index.tsx'));
const Error =lazy(() => import('@/views/Error.tsx'));
const HeadCrop =lazy(() => import('@/views/example/headcorp'));
const TableList =lazy(() => import('@/views/example/table'));
const Other =lazy(() => import('@/views/other'));
const DashBoard =lazy(() => import('@/views/dashboard'));

/**
 * 1. 实现路由结构,按照文件夹递归查抄
 * 2. 一级路由为第一级菜单,二级路由二级文件夹 三级路由为三级文件夹依次类推
 * 3. 文件夹名称是路由名称
 * 4. 每层文件下根目录index.tsx为组件入口
 *
 * */
const routes = [
  {
    path: '/',
    label:'首页',
    element: <Main/>,
    errorElement:<Error/>,
    redirect:'/dashboard',
    children:[
      {
        path:'/dashboard',
        label:'首页',
        element:<DashBoard/>
      },
      {
        path:'/about',
        label:'关于',
        element:<About/>
      },
      {
        path:'example',
        label:'组件例子',
        children:[
          {
            path:'/example/headcorp',
            label:'头像裁剪',
            element:<HeadCrop/>
          },
          {
            path:'/example/table',
            label:'表格',
            element:<TableList/>,
          },
        ]
      },
      {
        path:'/other',
        label:'其他',
        element:<Other/>
      },
      {
        path:'*',
        element:<Navigate to='/' replace={true}/>
      }
    ]
  },

]
// 获取路由
const route = createHashRouter(routes);
export {routes}
export default route
