import './index.css'
import {lazy, Suspense} from "react";
import {Spin} from "antd";
const MainApp = lazy(() => import('@/main/index.tsx'))
function App() {

  return (
    <>
      <Suspense fallback={<Spin  size="large" className="flex items-center justify-center w-full h-screen" />}>
        <MainApp/>
      </Suspense>
    </>
  )
}

export default App
