import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { SettingOutlined } from "@ant-design/icons";

interface props {
  handleCloseLogin: Function;
}

export function SettingDropdown({ handleCloseLogin }: props) {
  const items: MenuProps["items"] = [
    {
      label: (
        <Button
          className="mr-4"
          type="primary"
          onClick={() => handleCloseLogin()}
        >
          退出登录
        </Button>
      ),
      key: "0",
    },
  ];

  return (
    <Dropdown className="mr-4" menu={{ items }} trigger={["click"]}>
      <SettingOutlined onClick={(e) => e.preventDefault()} />
    </Dropdown>
  );
}
