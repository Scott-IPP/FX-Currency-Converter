import React, { Component } from "react";
import PropTypes from "prop-types";
import CurrencyConverter from "../components/CurrencyConverter";

export default class Widget extends Component {
  render() {
    return (
      <div>
        <CurrencyConverter />
      </div>
    );
  }
}

Widget.propTypes = {
  wpObject: PropTypes.object
};
