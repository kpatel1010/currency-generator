import React, { Component } from "react";
import axios from "axios";
import ConvertorFrom from "../convertorFrom";
import Results from "./Result";
import "../../App.css";
import LoadingSpinner from "../loader";

class Currency extends Component {
  constructor(props) {
    super();
    this.state = {
      amount: "",
      isAmountValid: true,
      from: "USD",
      to: "INR",
      dropdownArr: [],
      result: {},
      isLoading: false,
    };
  }

  componentDidMount() {
    axios
      .get("https://openexchangerates.org/api/currencies.json")
      .then((resp) => resp.data)
      .then((data) => this.setState({ dropdownArr: Object.entries(data) }));
  }

  handleInputChange = (event) => {
    const duplicateState = this.state;
    const { name, value } = event.currentTarget;
    duplicateState[name] = value;
    this.setState({ duplicateState });

    if (isNaN(Number(this.state.amount))) {
      this.setState({ isAmountValid: false });
    } else {
      this.setState({ isAmountValid: true });
    }
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { to, from, amount } = this.state;
    let config = {
      headers: {
        apikey: "AKnAbPi7BI7snwvgT0zyzks2tYgXp9O2",
      },
    };
    axios
      .get(
        `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
        config
      )
      .then((resp) => resp.data)
      .then((data) => {
        this.setState({ isLoading: false });

        if (data.success) {
          this.setState({ result: data });
        }
      })
      .catch((err) => this.setState({ result: {} }));
  };

  render() {
    const { ...all } = this.state;
    const { onViewChange, isUnitOn } = this.props;
    return (
      <>
        <h1 className="f1 set-font tc setCurrencyMargin">Curreny Converter</h1>
        <ConvertorFrom
          {...all}
          onChange={this.handleInputChange}
          onSubmit={this.handleOnSubmit}
          onViewChange={onViewChange}
          isUnitOn={isUnitOn}
        />
        {this.state.isLoading ? (
          <LoadingSpinner />
        ) : (
          <Results
            result={this.state.result}
            defaultMsg={"Please Enter Amount to do Conversion"}
          />
        )}
      </>
    );
  }
}

export default Currency;
