import React from "react";
import winSvg from "./images/undraw_winners.svg";
import adventure from "./images/undraw_adventure.svg";

function Result({
  score,
  setUserIsWin,
  getRandomCountry,
  setScore,
  setNextButton,
}) {
  function handleClickBtn() {
    //reset everything to default
    setUserIsWin(false);
    getRandomCountry();
    setScore(0);
    setNextButton(false);
  }

  console.log(score);

  return (
    <div>
      <header className="headings">
        <h1>Country Quiz</h1>
      </header>
      <div className="modal-main">
        <div className="main-wrapper">
          <div>
            <img src={winSvg} />
          </div>
          <h2>Results</h2>
          <p>
            You got <b className="score">{score}</b> correct answers
          </p>
          <button className="tryAgainBtn" onClick={handleClickBtn}>
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
