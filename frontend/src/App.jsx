import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
// Styles
import "./styles/main.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ff6b35",
            borderRadius: 8,
          },
        }}
      >
        <AuthProvider>
          <Router>
            <Header />
            <AppRoutes />
            <Footer />
          </Router>
        </AuthProvider>
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
