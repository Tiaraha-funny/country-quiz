import React from "react";
import winSvg from "./images/undraw_winners.svg";

function Result({
  score,
  setUserIsWin,
  getRandomCountry,
  setScore,
  setNextButton,
}) {
  function handleClickBtn() {
    setUserIsWin(false);
    getRandomCountry();
    setScore(0);
    setNextButton(false);
  }

  return (
    <div role="dialog">
      <header className="headings">
        <h1>Country Quiz</h1>
      </header>
      <div role="article" className="modal-main">
        <div role="contentinfo" className="main-wrapper">
          <div role="img">
            <img src={winSvg} />
          </div>
          <h2>Results</h2>
          <p>
            You got:<q> {score}</q> correct {score < 1 ? "answer" : "answers"}
          </p>
          <button
            role="button"
            className="tryAgainBtn"
            onClick={handleClickBtn}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
