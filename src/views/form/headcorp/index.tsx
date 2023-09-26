import {Upload} from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {useState} from "react";
const HeadCrop = () => {
  const [loading, setloading] = useState(false)
  const [imageUrl, setimageUrl] = useState<string>()
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </div>
  );
};

export default HeadCrop;
