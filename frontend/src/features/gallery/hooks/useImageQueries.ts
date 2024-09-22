import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getImageThumbnail, uploadImage } from "../services/api";

export const useThumbnailQuery = (index: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["thumbnailImage", index],
    queryFn: () => getImageThumbnail(index),
    enabled,
  });
};

export const useImageThumbnail = (index: number) => {
  const queryClient = useQueryClient();

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
  });

  const { mutate, isPending: isUploading } = useMutation({
    mutationFn: (data: File) => {
      return uploadImage(index, data);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["thumbnailImage", index] }),
  });

  const isLoading = isPending || isUploading;

  const handleUpload = (file: Array<File>) => {
    mutate(file[0]);
  };

  return { thumbnail, isLoading, handleUpload, isError };
};
