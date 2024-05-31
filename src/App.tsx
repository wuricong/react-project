import "./App.css";
import {prop} from "./interfaces";

function App(prop: prop) {
    let {slot} = prop
    return (
        <>
            <div>{slot}</div>
        </>)
}

export default App;
