import React from "react";
import "./converterForm.css";

function ConvertorFrom({
  currency,
  amount,
  from,
  to,
  onChange,
  onSubmit,
  isAmountValid,
}) {
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
              Amount
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
              <p className="bg-red pa2  f6">Amount Should Only Be Numbers</p>
            )}
          </div>
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
              {generateCurrencyList(currency)}
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
              {generateCurrencyList(currency)}
            </select>
          </div>
        </fieldset>
        <div className="flex items-center justify-center">
          <input
            className="pa3  bg-white pointer dib w-40 mv4 btn grow"
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
