/**
 * 主要使用name值可以为[]而使用的
 * */
import React, {useState} from "react";
import type { FormItemProps } from 'antd'
import {Form,Input,Button} from "antd";
const MyFormItemContext = React.createContext<(string | number)[]>([])
interface MyFormItemGrouProps {
  prefix:string | number | (string | number) [];
  children:React.ReactNode
}
function toArr(str: string | number | (string | number)[]): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}
const MyFormItemGroup = ({prefix,children}:MyFormItemGrouProps) => {
  const prefixPath = React.useContext(MyFormItemContext)
  const concatPath = React.useMemo(() => [...prefixPath,...toArr(prefix)],[prefixPath,prefix])
  return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>
}
const MyFormItem = ({name,...props}:FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext)
  const concatName = name !== undefined ? [...prefixPath,...toArr(name)] :undefined
  console.log(concatName,'11111111')
  return <Form.Item name={concatName} {...props} />;
}
const HooksForm = () => {
  const [input, setInput] = useState()

  const onFinish = (value: object) => {
    console.log(value,input);
  };
  return (
    <div>
      <Form name='form_item' layout='vertical' onFinish={onFinish}>
        <MyFormItemGroup prefix={['user']}>
          <MyFormItemGroup prefix={['name']}>
            <MyFormItem name="firstName" label="First Name">
              <Input />
            </MyFormItem>
            <MyFormItem name="lastName" label="Last Name">
              <Input />
            </MyFormItem>
          </MyFormItemGroup>

          <MyFormItem name="age" label="Age">
            <Input />
          </MyFormItem>
        </MyFormItemGroup>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form>
      <Input value={input}/>
    </div>
  );
};

export default HooksForm;
