import React, { useState } from "react";
import WinComponents from "./WinComponents";
import adventure from "./images/undraw_adventure.svg";

function QuizsComponents({
  randomOptions,
  randomCountry,
  bgBtns,
  question,
  goodGuess,
  checkWin,
  button,
  countries,
  mouseHover,
  hover,
  getRandomCountry,
}) {
  const [show, setShow] = useState(false);

  //To show the result when the answer is not true

  const showResult = (e) => {
    e.preventDefault();
    console.log("Give the result");
    setShow(true);
  };

  // When the user want to try again, click the button and change into another question

  const leaveResult = (e) => {
    e.preventDefault();
    console.log("go back to try");
    setShow(false);
    getRandomCountry();
  };

  //When the moise is hoveing the buttons the style is changing

  let hoverStyle;
  if (hover) {
    hoverStyle = {
      backgroundColor: "#F9A826",
    };
  }

  return (
    <div className="main">
      <div className="wrapper">
        <img src={adventure} className="headerImg" />
        <div className="content">

          <p>{!countries.length && "Loading..."}</p>
          
          <h2>
            {question === "which country does this flag belong to" ? (
              <div className="flags">
                <img
                  className="images"
                  src={randomCountry.flag}
                  alt="Country flag"
                />
                <br /> {question} ?
              </div>
            ) : (
              <div>
                {randomCountry.capital} {question} ?
              </div>
            )}
          </h2>
        </div>
      </div>
      <div className="btn-wrapper">

        <button
          className="btns"
          style={bgBtns}
          value={randomOptions[0]}
          onClick={() => checkWin(randomOptions[0])}
          onMouseOver={mouseHover}
        >
          <div>A-</div>
          <div className="name"> {randomOptions[0]}</div>
        </button>

        <button
          onMouseOver={mouseHover}
          className="btns"
          style={bgBtns}
          value={randomOptions[1]}
          onClick={() => checkWin(randomOptions[1])}
        >
          <div>B-</div> 
          <div className="name"> {randomOptions[1]}</div>
        </button>

        <button
          onMouseOver={mouseHover}
          className="btns"
          style={bgBtns}
          value={randomOptions[2]}
          onClick={() => checkWin(randomOptions[2])}
        >
          <div>C-</div>
          <div className="name">{randomOptions[2]} </div>
        </button>

        <button
          onMouseOver={mouseHover}
          className="btns"
          style={bgBtns}
          value={randomOptions[3]}
          onClick={() => checkWin(randomOptions[3])}
        >
          <div>D-</div> 
          <div className="name"> {randomOptions[3]}</div>
        </button>

        <div>
          {button === false ? (
            ""
          ) : (
            <button className="next" onClick={showResult}>
              Next
            </button>
          )}
        </div>

      </div>

      <WinComponents
        showResult={showResult}
        show={show}
        goodGuess={goodGuess}
        checkWin={checkWin}
        leaveResult={leaveResult}
      />
    </div>
  );
}

export default QuizsComponents;
