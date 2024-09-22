import React from "react";
import { Button, Form, FormProps, InputNumber } from "antd";

interface JumpToPageProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface FieldType {
  goto: number;
}

export default function JumpToPage({ setPage }: JumpToPageProps) {
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setPage(values.goto);
    form.resetFields();
  };

  return (
    <Form onFinish={onFinish} form={form} layout="inline">
      <Form.Item<FieldType>
        label="Go to"
        name="goto"
        validateFirst
        rules={[
          {
            validator: (_, value) =>
              value !== null && value > 0
                ? Promise.resolve()
                : Promise.reject("Value must be greater than 0"),
          },
        ]}
      >
        <InputNumber style={{ width: 200 }} />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Go
      </Button>
    </Form>
  );
}
