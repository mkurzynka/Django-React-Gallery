import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getImageThumbnail, uploadImage } from "../services/api";
import { NotificationInstance } from "antd/es/notification/interface";
import { useState } from "react";

interface UseImageThumbnailConfigProps {
  notificationApi?: NotificationInstance;
  delay?: number;
}

export const useImageThumbnail = (
  index: number,
  config?: UseImageThumbnailConfigProps
) => {
  const [queryEnabled, setQueryEnabled] = useState(config?.delay === undefined);

  const queryClient = useQueryClient();

  if (config?.delay) {
    setTimeout(() => setQueryEnabled(true), config?.delay);
  }

  const {
    isPending,
    data: thumbnail,
    isError,
  } = useQuery({
    queryKey: ["thumbnailImage", index],
    queryFn: () => getImageThumbnail(index),
    select: (data: Blob) => {
      return URL.createObjectURL(data);
    },
    enabled: queryEnabled,
  });

  const { mutate, isPending: isUploading } = useMutation({
    mutationFn: (data: File) => {
      return uploadImage(index, data);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["thumbnailImage", index] }),
    onError: () => {
      config?.notificationApi?.error({
        message: "Upload failed",
        description: "Make sure that provided image has .jpg extension",
      });
    },
  });

  const isLoading = isPending || isUploading;

  const handleUpload = (file: Array<File>) => {
    mutate(file[0]);
  };

  return { thumbnail, isLoading, handleUpload, isError };
};
