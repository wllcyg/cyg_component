import {Button, Table, Form, Input} from "antd";
import {editTable} from "@/api/example.ts";
import React, {useEffect, useState} from "react";
import {useImmer} from "use-immer";
import {InputNumber} from "antd/lib";
import {data} from "autoprefixer";


const EditTable = () => {
  const [tableData, setTableData] = useState()
  const [pagination, setPagination] = useImmer({
    current: 1,
    pageSize: 10,
    total: 0
  })
  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState()
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({name:'',domain:'',area:'',age:'',...record})
    setEditingKey(record.key)
  }
  const save = async (key) => {
    try {
      const row = await form.validateFields() // 获取到最新的file值
      const newData = [...tableData]
      const index = newData.findIndex(item => key === item.key)
      if (index >-1){
        const item = newData[index]
        newData.splice(index,1,{
          ...item,...row
        })
      }else {
        newData.push(row)
      }
      setTableData(newData)
      setEditingKey('')
    }catch (err){
      console.log(err)
    }
  }
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
      render: (_:any,record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
           <Button onClick={() => save(record.key)}>保存</Button>
           <Button onClick={() => setEditingKey('')}>取消</Button>
          </span>
        ) : (<Button disabled={editingKey !== ''} onClick={()=> edit(record)}>编辑</Button>)
      }
    }
  ]
  const getListData = async () => {
    const {current, pageSize} = pagination
    const res = await editTable({current, pageSize})
    setTableData(res.list)
  }
  useEffect(() => {
    getListData()
  }, [pagination]);
  const EditableCell = ({editing,dataIndex,title,inputType,record,index,children,...restPropos}) =>{
    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>
    return (
      <td {...restPropos}>
        {
          editing ? (
            <Form.Item name={dataIndex}>
            {inputNode}
          </Form.Item>) : (children)
        }
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
    return {
      ...col,
      onCell:records => ({
        records,
        inputType:col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex:col.dataIndex,
        title:col.title,
        editing: isEditing(records),
      })
    }
  })
  return (
    <div>
      <Form form={form} component={false}>
        <Table columns={mergedColums} components={components} dataSource={tableData}
               pagination={false}>
        </Table>
      </Form>
    </div>
  );
};

export default EditTable;
