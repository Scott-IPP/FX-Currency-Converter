import React, { useEffect, useState } from "react";
import axios from "axios";
import IPPSwitch from "./IPPSwitch";
import Form from "./Form";
import Results from "./Results";
import "../styles/App.css";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState({ currencies: [] });
  const [base, setBase] = useState(null);
  const [convertTo, setConvertTo] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [results, setResults] = useState({
    date: "",
    amount: 0,
    calculated: 0,
    base: "",
    convertTo: "",
    sell: 0,
    buy: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://fx-currency-converter.firebaseapp.com/api/v1/currencies/"
      );
      setCurrencies(result.data);
      setBase(result.data && result.data[4]);
      setConvertTo({
        data: {
          base: "JMD",
          image:
            "https://firebasestorage.googleapis.com/v0/b/fx-currency-converter.appspot.com/o/JMD.png?alt=media&token=b94977bf-77e7-480c-9dd9-1878608249a1",
          name: "Jamaican Dollar",
          id: "JMD"
        }
      });
    };
    fetchData();
  }, []);

  const swap = () => {
    setBase(convertTo);
    setConvertTo(base);
    setToggle(!toggle);
  };

  return (
    <div className="card py-4 px-4">
      <div className="card-body">
        <div className="row align-items-top justify-content-between">
          <div className="col-md-8">
            <h4 className="card-title">FX CURRENCY CONVERTER</h4>
          </div>
          <div className="col-md-3">
            <IPPSwitch toggle={toggle} swap={swap} />
          </div>
        </div>
        <hr className="fx-hr" />
        <br />
        <Form
          setResults={setResults}
          setShowResults={setShowResults}
          showResults={showResults}
          setBase={setBase}
          base={base}
          toggle={toggle}
          convertTo={convertTo}
          setConvertTo={setConvertTo}
          currencies={currencies}
        />
        {showResults ? (
          <Results setShowResults={setShowResults} results={results} />
        ) : (
          <div className="row align-items-center justify-content-center mt-4">
            <small>
              *Switch between non-cash and cash for your currency conversions.
              Rates are subject to change without notice.
            </small>
          </div>
        )}
      </div>
    </div>
  );
};
export default CurrencyConverter;
