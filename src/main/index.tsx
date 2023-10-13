import React, {ReactElement, Suspense, useEffect, useState} from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, theme, Spin} from 'antd';
import {Outlet, useNavigate,useLocation} from "react-router-dom";
import type {MenuProps } from 'antd'
const { Header, Sider, Content } = Layout;
import { routes } from '@/router'
type RouteType = {
  path:string;
  label:string;
  children?: RouteType[] | null | undefined;
  element?:ReactElement | null | undefined;
}
const MainApp: React.FC = () => {
  const Navigate = useNavigate()
  const { pathname } = useLocation()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // 路由跳转
  const getItems = (children:RouteType[]): { key: string; label: string; }[]=> {
      return children.map(e =>{
        const { path,label,children } = e
        return {
          key:path,
          label,
          children:children ? getItems(children) :null,
          icon:<MenuUnfoldOutlined/>
        }
      })
  }
  const routeMap = routes[0].children.filter(e=>e.path !== '*')
  const HomePath = routes[0].redirect
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const menu = getItems(routeMap)
  useEffect(() => {
    if (pathname === '/'){
      Navigate(HomePath)
    }
  },[pathname,Navigate,HomePath])
  const MenuItemClick:MenuProps['onClick'] = ({key}) =>{
    Navigate(key)
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathname === '/' ? HomePath :pathname]}
          onClick={MenuItemClick}
          items={menu}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            minHeight: 'calc(100vh - 112px)',
          }}
        >
          <Suspense fallback={<Spin size="large"  className={'h-full w-full flex justify-center items-center'} />}>
            <Outlet/>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainApp;
