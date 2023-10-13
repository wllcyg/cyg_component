import axios from "axios";
import {ReactNode, useEffect, useState} from "react";

interface PropsIna {
  url: string,
  config?: object,
  loadingComponent?: null | ReactNode,
  errorComponent?: null | ReactNode,
  enptyComponent?: null | ReactNode,
  dataOperator?:(data:object) => void,
  children: (data: any) => ReactNode
}

const Get = ({url, children, errorComponent, loadingComponent, config, enptyComponent,dataOperator}: PropsIna) => {
  const [showComponent, setShowComponent] = useState<ReactNode>()
  const getResult = async () => {
    try {
      setShowComponent(loadingComponent)
      const res = await axios('http://localhost:8081' + url)
      if (!res.data) {
        setShowComponent(enptyComponent)
      } else {
        let _data = null
        if (dataOperator){
          _data = dataOperator(res.data)
        }else {
          _data = res.data
        }
        setShowComponent(children(_data))
      }
    } catch (e) {
      setShowComponent(errorComponent)
      throw  e
    }
  }
  useEffect(() => {
    getResult()
  }, [config]);

  return (
    <>
      {
        showComponent
      }
    </>
  )
};

export default Get;
