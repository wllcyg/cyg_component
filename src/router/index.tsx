import  {lazy} from "react";
import {createHashRouter, Navigate} from "react-router-dom";
import Main from '../App.tsx'
const About = lazy(() => import('@/views/about/index.tsx'));
const Error =lazy(() => import('@/views/Error.tsx'));
const HeadCrop =lazy(() => import('@/views/form/headcorp'));
const TableList =lazy(() => import('@/views/form/table'));
const TableChild =lazy(() => import('@/views/form/table/child'));
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
        path:'form',
        label:'组件',
        children:[
          {
            path:'/form/headcorp',
            label:'头像裁剪',
            element:<HeadCrop/>
          },
          {
            path:'/form/table',
            label:'合并',
            element:<TableList/>,
            children:[
              {
                path:'/form/table/col',
                label:'列合并',
                element:<TableChild/>
              }
            ]
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
