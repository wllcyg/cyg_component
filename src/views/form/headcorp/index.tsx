import {Upload, message} from "antd";
import {useEffect, useRef, useState} from "react";
import type {RcFile} from 'antd/es/upload/interface';
import {UploadOutlined} from '@ant-design/icons';
import {Card, Button,Divider} from 'antd';
import type {UploadProps} from 'antd';
const HeadCrop = () => {
  let imageData:HTMLImageElement | undefined= undefined
  const canvasRef = useRef(null)
  const [ctx,setCtx] = useState<CanvasRenderingContext2D>()
  const [maskValue,setMaskValue] = useState({
    left:50,
    top:50,
    width:60,
    height:60
  })
  useEffect(() => {
    console.log(canvasRef)
    if (canvasRef.current){
      // @ts-ignore
      setCtx(canvasRef.current.getContext('2d'))
    }
  }, []);
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
        img.onload = () => {
          window.requestAnimationFrame(drawerImg)
        }
      });
      return false
    }
  };
  const drawerImg = () =>{
    ctx?.clearRect(0,0,255,255)
    // @ts-ignore
    ctx?.drawImage(imageData,0,0,imageData?.width,imageData?.height,0,0,255,255)
    drawMask()
    window.requestAnimationFrame(drawerImg)
  }
  //蒙层
  const drawMask = () => {
    ctx?.beginPath()
    // @ts-ignore
    ctx.lineWidth = 2
    // @ts-ignore
    ctx.strokeStyle = 'rgba(0,0,0,0.7)'
    const {left,top,width,height } = maskValue
    ctx?.strokeRect(left,top,width,height)
  }
  return (
    <Card>
      <div className='flex justify-center items-center'>
        <div className='flex items-center mr-32'>
          <Upload {...props}>
            <Button className='mr-10' icon={<UploadOutlined/>}>选择图片</Button>
          </Upload>
          <div className='border-current border-2 border-dashed'>
            <canvas  ref={canvasRef} width='255' height='255'/>
          </div>
        </div>
        <Divider type='vertical'/>
        <img   className='w-48 h-48 rounded-full' />
      </div>
    </Card>
  );
};

export default HeadCrop;
