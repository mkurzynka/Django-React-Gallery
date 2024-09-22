import React, { useState } from "react";
import GalleryGrid from "../GalleryGrid";
import GalleryPagination from "../GalleryPagination";

import "./style.css";

export default function Gallery() {
  const [page, setPage] = useState<number>(1);
  return (
    <div className="mainContainer">
      <GalleryPagination page={page} setPage={setPage} />
      <GalleryGrid page={page} />
    </div>
  );
}
