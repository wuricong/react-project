import { Modal, Form, Input } from "antd";
import React, { useState, useImperativeHandle, Ref } from "react";

interface Obj {
  name: string;
}

interface Props {
  Slot?: React.FC;
  onRef: any;
  formData?: Obj;
}

export default function Dialog(props: Props) {
  //as类型断言
  const { Slot, formData = {} as Obj } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>();
  const handleDialogCancel = () => {
    setIsModalOpen(false);
  };

  useImperativeHandle<Ref<unknown>, any>(props.onRef, () => {
    return { handleModalOpen };
  });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  return (
    <Modal title="编辑" open={isModalOpen} onCancel={handleDialogCancel}>
      {Slot ? <Slot /> : null}
      <Form name="basic">
        <Form.Item label="姓名">
          <Input value={formData.name} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
