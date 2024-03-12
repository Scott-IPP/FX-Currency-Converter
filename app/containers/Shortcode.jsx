import React, { Component } from "react";
import PropTypes from "prop-types";
import CurrencyConverter from "../components/CurrencyConverter";

export default class Shortcode extends Component {
  render() {
    return (
      <div>
        <CurrencyConverter />
      </div>
    );
  }
}

Shortcode.propTypes = {
  wpObject: PropTypes.object
};
