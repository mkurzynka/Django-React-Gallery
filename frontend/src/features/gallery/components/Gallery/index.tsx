import { useRef, useState } from "react";
import GalleryGrid from "../GalleryGrid";
import GalleryPagination from "../GalleryPagination";
import GallerySettings from "../GallerySettings";

import "./style.css";
import GalleryContext from "../GalleryContext";
import GalleryTour from "./GalleryTour";

export default function Gallery() {
  const [page, setPage] = useState<number>(1);
  const paginationRef = useRef<null | HTMLDivElement>(null);
  const settingsRef = useRef<null | HTMLDivElement>(null);
  const gallerynRef = useRef<null | HTMLDivElement>(null);

  return (
    <div className="mainContainer">
      <GalleryContext>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div ref={paginationRef}>
            <GalleryPagination page={page} setPage={setPage} />
          </div>
          <div className="rightContainer">
            <GalleryTour
              refGallery={gallerynRef}
              refPagination={paginationRef}
              refSetting={settingsRef}
            />
            <div ref={settingsRef}>
              <GallerySettings />
            </div>
          </div>
        </div>
        <div ref={gallerynRef}>
          <GalleryGrid page={page} />
        </div>
      </GalleryContext>
    </div>
  );
}
