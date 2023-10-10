import {Upload, message} from "antd";
import type {RcFile} from 'antd/es/upload/interface';
import {UploadOutlined} from '@ant-design/icons';
import {Card, Button, Divider} from 'antd';
import type {UploadProps} from 'antd';
import {useEffect, useRef, useState} from "react";

const HeadCrop = () => {
  const [imageData, setImageData] = useState<string>('')
  const drapBoxRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const imageRef = useRef(null)
  const [drapValue] = useState({
    wrapWidth: 256,
    wrapHeight: 256,
    dBoxWidth: 216,
    dBoxHeight: 216,
    top: 20,
    left: 20,
    canvasW: 128,
    canvasH: 128
  })
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0
  })
  const [isMove, setIsMove] = useState(false)
  const [ctx, setCtx] = useState()
  const [currentImage, setCurrentImage] = useState({
    w: 0,
    h: 0
  })
  // 获取canvas
  useEffect(() => {
    if (canvasRef.current) {
      // @ts-ignore
      setCtx(canvasRef.current.getContext('2d'))
    }
  }, []);
  useEffect(() => {
    if (imageData){
      getImage()
    }
  }, [currentImage]);
  const props: UploadProps = {
    showUploadList: false,
    beforeUpload(file: RcFile) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
        return false
      }
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => {
        setImageData(reader.result as string)
        // 获取img的宽高计算比例
        const img = new Image()
        img.src = reader.result as string
        img.onload = () => {
          setCurrentImage({
            w: img.width,
            h: img.height
          })
        }
      });
      return false
    }
  };

  const getImage = () => {
    const {offSetTop, offSetLeft} = countDim()
    // @ts-ignore
    // 计算比例
    ctx.clearRect(0, 0, drapValue.canvasW, drapValue.canvasH)
    const x = offSetLeft / 2 / drapValue.dBoxWidth * currentImage.w
    const y = offSetTop / 2 / drapValue.dBoxHeight * currentImage.h
    const client_w = drapValue.dBoxWidth / drapValue.wrapWidth * currentImage.w
    const client_h = drapValue.dBoxHeight / drapValue.wrapHeight * currentImage.h
    // @ts-ignore
    ctx?.drawImage(imageRef.current, x, y, client_w, client_h, 0, 0, drapValue.canvasW, drapValue.canvasH)
  }
  const countDim = () => {
    let offSetLeft = 0, offSetTop = 0, pLeft = 0, pTop = 0;
    if (drapBoxRef.current) {

      const {
        left: parentLeft,
        top: parentTop
        // @ts-ignore
      } = drapBoxRef.current.parentElement.getBoundingClientRect()
      const {left, top} = drapBoxRef.current.getBoundingClientRect()
      pLeft = parentLeft
      pTop = parentTop
      offSetLeft = left - parentLeft
      offSetTop = top - parentTop
    }
    return {offSetLeft, offSetTop, pLeft, pTop}
  }
  // 获取鼠标位置

  const drapMouseMove = (e: { clientX: number; clientY: number; }) => {
    if (isMove) {
      // @ts-ignore
      const {left, top} = wrapRef.current.getBoundingClientRect()
      const mouseX = e.clientX - left
      const mouseY = e.clientY - top
      let transLateX = mouseX - mouse.x
      let transLateY = mouseY - mouse.y
      // 进行拖动操作
      const DiffWith = drapValue.wrapWidth - drapValue.dBoxWidth
      const DiffHeight = drapValue.wrapHeight - drapValue.dBoxHeight
      if (transLateX <= 0) {
        transLateX = 0
      } else if (transLateX >= DiffWith) {
        transLateX = DiffWith
      }
      if (transLateY <= 0) {
        transLateY = 0
      } else if (transLateY >= DiffHeight) {
        transLateY = DiffHeight
      }
      // @ts-ignore
      drapBoxRef.current.style.transform = `translate(${transLateX}px,${transLateY}px)`
      getImage()
    }
  }
  const drapMouseDown = (e: { clientX: number; clientY: number; }) => {
    // 获取鼠标距离拖动框的坐标,
    // @ts-ignore
    const {left, top} = drapBoxRef.current.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    setMouse({...mouse, x, y})
    setIsMove(true)
  }
  return (
    <Card>
      <div className='flex justify-center items-center'>
        <div className='flex items-center mr-32'>
          <Upload {...props}>
            <Button className='mr-10' icon={<UploadOutlined/>}>选择图片</Button>
          </Upload>
          <div className='relative' ref={wrapRef}
               style={{
                 width: `${drapValue.wrapWidth}px`,
                 height: `${drapValue.wrapHeight}px`,
               }}>
            <img ref={imageRef}
                 draggable='false' className='absolute left-0 top-0 w-full h-full'
                 src={imageData}
                 alt=""/>
            <div ref={drapBoxRef}
                 style={{
                   width: `${drapValue.dBoxWidth}px`,
                   height: `${drapValue.dBoxHeight}px`,
                   transform: `translate(${drapValue.top}px,${drapValue.left}px)`,
                 }}
                 onMouseMove={drapMouseMove}
                 onMouseDown={drapMouseDown}
                 onMouseUp={() => {
                   setIsMove(false)
                 }}
                 onMouseLeave={() => {
                   setIsMove(false)
                 }}
                 className='absolute select-none cursor-move bg-slate-950/[.6]'></div>
          </div>
        </div>
        <Divider type='vertical'/>
        <div className='flex flex-col '>
          <canvas className='mb-7 rounded-full' ref={canvasRef} width={drapValue.canvasW}
                  height={drapValue.canvasH}></canvas>
          <Button type="primary">保存头像</Button>
        </div>
      </div>
    </Card>
  );
};

export default HeadCrop;
