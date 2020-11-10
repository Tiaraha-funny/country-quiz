import React from "react";
import LoseButtons from "./LoseButtons";
import adventure from "./images/undraw_adventure.svg";

function QuizsComponents({
  randomOptions,
  randomCountry,
  bgBtns,
  userIsWin,
  goodGuess,
  checkWin,
}) {

  return (
    <div className="main">
      <div className="wrapper">
      <img src={adventure} className="headerImg" />
        <div className="content">
          <h2>Which country does this flag belong to ?</h2>
        </div>
        <div className="flags">
          <img className="images" src={randomCountry.flag} alt="Country flag" />
        </div>
        <h3>
          Score: {goodGuess}
        </h3>
      </div>
      <div className="btn-wrapper">
        <button

          style={bgBtns}
          value={randomOptions[0]}
          onClick={() => checkWin(randomOptions[0])}
        >
          {randomOptions[0]}
        </button>
        <button
          style={bgBtns}
          value={randomOptions[1]}
          onClick={() => checkWin(randomOptions[1])}
        >
          {randomOptions[1]}
        </button>
        <button
          style={bgBtns}
          value={randomOptions[2]}
          onClick={() => checkWin(randomOptions[2])}
        >
          {randomOptions[2]}
        </button>
        <button
          style={bgBtns}
          value={randomOptions[3]}
          onClick={() => checkWin(randomOptions[3])}
        >
          {randomOptions[3]}
        </button>
        {userIsWin ? <button>Try again</button> : <button>Next</button>}
      </div>
    </div>
  );
}

export default QuizsComponents;
