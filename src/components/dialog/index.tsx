import { useEffect, useState, FC } from "react";
import { Button, Modal } from "antd";
interface Obj {
  handleDialogClose: () => void;
  visible: boolean;
}
const Dialog: FC<Obj> = (obj: Obj) => {
  const { handleDialogClose, visible } = obj;
  console.log("handleCloseDialog", obj, handleDialogClose);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    console.log("val", visible);
    setIsModalOpen(visible);
  }, [visible]);
  return (
    <>
      <Modal title="新的弹窗" open={isModalOpen} onCancel={handleDialogClose}>
        <Button type="primary" onClick={handleDialogClose}>
          关闭弹窗
        </Button>
      </Modal>
    </>
  );
};

export default Dialog;
