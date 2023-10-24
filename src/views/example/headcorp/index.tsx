import {Upload, message} from "antd";
import type {RcFile} from 'antd/es/upload/interface';
import {UploadOutlined} from '@ant-design/icons';
import {Card, Button, Divider,} from 'antd';
import type {UploadProps} from 'antd';
import {useEffect, useRef, useState} from "react";
import {HeadCorpWrapper} from "@/views/example/headcorp/style.ts";
import CorpjsComponent from "@/views/example/headcorp/corpjs";
import {SaveImage} from "@/utils";
const HeadCrop = () => {
  const [imageData, setImageData] = useState<string>('')
  const drapBoxRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const imageRef = useRef(null)
  const [drapValue] = useState({
    wrapWidth: 256,
    wrapHeight: 256,
    dBoxWidth: 128,
    dBoxHeight: 128,
    top: 20,
    left: 20,
    right: 0,
    bottom: 0,
    canvasW: 128,
    canvasH: 128,
  })
  const [ClipPath, setClipPath] = useState({
    top: 20,
    right: 0,
    bottom: 0,
    left: 20
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
      setCtx(canvasRef.current.getContext('2d'))
    }
  }, []);
  useEffect(() => {
    if (imageData) {
      getImage()
      const {right, bottom} = getClipPath()
      setClipPath({
        ...ClipPath,
        right,
        bottom,
      })
    }
  }, [currentImage]);

  const getClipPath = () => {
    const {wrapWidth, wrapHeight, dBoxHeight, dBoxWidth} = drapValue
    const {left, top} = ClipPath
    const right = wrapWidth - left - dBoxWidth
    const bottom = wrapHeight - top - dBoxHeight
    return {
      right, bottom
    }
  }
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
    // 计算比例
    ctx?.clearRect(0, 0, drapValue.canvasW, drapValue.canvasH)
    const x = offSetLeft / 2 / drapValue.dBoxWidth * currentImage.w
    const y = offSetTop / 2 / drapValue.dBoxHeight * currentImage.h
    const client_w = drapValue.dBoxWidth / drapValue.wrapWidth * currentImage.w
    const client_h = drapValue.dBoxHeight / drapValue.wrapHeight * currentImage.h
    ctx?.drawImage(imageRef.current, x, y, client_w, client_h, 0, 0, drapValue.canvasW, drapValue.canvasH)
  }
  const countDim = () => {
    let offSetLeft = 0, offSetTop = 0, pLeft = 0, pTop = 0;
    if (drapBoxRef.current) {

      const {
        left: parentLeft,
        top: parentTop
      } = drapBoxRef.current.parentElement!.getBoundingClientRect()
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
      const {wrapWidth, dBoxWidth, wrapHeight, dBoxHeight} = drapValue
      const {left, top} = wrapRef.current!.getBoundingClientRect()
      const mouseX = e.clientX - left
      const mouseY = e.clientY - top
      let transLateX = mouseX - mouse.x
      let transLateY = mouseY - mouse.y
      // 进行拖动操作
      const DiffWith = wrapWidth - dBoxWidth
      const DiffHeight = wrapHeight - dBoxHeight
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
      const right = wrapWidth - transLateX - dBoxWidth
      const bottom = wrapHeight - transLateY - dBoxHeight
      setClipPath({...ClipPath, top: transLateY, left: transLateX, right, bottom})
      drapBoxRef.current!.style.transform = `translate(${transLateX}px,${transLateY}px)`
      getImage()
    }
  }
  const drapMouseDown = (e: { clientX: number; clientY: number; }) => {
    // 获取鼠标距离拖动框的坐标,
    const {left, top} = drapBoxRef.current!.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    setMouse({...mouse, x, y})
    setIsMove(true)
  }

  // 保存图片
  const saveAvater = () => {
    const ImageUrl = ctx.canvas.toDataURL('image/png')
    SaveImage(ImageUrl,'头像.png')
  }
  return (
    <HeadCorpWrapper drapvalue={drapValue}>
      <Card title='基础版本'>
        <div className='flex justify-center items-center'>
          <div className='flex items-center mr-32'>
            <Upload {...props}>
              <Button className='mr-10' icon={<UploadOutlined/>}>选择图片</Button>
            </Upload>
            <div className='corpWrapper relative border border-dashed mr-4' ref={wrapRef}>
              {
                imageData && <><img ref={imageRef}
                                    draggable='false'
                                    className='baseImg absolute left-0 top-0 w-full h-full'
                                    src={imageData}
                />
                  <div className='mask absolute left-0 top-0 w-full h-full bg-slate-950/[.6]'
                  ></div>
                  <img src={imageData} draggable='false' alt=""
                       className='clipImg absolute left-0 top-0 w-full h-full'
                       style={{clipPath: `inset(${ClipPath.top}px ${ClipPath.right}px ${ClipPath.bottom}px ${ClipPath.left}px)`}}
                  />
                  <div ref={drapBoxRef}
                       onMouseMove={drapMouseMove}
                       onMouseDown={drapMouseDown}
                       onMouseUp={() => {
                         setIsMove(false)
                       }}
                       onMouseLeave={() => {
                         setIsMove(false)
                       }}
                       className='drapBox absolute select-none cursor-move '>
                  </div>
                </>
              }
            </div>
          </div>
          <Divider type='vertical'/>
          <div className='flex flex-col '>
            <canvas className='mb-7 rounded-full' ref={canvasRef} width={drapValue.canvasW}
                    height={drapValue.canvasH}></canvas>
            <Button type="primary" onClick={saveAvater}>保存头像</Button>
          </div>
        </div>
      </Card>
      <CorpjsComponent/>
    </HeadCorpWrapper>
  );
};

export default HeadCrop;
