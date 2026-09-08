import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/authcontext.jsx";
import { UserContextProvider } from "./context/userContext.jsx";

const query = new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={query}>
    <AuthContextProvider>
      <UserContextProvider>
        <StrictMode>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </StrictMode>
      </UserContextProvider>
    </AuthContextProvider>
  </QueryClientProvider>,
);
