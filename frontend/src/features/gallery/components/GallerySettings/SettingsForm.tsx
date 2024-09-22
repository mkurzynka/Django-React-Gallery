import { Checkbox, Form, FormInstance, InputNumber } from "antd";
import { FieldType, useSettingsFrom } from "../../hooks/useSettingsForm";

export default function SettingsForm({
  form,
}: {
  form: FormInstance<FieldType>;
}) {
  const { onFinish, setUseDelay, useDelay } = useSettingsFrom(form);
  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item label="Use delayed fetching">
        <Checkbox
          checked={useDelay}
          onChange={() => setUseDelay((prev) => !prev)}
        />
      </Form.Item>
      <Form.Item<FieldType> name="fetchDelay" label="Fetch delay">
        <InputNumber addonAfter="ms" min={1} disabled={!useDelay} />
      </Form.Item>
    </Form>
  );
}
