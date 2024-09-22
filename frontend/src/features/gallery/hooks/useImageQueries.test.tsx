import { ReactNode } from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useImageThumbnail } from "./useImageQueries";
import { getImageThumbnail, uploadImage } from "../services/api";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock the API functions
vi.mock("../services/api", () => ({
  getImageThumbnail: vi.fn(),
  uploadImage: vi.fn(),
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useImageThumbnail", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and transform thumbnail", async () => {
    // Mocks unavailable URL function
    window.URL.createObjectURL = vi.fn(() => "blob:");

    const mockThumbnail = new Blob(["mock image data"], { type: "image/jpeg" });
    vi.mocked(getImageThumbnail).mockResolvedValue(mockThumbnail);

    const { result } = renderHook(() => useImageThumbnail(1), {
      wrapper,
    });

    await waitFor(() => !result.current.isLoading);

    expect(result.current.thumbnail).toMatch(/^blob:/);
    expect(result.current.isError).toBe(false);
  });

  it("should handle upload", async () => {
    window.URL.createObjectURL = vi.fn(() => "blob:");
    const mockThumbnail = new Blob(["mock image data"], { type: "image/jpeg" });
    vi.mocked(uploadImage).mockResolvedValue({});
    vi.mocked(getImageThumbnail).mockResolvedValue(mockThumbnail);

    const { result } = renderHook(() => useImageThumbnail(1), {
      wrapper,
    });

    const file = new File(["test"], "test.jpg", { type: "image/jpeg" });

    act(() => {
      result.current.handleUpload([file]);
    });

    await waitFor(() => !result.current.isLoading);

    expect(uploadImage).toHaveBeenCalledWith(1, file);

    // Image upload should invalidate tag - we expect it to be refetched
    expect(getImageThumbnail).toHaveBeenCalledTimes(2);
  });

  // it("should handle error", async () => {
  //   vi.mocked(getImageThumbnail).mockRejectedValue(
  //     new Error("Failed to fetch")
  //   );

  //   const { result } = renderHook(() => useImageThumbnail(1), {
  //     wrapper,
  //   });

  //   await waitFor(() => !result.current.isLoading);

  //   expect(result.current.isError).toBe(true);
  //   expect(result.current.thumbnail).toBeUndefined();
  // });
});
