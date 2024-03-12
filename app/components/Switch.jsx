/* eslint-disable react/prop-types */
import React, { Component } from "react";
import "../../assets/css/shortcode.css";
import "../../assets/css/widget.css";

// checked="checked"
class Switch extends Component {
  render() {
    return (
      <div onClick={this.props.swap} className="switch switch-horizontal">
        <input id="radio-a" type="radio" name="first-switch" />
        <label>SELL</label>
        <input id="radio-b" type="radio" name="first-switch" />
        <label>BUY</label>
        <span className="toggle-outside">
          <span className="toggle-inside" />
        </span>
      </div>
    );
  }
}
export default Switch;
