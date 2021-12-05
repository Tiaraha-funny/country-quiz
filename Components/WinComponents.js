import React from "react";
import winSvg from "./images/undraw_winners.svg";
import adventure from "./images/undraw_adventure.svg";
import "./index.css";

function WinComponents({ score, show, leaveResult }) {
  //add some classes when it the result appeares and when it desappears
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  //Return this component for the form of resutl

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <div>
          <img src={adventure} alt="winner of the world" className="headerImg" />
        </div>
        <div className="main-wrapper">
          <div>
            <img src={winSvg} />
          </div>
          <div className="modal-headings">
            <h2>Results</h2>
            <h3>
              You got:<q> {score}</q> correct answer{" "}
            </h3>
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
