/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import Select from "./Select";
import moment from "moment";
import "../styles/Form.css";

const Form = props => {
  const [amount, setAmount] = useState(1);
  const [currencies, setCurrencies] = useState(props.currencies);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setCurrencies(props.currencies);
    setSelectedItem(props.toggle ? props.convertTo : props.base);
  }, [props, selectedItem]);
  const handleInput = e => {
    setAmount(e.target.value);
  };
  const selectItem = (item, id, setShowItems) => {
    if (!props.toggle) {
      if (id === "from") {
        props.setBase(item);
        setSelectedItem(item);
      } else if (id === "to") {
        props.setConvertTo(item);
      }
    } else {
      if (id === "to") {
        props.setBase(item);
      } else if (id === "from") {
        props.setConvertTo(item);
      }
    }
    setShowItems(false);
  };

  const calculate = e => {
    e.preventDefault();
    if (props.toggle === false) {
      props.setResults({
        date: moment
          .unix(selectedItem.data.date._seconds)
          .format("MMMM Do YYYY | h:mm:ss a"),
        amount: formatMoney(amount),
        calculated: formatMoney(selectedItem.data.cash.sell * amount),
        base: selectedItem.data.base,
        convertTo: "JMD",
        sell: formatMoney(selectedItem.data.cash.sell),
        buy: formatMoney(selectedItem.data.cash.buy)
      });
    } else {
      props.setResults({
        date: moment
          .unix(selectedItem.data.date._seconds)
          .format("MMMM Do YYYY | h:mm:ss a"),
        amount: formatMoney(amount),
        calculated: formatMoney(selectedItem.data.cash.buy * amount),
        base: selectedItem.data.base,
        convertTo: "JMD",
        sell: formatMoney(selectedItem.data.cash.sell),
        buy: formatMoney(selectedItem.data.cash.buy)
      });
    }

    props.setShowResults(true);
  };

  const formatMoney = (
    amount,
    decimalCount = 2,
    decimal = ".",
    thousands = ","
  ) => {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();
      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : "")
      );
    } catch (e) {
      // eslint-disable-next-line no-undef
      console.log(e);
    }
  };

  return (
    <form className="mt-2">
      <div className="form-row align-items-center justify-content-around">
        <div className="col-md-4">
          <div className="form-group">
            <label>AMOUNT</label>
            <input
              type="number"
              onChange={handleInput}
              min="0"
              max="1000"
              defaultValue={amount}
              className="form-control form-control-lg amount-input"
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label>FROM</label>
            <Select
              id={props.toggle ? "to" : "from"}
              selectItem={selectItem}
              selectedItem={props.base}
              items={currencies}
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label>TO</label>
            <Select
              id={props.toggle ? "from" : "to"}
              selectedItem={props.convertTo}
              selectItem={selectItem}
              items={currencies}
            />
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <button
            type="submit"
            onClick={e => calculate(e)}
            className="btn btn-block btn-lg convert-btn"
          >
            Convert
          </button>
        </div>
      </div>
    </form>
  );
};
export default Form;
// selectedItem={selectedItem != null ? selectedItem : props.base}
