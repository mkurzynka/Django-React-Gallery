import { Empty, notification, Spin } from "antd";
import DropZone from "../DropZone";
import { useImageThumbnail } from "../../hooks/useImageQueries";
import "./style.css";

interface GalleryImageProps {
  index: number;
  delay?: number;
}

export default function GalleryImage({ index, delay }: GalleryImageProps) {
  const [api, contextHolder] = notification.useNotification();

  const { handleUpload, isLoading, thumbnail, isError } = useImageThumbnail(
    index,
    { notificationApi: api, delay }
  );

  console.log("render");
  return (
    <Spin spinning={isLoading} tip="Loading image...">
      <div className="imageCard">
        {isError && <Empty>Could not fetch data</Empty>}
        {thumbnail !== undefined && (
          <DropZone onUpload={handleUpload}>
            <img src={thumbnail} alt={`Thumbnail ${index}`} />
          </DropZone>
        )}
        {contextHolder}
      </div>
    </Spin>
  );
}
