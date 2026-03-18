import {usePreferenceStore} from "./components/stores/PreferenceStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/homepage/Home";

function App() {
  
  const {primaryColor} = usePreferenceStore(preferences => preferences);
  const classes = `app ${primaryColor}`
  return (
    <div className={classes}>
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
