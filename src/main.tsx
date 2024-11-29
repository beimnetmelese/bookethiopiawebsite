import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import route from "./components/router/router.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./components/theme/theme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const query = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={query}>
        <RouterProvider router={route} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
