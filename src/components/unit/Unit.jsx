import React, { useState, useEffect } from "react";
import { units } from "../../services/unitService";
import convert from "convert-units";
import ConvertorFrom from "../convertorFrom";
import Results from "../currency/Result";
import { StyleRoot } from "radium";

function Unit({ onViewChange, isUnitOn }) {
  const [unitType, setUnitType] = useState("length");
  const [slectedType, setSelectedType] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSelectedType(units[unitType]);
    setFrom(units[unitType][0][0]);
    setTo(units[unitType][0][0]);
    setAmount("");
  }, [unitType]);

  const onInputChange = (event) => {
    const { value, name } = event.target;
    if (name === "from" && value) {
      setFrom(value);
    } else if (name === "to" && value) {
      setTo(value);
    } else if (name === "amount") {
      setAmount(value);
    }

    if (isNaN(Number(amount))) {
      setIsAmountValid(false);
    } else {
      setIsAmountValid(true);
    }
  };
  const handleSelectChange = (event) => {
    setUnitType(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const output = convert(amount).from(from).to(to);
    setResult({
      result: output,
      query: {
        amount: amount,
        from: from,
        to: to,
      },
    });
    setIsLoading(false);
  };

  const style = {
    // Adding media query..
    "@media (min-width: 768px)": {
      marginTop: "10rem",
    },
  };
  return (
    <>
      <h2 className="f1 set-font tc setUnitMargin">Unit Converter</h2>
      <main className="pa2  w-90 mv-4">
        <form className="measure center" style={{ marginBottom: "-2.4rem" }}>
          <fieldset id="convert" className="ba b--transparent ph0 mh0">
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="unitType">
                Type of Unit
              </label>
              <select
                className="pa2  ba pointer hover w-100 br2 dropdown"
                name="unitType"
                id="unitType"
                value={unitType}
                onChange={handleSelectChange}
              >
                <option value="length">Length</option>
                <option value="area">Area</option>
                <option value="temperature">Temperature</option>
                <option value="time">Time</option>
              </select>
            </div>
          </fieldset>
        </form>
      </main>
      <ConvertorFrom
        dropdownArr={slectedType}
        amount={amount}
        from={from}
        to={to}
        onChange={onInputChange}
        onSubmit={handleOnSubmit}
        isAmountValid={isAmountValid}
        inputLabel={"Value"}
        onViewChange={onViewChange}
        isUnitOn={isUnitOn}
      />
      <Results
        result={result}
        defaultMsg={"Please Enter Value to do Conversion"}
      />
    </>
  );
}

export default Unit;
