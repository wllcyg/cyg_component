import './index.css'
import {lazy, Suspense} from "react";
import {Spin,ConfigProvider} from "antd";
import zhCN from 'antd/locale/zh_CN'
import store from "@/store";
import { Provider } from 'react-redux'
const MainApp = lazy(() => import('@/main/index.tsx'))
function App() {

  return (
    <>
      {/*//此处定义主题内容*/}
      <Provider store={store}>
        <ConfigProvider locale={zhCN}>
          <Suspense fallback={<Spin  size="large" className="flex items-center justify-center w-full h-screen" />}>
            <MainApp/>
          </Suspense>
        </ConfigProvider>
      </Provider>
    </>
  )
}

export default App
