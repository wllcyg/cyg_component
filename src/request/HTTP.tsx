/**
 * @desc 适用于获取数据的组件
 * */
import {ReactNode, useEffect, useState} from "react";
import {Result, Spin} from "antd";
import {tableList} from "@/api/example.ts";
interface PropsIna {
  url: string,
  config?: object,
  errorComponent?: null | ReactNode,
  enptyComponent?: null | ReactNode,
  dataOperator?:(data:object) => void,
  columOption?:(data:object) => void,
  children: (data: any) => ReactNode,
}
const defaultErr = <Result status='warning' title='暂无数据'/>
const HttpCom = ({url, children, errorComponent, config, enptyComponent,dataOperator,}: PropsIna) => {
  const [showComponent, setShowComponent] = useState<ReactNode>()
  const [loadingState, setLoadingState] = useState(false)
  // 保存表格数据
  const [tableData, setTableData] = useState(null)
  const getResult = async () => {
    try {
      setLoadingState(true)
      const res = await tableList({url,method:'get',params:config})
      if (!res) {
        setShowComponent(enptyComponent ? enptyComponent : defaultErr)
      } else {
        if (dataOperator){
          // @ts-ignore
          setTableData(dataOperator(res))
        }else {
          // @ts-ignore
          setTableData(res)
        }
        setShowComponent(children(res))
      }
      setLoadingState(false)
    } catch (e) {
      setLoadingState(false)
      setShowComponent(errorComponent ? errorComponent : defaultErr)
      throw  e
    }
  }
  useEffect(() => {
    getResult()
  }, [config]);
  return (
    <>
      <Spin className='loading-wrapper' spinning={loadingState}>
        {
          showComponent
        }
      </Spin>
    </>
  )
};

export default HttpCom;
