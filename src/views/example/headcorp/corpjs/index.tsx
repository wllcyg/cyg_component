import {useRef, useState} from "react";

import {Card, Button, Upload} from 'antd'
import {CorpWrapper} from "@/views/example/headcorp/corpjs/style.ts";
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import type {RcFile} from 'antd/es/upload/interface';
import {SaveImage} from "@/utils";
import {
  RotateLeftOutlined,
  RotateRightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined
} from '@ant-design/icons'
const CorpjsComponent = () => {
  const ImageRef = useRef(null)
  const [cropperinit, setCropperinit] = useState()
  const InitCorp = () => {
    if (ImageRef.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const Cropper =  new Cropper(ImageRef.current, {
        viewMode: 1,
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: [document.querySelector('.previewbox'), document.querySelector('.previewboxround')],
        autoCropArea: 0.6,
        rotatable: true,
      })
      setCropperinit(Cropper)
    }
  }
  const getImageUrl = () => {
    const url = cropperinit?.getCroppedCanvas().toDataURL('image/png') as string
    SaveImage(url, '头像.png')
  }
  const beforeUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.addEventListener('load', () => {
      if (ImageRef.current) {
        ImageRef.current.src = reader.result
        if (cropperinit){
          cropperinit.replace(reader.result as string)
        }else {
          InitCorp()
        }
      }
    });
    return false
  }
  const handleClick = (type: string) => {
    switch (type) {
      case 'RotateLeftOutlined':
        cropperinit?.rotate(-15)
        break;
      case 'RotateRightOutlined':
        cropperinit?.rotate(15)
        break;
      case 'ZoomInOutlined':
        cropperinit?.zoom(0.2)
        break;
      case  'ZoomOutOutlined':
        cropperinit?.zoom(-0.2)
        break;
      default:
        break;
    }
  }
  return (
    <CorpWrapper>
      <Card title='Corpjs版本'>
        <Upload showUploadList={false} beforeUpload={beforeUpload}>
          <Button className='mb-8' type='primary'>选择图片</Button>
        </Upload>
        <Button type='primary' onClick={getImageUrl} className='mt-6 ml-5'>保存头像</Button>
        <div className='flex gap-8'>
          <div className='imageContainer w-1/2'>
            <img className='image w-full h-full' ref={ImageRef}/>
          </div>
          <div className='flex preview flex-1 border border-solid items-center justify-around'>
            <div className="previewbox">
            </div>
            <div className="previewboxround rounded-full">
            </div>
          </div>
        </div>
        <div className='mt-6'>
          <Button className='mb-8' onClick={() => {
            handleClick('RotateLeftOutlined')
          }} type='dashed'><RotateLeftOutlined/></Button>
          <Button className='mb-8 ml-5' onClick={() => handleClick('RotateRightOutlined')}
                  type='dashed'><RotateRightOutlined/></Button>
          <Button className='mb-8 ml-5' onClick={() => handleClick('ZoomInOutlined')}
                  type='dashed'><ZoomInOutlined/></Button>
          <Button className='mb-8 ml-5' onClick={() => handleClick('ZoomOutOutlined')}
                  type='dashed'><ZoomOutOutlined/></Button>
        </div>
      </Card>
    </CorpWrapper>
  );
};

export default CorpjsComponent;
