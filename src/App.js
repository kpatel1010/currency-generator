import React, { useState } from "react";
import Currency from "./components/currency/Currency";
import Unit from "./components/unit/Unit";
import "./App.css";
import Radium, { StyleRoot } from "radium";

function App() {
  const [isUnitOn, setIsUnitOn] = useState(false);
  const onViewChange = () => {
    setIsUnitOn((prevVal) => !prevVal);
  };

  const style = {
    // Adding media query..
    "@media (min-width: 600px)": {
      maxHeight: "700px",
    },
  };
  return (
    <StyleRoot>
      <div
        className="flex items-center justify-around flex-column pa3 br3 w-100 App"
        style={style}
      >
        {isUnitOn ? (
          <Unit onViewChange={onViewChange} isUnitOn={isUnitOn} />
        ) : (
          <Currency onViewChange={onViewChange} isUnitOn={isUnitOn} />
        )}
      </div>
    </StyleRoot>
  );
}
export default App;
