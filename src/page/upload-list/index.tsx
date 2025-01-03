import { Button, Input } from "antd";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { GetProp, UploadProps } from "antd";

const { TextArea } = Input;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    callback(reader.result as string);
  });
  reader.readAsDataURL(img);
};

export function UploadDmg() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const handleBeforeUpload = (val: any) => {
    console.log(11, val);
  };

  const handleUploadChange: UploadProps["onChange"] = (info) => {
    console.log("info", info);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setImageUrl(url);
      });
    }
    setLoading(false);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleFileChange = (e: any) => {
    console.log("e", e);
    const reader = new FileReader();
    reader.addEventListener("load", (file) => {
      console.log("file", file);
    });
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleFileDialog = () => {
    // @ts-ignore
    if (window.showOpenFilePicker) {
      // @ts-ignore
      window.showOpenFilePicker().then((res: any) => {
        console.log("res", res);
      });
    }
  };
  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        action="http://localhost:8999/upload"
        beforeUpload={handleBeforeUpload}
        onChange={handleUploadChange}
      >
        {imageUrl ? <img src="" alt="" /> : uploadButton}
      </Upload>

      <div>原生上传</div>
      <input type="file" onChange={handleFileChange} />

      <div>自定义上传</div>
      <Button type="primary" onClick={handleFileDialog}>
        自定义上传
      </Button>
    </>
  );
}

export const HandleImg = () => {
  const [base, useBase] = useState<string>();
  const handleInput = (val: string) => {
    useBase(val);
  };
  return (
    <>
      <TextArea
        className="mb-4"
        value={base}
        rows={6}
        placeholder="base64格式"
        onChange={(e) => handleInput(e.target.value)}
      />
      <UploadDmg />
    </>
  );
};

function SortList() {
  return (
    <div>
      <HandleImg />
    </div>
  );
}

export default SortList;
