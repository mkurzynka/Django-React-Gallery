import { useContext, useState } from "react";
import { SettingsContext } from "../components/GalleryContext";
import { FormInstance, FormProps } from "antd";

export interface FieldType {
  fetchDelay: number;
}

export const useSettingsFrom = (form: FormInstance<FieldType>) => {
  const settingsContext = useContext(SettingsContext);

  form.setFieldsValue({ fetchDelay: settingsContext.delay });

  const [useDelay, setUseDelay] = useState(
    settingsContext.delay ? true : false
  );

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    settingsContext.setDelay(useDelay ? values.fetchDelay : undefined);
    form.resetFields();
  };

  return { onFinish, setUseDelay, useDelay };
};
