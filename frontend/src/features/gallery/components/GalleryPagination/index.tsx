import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import "./style.css";
import JumpToPage from "./JumpToPage";

export default function GalleryPagination({
  page,
  setPage,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="paginationContainer">
      <Button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
        <LeftOutlined />
      </Button>
      {page}
      <Button onClick={() => setPage((prev) => prev + 1)}>
        <RightOutlined />
      </Button>
      <JumpToPage setPage={setPage} />
    </div>
  );
}
