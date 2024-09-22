import { NUMBER_OF_PICTURES_PER_PAGE } from "../../../../utils/constants";
import GalleryImage from "../GalleryImage";

import "./style.css";

// const delays = Array(NUMBER_OF_PICTURES_PER_PAGE)
//   .fill(1)
//   .map((_item, index) => index * 0);

export default function GalleryGrid({ page }: { page: number }) {
  const indexes = Array(NUMBER_OF_PICTURES_PER_PAGE)
    .fill(1)
    .map((_item, index) => (page - 1) * NUMBER_OF_PICTURES_PER_PAGE + index);

  return (
    <>
      <div className="container">
        {indexes.map((index) => (
          <GalleryImage key={index} index={index} />
        ))}
      </div>
    </>
  );
}
