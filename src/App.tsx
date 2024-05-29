import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {MenuLayout} from './layout/index.tsx'
import Throttle from "./page/throttle";
import Home from "./page/home";

function App() {
    return (
        <>
            <BrowserRouter>
                <div>111</div>
                <MenuLayout/>
                <Routes>
                    <Route path="/" element={<Throttle/>}/>
                    <Route path="/throttle" element={<Throttle/>}/>
                    <Route path="/home" element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
