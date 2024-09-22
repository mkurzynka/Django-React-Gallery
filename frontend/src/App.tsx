import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import Gallery from "./features/gallery/components/Gallery";

const queryClient = new QueryClient();

const { darkAlgorithm } = theme;
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: darkAlgorithm,
          token: {
            colorPrimary: "#BB86FC",
          },
        }}
      >
        <Gallery />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
