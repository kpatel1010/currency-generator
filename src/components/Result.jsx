import React from "react";
import "./Result.css";

function Results({ result }) {
  let message = Object.keys(result).length
    ? `${Number.parseFloat(result.query.amount).toFixed(2)} ${
        result.query.from
      } = ${Number.parseFloat(result.result).toFixed(2)} ${result.query.to}`
    : "Please Enter Amount to do Conversion";

  return (
    <div className="flex items-center mv5 justify-center pa3 navy br4 result-box">
      <span
        className="lh-title ml3 f3 ma3 white"
        style={{ textAlign: "center" }}
      >
        {message}
      </span>
    </div>
  );
}

export default Results;
