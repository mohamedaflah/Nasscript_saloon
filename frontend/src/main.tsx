import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { FullContextProvider } from "./context/statecontext.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "react-hot-toast";
import { Toaster as ShadcnToast} from "@/components/ui/sonner"
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <FullContextProvider>
        <Provider store={store}>
          <Toaster position="top-center" />
          <App />
          <ShadcnToast/>
        </Provider>
      </FullContextProvider>
    </BrowserRouter>
  </StrictMode>
);
