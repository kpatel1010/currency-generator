import React from "react";
import "./converterForm.css";
import Radium, { StyleRoot } from "radium";

function ConvertorFrom({
  dropdownArr,
  amount,
  from,
  to,
  onChange,
  onSubmit,
  isAmountValid,
  inputLabel,
}) {
  const style = {
    // Adding media query..
    "@media (min-width: 768px)": {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10px",
    },
  };

  function generateCurrencyList(array) {
    return array.map((curr) => {
      return (
        <option value={curr[0]} key={curr[0]}>
          {`${curr[0]}- ${curr[1]}`}
        </option>
      );
    });
  }

  return (
    <main className="pa2  w-90 mv-5">
      <form className="measure center" onSubmit={onSubmit}>
        <fieldset id="convert" className="ba b--transparent ph0 mh0">
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="amount">
              {inputLabel ? inputLabel : "Amount"}
            </label>
            <input
              className="pa2 input-reset ba pointer br2  w-100"
              type="text"
              name="amount"
              id="amount"
              value={amount}
              onChange={onChange}
            />
            {!isAmountValid && (
              <p className="bg-red pa2 f6">Amount Should Only Be Numbers</p>
            )}
          </div>
          <StyleRoot>
            <div style={style}>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="from">
                  From
                </label>
                <select
                  className="pa2  ba pointer  hover w-100 br2 dropdown"
                  name="from"
                  id="from"
                  value={from}
                  onChange={onChange}
                >
                  {generateCurrencyList(dropdownArr)}
                </select>
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="to">
                  To
                </label>
                <select
                  onChange={onChange}
                  className="pa2  ba pointer hover w-100 br2 dropdown"
                  name="to"
                  id="to"
                  value={to}
                >
                  {generateCurrencyList(dropdownArr)}
                </select>
              </div>
            </div>
          </StyleRoot>
        </fieldset>
        <div className="flex items-center justify-center">
          <input
            className="pa3 bg-white pointer dib w-50 mv3 btn grow"
            type="submit"
            value="Convert"
            disabled={amount !== "" && isAmountValid ? false : true}
          />
        </div>
      </form>
    </main>
  );
}

export default ConvertorFrom;
