import React, { Component } from "react";
import "./App.css";
import { hexToHsluv, hsluvToHex } from "hsluv";

class App extends Component {
  constructor() {
    super();
    this.state = { color: "#ff0000", goClicked: false };
  }
  updateColor = event => {
    this.setState({ color: event.target.value });
  };
  makeSwatches = event => {
    this.setState({ goClicked: true });
    event.preventDefault();
  };
  render() {
    let colorDivs = null;
    if (this.state.goClicked) {
      const [hue, saturation] = hexToHsluv(this.state.color);
      const transformations = [10, 20, 30, 40, 50, 60, 70, 80, 85, 90, 94, 97];
      const hexCodes = transformations.map(modLightness => {
        return hsluvToHex([hue, saturation, modLightness]);
      });

      colorDivs = hexCodes.map(hexCode => (
        <div key={hexCode} style={{ backgroundColor: hexCode }}>
          {hexCode}
        </div>
      ));
    }
    return (
      <div className="App">
        <p className="bigIcon" style={{ color: this.state.color }}>
          R
        </p>
        <form>
          <label>a</label>
          <input value={this.state.color} onChange={this.updateColor} />
          <button onClick={this.makeSwatches}>go</button>
        </form>
        {colorDivs}
      </div>
    );
  }
}

export default App;
