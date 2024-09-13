import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppPrevMock from "./AppPrevMock.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppPrevMock />
  </StrictMode>
);
