import { Empty, Spin } from "antd";
import DropZone from "../DropZone";
import { useImageThumbnail } from "../../hooks/useImageQueries";
import "./style.css";

interface GalleryImageProps {
  index: number;
}

export default function GalleryImage({ index }: GalleryImageProps) {
  const { handleUpload, isLoading, thumbnail, isError } =
    useImageThumbnail(index);

  return (
    <Spin spinning={isLoading} tip="Loading image...">
      <div className="imageCard">
        {isError && <Empty>Could not fetch data</Empty>}
        {thumbnail !== undefined && (
          <DropZone onUpload={handleUpload}>
            <img src={thumbnail} alt={`Thumbnail ${index}`} />
          </DropZone>
        )}
      </div>
    </Spin>
  );
}
