import {IndexWrapper} from "@/views/example/table/style.ts";
import {Card, Table} from "antd";
import Http from '@/request/index.tsx'
import type {ColumnsType} from 'antd/es/table'
import {useState} from "react";

interface DataType {
  key: string,
  name: string,
  domain: string,
  area: string,
  age: number
}

const columns: ColumnsType<DataType> = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center'
  },
  {
    title: '域名',
    dataIndex: 'domain',
    key: 'domain',
    align: 'center'

  },
  {
    title: '地区',
    dataIndex: 'area',
    key: 'area',
    align: 'center'

  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    align: 'center'

  }
]
const TableList = () => {
  const styleObj = {
    size: 40,
  }
  const [pageObj, setPageObj] = useState({current: 1, pageSize: 10})

  return (
    <IndexWrapper size={styleObj.size}>
      <Card>
        <Http.HttpCom
          url='/api/list'
          config={{...pageObj}}
        >
          {
            (data) => {
              return (
                <Table columns={columns} dataSource={data.list}
                       pagination={{
                         showSizeChanger: true,
                         pageSizeOptions: [10, 30, 60],
                         size: 'small', total: 6, showTotal: (e) => {
                           return `共有${e}页`
                         },
                         onChange: (current, pageSize) => {
                           setPageObj({...pageObj,current,pageSize})
                         }
                       }}/>
              )
            }
          }
        </Http.HttpCom>
      </Card>
    </IndexWrapper>
  );
};

export default TableList;
