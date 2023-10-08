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
  const [drapValue, setDrapValue] = useState({
    wrapWidth: 256,
    wrapHeight: 256,
    dBoxWidth: 128,
    dBoxHeight: 128,
    top: 64,
    left: 64,
    canvasW: 128,
    canvasH: 128
  })
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0
  })
  const [isMove, setIsMove] = useState(false)
  let ctx: CanvasRenderingContext2D | null = null
  // 获取canvas
  useEffect(() => {
    if (canvasRef.current) {
      // @ts-ignore
      ctx = canvasRef.current.getContext('2d')
    }
  }, []);
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
      });
      return false
    }
  };
  const getImage = () => {
    const {offSetTop, offSetLeft} = countDim()
    console.log(offSetTop, offSetLeft,imageRef.current)

    // @ts-ignore
    ctx?.drawImage(imageRef.current,10,10,30,30,0,0,128,128)
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

  const drapMouseMove = (e) => {
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
      console.log(transLateX,transLateY,'transLateYtransLateY')
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
    }
  }
  const drapMouseDown = (e) => {
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
            <img ref={imageRef} draggable='false' className='absolute left-0 top-0 w-full h-full'
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
        <div>
          <canvas ref={canvasRef} width={drapValue.canvasW} height={drapValue.canvasH}></canvas>
          <Button onClick={getImage} type="primary">保存头像</Button>
        </div>
      </div>
    </Card>
  );
};

export default HeadCrop;
