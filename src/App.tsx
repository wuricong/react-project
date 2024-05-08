import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Throttle from "./page/throttle";
import Home from "./page/home";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Throttle />} />
          <Route path="/throttle" element={<Throttle />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
