import {IndexWrapper} from "@/views/example/table/style.ts";
import {Card, Table, Button, Tabs} from "antd";
import Http from '@/request/index.tsx'
import type {ColumnsType} from 'antd/es/table'
import {useState} from "react";
import EditTable from "@/views/example/table/EditTable.tsx";
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
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    render: () => {
      return (
        <div>
          <Button type='primary'>编辑</Button>
        </div>
      )
    }
  }
]

const TableList = () => {
  const [pageObj, setPageObj] = useState({current: 1, pageSize: 10})
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
      // @ts-ignore
      disabled: record.key === 1, // Column configuration not to be checked
      name: record.name,
    }),
  };
  const BaseTable = <Http.HttpCom
    url='/api/list'
    config={{...pageObj}}
  >
    {
      (data) => {
        return (
          <Table rowSelection={{
            type: selectionType,
            ...rowSelection,
          }} bordered scroll={{x: '100%', y: 600}} columns={columns} dataSource={data.list}
                 pagination={{
                   showSizeChanger: true,
                   pageSizeOptions: [10, 30, 60],
                   size: 'small', total: data.list.length, showTotal: (e) => {
                     return `共有${e}页`
                   },
                   onChange: (current, pageSize) => {
                     setPageObj({...pageObj, current, pageSize})
                   }
                 }}/>
        )
      }
    }
  </Http.HttpCom>
  return (
    <IndexWrapper>
      <Card>
        <Tabs defaultActiveKey='1'
              items={[
                {label: '基础表格', key: '1',children:BaseTable},
                {label: '可编辑表格',key:'2',children: <EditTable/>}
              ]}>
        </Tabs>
      </Card>
    </IndexWrapper>
  );
};

export default TableList;
