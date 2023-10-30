import {ColumnsType} from "antd/es/table";
import {Button, Table,Form} from "antd";
import {editTable} from "@/api/example.ts";
import React, {useEffect, useState} from "react";
import {useImmer} from "use-immer";

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    editable:true
  },
  {
    title: '域名',
    dataIndex: 'domain',
    key: 'domain',
    align: 'center',
    editable:true
  },
  {
    title: '地区',
    dataIndex: 'area',
    key: 'area',
    align: 'center',
    editable:true
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
    editable:true
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
const EditTable = () => {
  const [tableData, setTableData] = useState()
  const [pagination, setPagination] = useImmer({
    current: 1,
    pageSize: 10,
    total: 0
  })
  const getListData = async () => {
    const {current, pageSize} = pagination
    const res = await editTable({current, pageSize})
    setTableData(res.list)

  }
  useEffect(() => {
    getListData()
  }, [pagination]);
  const EditableCell = (obj) =>{
    console.log(obj)
    return (
      <td>
        test
      </td>
    )
  }
  const components = {
    body:{
      cell:EditableCell
    }
  }
  const mergedColums = columns.map(col => {
    if (!col.editable){
      return col
    }
    console.log(col,'111')
    return {
      ...col,
      onCell:records => ({
        records,
        inputType:col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex:col.dataIndex,
        title:col.title,
      })
    }
  })
  return (
    <div>
      <Table columns={mergedColums} components={components} dataSource={tableData}
             pagination={false}>
      </Table>
    </div>
  );
};

export default EditTable;
