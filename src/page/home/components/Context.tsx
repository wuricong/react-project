import { createContext } from "react";
import Second from "@/page/home/components/Second";

export const OutContext = createContext("");

function Context() {
  return (
    <OutContext.Provider value="dark">
      <First></First>
    </OutContext.Provider>
  );
}

function First() {
  return (
    <div>
      第一层
      <Second></Second>
    </div>
  );
}

export default Context;
