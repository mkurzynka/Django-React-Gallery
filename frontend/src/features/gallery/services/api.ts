import axios from "axios";
import { API_BASE_URL } from "../../../utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getImageThumbnail = async (index: number) => {
  const response = await api.get(`/gallery/preview/${index}/`, {
    responseType: "blob",
  });
  return response.data;
};

export const uploadImage = async (index: number, imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  const response = await api.put(`/gallery/${index}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
