import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { color: "#ff0000" };
  }
  updateColor = event => {
    this.setState({ color: event.target.value });
    console.log(event.target.value);
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="bigIcon" style={{ color: this.state.color }}>
            R
          </p>
          <form>
            <label>a</label>
            <input value={this.state.color} onChange={this.updateColor} />
            <button>go</button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
