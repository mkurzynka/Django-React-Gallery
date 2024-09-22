import GalleryImage from "../GalleryImage";

import "./style.css";
import { useGalleryGrid } from "../../hooks/useGalleryGrid";

interface GalleryGridProps {
  page: number;
}

export default function GalleryGrid({ page }: GalleryGridProps) {
  const { delays, indexes } = useGalleryGrid(page);
  return (
    <>
      <div className="container">
        {indexes.map((index, iter) => (
          <GalleryImage key={index} index={index} delay={delays[iter]} />
        ))}
      </div>
    </>
  );
}
