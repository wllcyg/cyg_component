import {Card, Form, Input, Button} from "antd";
import HooksForm from "@/views/example/form/hooksform";

const onFinish = (values: any) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const FormEx = () => {

  return (
    <div>
      <Card title='基础表单'>
        <Form
          name='formEx'
          labelCol={{span: 2}}
          wrapperCol={{span: 6}}
          autoComplete='off'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label='用户名称:' name='username'>
            <Input/>
          </Form.Item>
          <Form.Item label='密码:' name='password'
                     rules={[{required: true, message: '请输入密码!'}]}>
            <Input.Password/>
          </Form.Item>
          <Form.Item wrapperCol={{offset: 2, span: 4}}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title='Hooks表单' style={{marginTop:'12px'}}>
        <HooksForm/>
      </Card>
    </div>
  );
};

export default FormEx;
