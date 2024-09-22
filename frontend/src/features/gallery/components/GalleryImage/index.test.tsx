import { ReactNode } from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GalleryImage from "./index";
import { useImageThumbnail } from "../../hooks/useImageQueries";

vi.mock("../../hooks/useImageQueries");

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

function mockData(files: File[]) {
  return {
    dataTransfer: {
      files,
      items: files.map((file) => ({
        kind: "file",
        type: file.type,
        getAsFile: () => file,
      })),
      types: ["Files"],
    },
  };
}

describe("GalleryImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state", () => {
    vi.mocked(useImageThumbnail).mockReturnValue({
      isLoading: true,
      thumbnail: undefined,
      isError: false,
      handleUpload: vi.fn(),
    });

    render(<GalleryImage index={1} />, { wrapper });

    expect(screen.getByText("Loading image...")).toBeDefined();
  });

  it("should render thumbnail", () => {
    const mockThumbnail = "image string";
    vi.mocked(useImageThumbnail).mockReturnValue({
      isLoading: false,
      thumbnail: mockThumbnail,
      isError: false,
      handleUpload: vi.fn(),
    });

    render(<GalleryImage index={1} />, { wrapper });

    expect(screen.getByAltText("Thumbnail 1")).toBeDefined();
  });

  it("should render error state", () => {
    vi.mocked(useImageThumbnail).mockReturnValue({
      isLoading: false,
      thumbnail: undefined,
      isError: true,
      handleUpload: vi.fn(),
    });

    render(<GalleryImage index={1} />, { wrapper });

    expect(screen.getByText("Could not fetch data")).toBeDefined();
  });

  it("should handle file upload", async () => {
    const handleUpload = vi.fn();
    vi.mocked(useImageThumbnail).mockReturnValue({
      isLoading: false,
      thumbnail: "image string",
      isError: false,
      handleUpload,
    });

    render(<GalleryImage index={1} />, { wrapper });

    const file = new File(["mock file content"], "test.jpg", {
      type: "image/jpeg",
    });
    const dropzone = screen.getByAltText("Thumbnail 1").closest("div")!;

    fireEvent.drop(dropzone, mockData([file]));

    await waitFor(() => {
      expect(handleUpload).toHaveBeenCalledWith([file]);
    });
  });
});
