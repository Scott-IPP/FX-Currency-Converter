import React, { useEffect, useState } from "react";

import CashTable from "./CashTable";
import ChequeTable from "./ChequeTable";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

import axios from "axios";

const MainAdmin = () => {
  const [currencies, setCurrencies] = useState({ currencies: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://fx-currency-converter.firebaseapp.com/api/v1/currencies/"
      );
      setCurrencies(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h1>FX Trader Currencies</h1>
      <hr />
      <div className="row mt-5">
        <div className="col-6">
          <h2>Cash Rates</h2>
          <small className="text-muted">Edit Cash Rates</small>
          <br /> <br />
          <Tab.Container defaultActiveKey="first">
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="first">Buying</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Selling</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <CashTable action={"buy"} currencies={currencies} />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <CashTable action={"sell"} currencies={currencies} />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
        <div className="col-6">
          <h2>Non-Cash Rates</h2>
          <small className="text-muted">Edit Non-Cash Rate</small>
          <br /> <br />
          <Tab.Container defaultActiveKey="first">
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="first">Buying</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Selling</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <ChequeTable currencies={currencies} />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <ChequeTable currencies={currencies} />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

export default MainAdmin;
