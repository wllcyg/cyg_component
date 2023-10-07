import {Upload, message} from "antd";
import type {RcFile} from 'antd/es/upload/interface';
import {UploadOutlined} from '@ant-design/icons';
import {Card, Button,Divider} from 'antd';
import type {UploadProps} from 'antd';
const HeadCrop = () => {
  let imageData:HTMLImageElement | undefined= undefined
  // 获取canvas
  const props: UploadProps = {
    showUploadList:false,
    beforeUpload(file: RcFile) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
        return false
      }
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.addEventListener('load', () =>{
        const img = new Image()
        img.src = reader.result as string
        imageData = img

      });
      return false
    }
  };

  return (
    <Card>
      <div className='flex justify-center items-center'>
        <div className='flex items-center mr-32'>
          <Upload {...props}>
            <Button className='mr-10' icon={<UploadOutlined/>}>选择图片</Button>
          </Upload>
          <div className='border-current border-2 border-dashed'>

          </div>
        </div>
        <Divider type='vertical'/>
        <img className='w-48 h-48 rounded-full' />
      </div>
    </Card>
  );
};

export default HeadCrop;
