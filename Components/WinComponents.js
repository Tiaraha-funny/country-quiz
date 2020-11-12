import React, { Component } from "react";
import winSvg from "./images/undraw_winners.svg";
import "./index.css";

function WinComponents({ goodGuess, show, leaveResult }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <div className="main-wrapper">
          <div>
            <img src={winSvg} />
          </div>
          <div className="modal-headings">
            <h2>Results</h2>
            <h3>You got: {goodGuess} correct answer </h3>
          </div>
          <button onClick={leaveResult} className="tryBtn">
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

export default WinComponents;
