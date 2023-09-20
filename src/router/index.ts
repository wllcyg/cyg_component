import { createWebHashHistory, createRouter,RouteRecordRaw  } from 'vue-router'
// 定义路由配置类型
import Layout from '@/layout/index.vue'
const routes:Array<RouteRecordRaw > = [
    {
        path: '/',
        redirect: '/home',
        component: Layout,
        children:[
            {
                path:'home',
                component:() => import('@/views/dashboard/dashboard.vue'),
                name:'Dashboard',
            }
        ]
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router