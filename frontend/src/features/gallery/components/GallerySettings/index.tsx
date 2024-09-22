import { SettingFilled } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import SettingsForm from "./SettingsForm";

export default function GallerySettings() {
  const [modalApi, modalContext] = Modal.useModal();
  const [form] = Form.useForm();

  return (
    <>
      {modalContext}
      <Button
        style={{ marginLeft: "20px" }}
        onClick={() =>
          modalApi.confirm({
            title: "Settings",
            content: <SettingsForm form={form} />,
            onOk: () => {
              form.submit();
            },
          })
        }
      >
        <SettingFilled />
      </Button>
    </>
  );
}
