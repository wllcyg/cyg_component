import './index.css'
import {lazy, Suspense} from "react";
import {Spin,ConfigProvider} from "antd";
import zhCN from 'antd/locale/zh_CN'
const MainApp = lazy(() => import('@/main/index.tsx'))
function App() {

  return (
    <>
      {/*//此处定义主题内容*/}
      <ConfigProvider locale={zhCN}>
        <Suspense fallback={<Spin  size="large" className="flex items-center justify-center w-full h-screen" />}>
          <MainApp/>
        </Suspense>
      </ConfigProvider>
    </>
  )
}

export default App
