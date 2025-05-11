import { lazy, Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./redux/store";
import { useTheme } from "./context/ThemeContext";
import { ToastProvider } from "./styles/ToastProvider";

const Home = lazy(() => import("./pages/Home"));

const App = () => {
  const { theme } = useTheme();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<>Loading...</>}>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </ToastProvider>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
