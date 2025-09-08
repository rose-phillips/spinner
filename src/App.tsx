import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/homepage/Home";
import { ThemeState, useThemeStore } from "./components/stores/ThemeStore";

function App() {

  const themeChoice = useThemeStore((state: ThemeState) => state);
  return (
    <div className={`App ${themeChoice.theme}`}>
      <BrowserRouter>
        <Header />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
