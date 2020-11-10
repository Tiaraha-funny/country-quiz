import React, { Component } from "react";
import { winSvg } from "./images/undraw_winners.svg";

function WinComponents({ goodGuess }) {
  return (
    <div className="main">
      <div className="wrapper">
        <div>
          <img src={winSvg} />
        </div>
        <div className="headings">
          <h2>Results</h2>
          <h3>You got: {goodGuess} correct answer </h3>
        </div>
      </div>
      <button>Try again</button>
    </div>
  );
}

export default WinComponents;