import React, { useState } from "react";

//import all the component needed

import WinComponents from "./WinComponents";
import adventure from "./images/undraw_adventure.svg";

//I destructure the variables needed instead of propping it by using props

function QuizsComponents({
  randomOptions,
  randomCountry,
  bgBtns,
  question,
  score,
  setScore,
  checkWin,
  nextButton,
  setNextButton,
  countries,
  getRandomCountry,
  handleClick,
  rightAnswer,
  number,
}) {
  //Setting the state of the modal to show the result

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
    setScore(0);
    setNextButton(false);
    getRandomCountry();
  };

  //Return this component when the quiz is opened

  return (
    <div className="main">
      <div className="wrapper">
        <img src={adventure} alt="winner of the world" className="headerImg" />
        <div className="content">
          <p style={{ fontSize: "30px" }}>
            {!countries.length && "Loading....."}
          </p>

          {number === 0 && 
                <header>
                    <img src={randomCountry.flag}/>
                    <h3>Which country does this flag belong to?</h3>
                </header>} 
            {number === 1 && <h3>{randomCountry.capital} is the the capital of </h3> }
            {number === 2 && <h3>{randomCountry.demonym} are people from </h3>} 

        </div>
      </div>

      <div className="btn-wrapper">
        <button
          style={bgBtns}
          value={randomOptions[0]}
          onClick={checkWin}
          ref={randomOptions[0] === randomCountry.name ? rightAnswer : null}
          className={randomOptions[0] === randomCountry.name ? "rightAnswer" : "wrongAnswer"}
        >

          <div className="btnContent">
            <div className="item">A-</div>
            <div className="name"> {randomOptions[0]}</div>
          </div>
        </button>

        <button
          style={bgBtns}
          value={randomOptions[1]}
          onClick={checkWin}
          ref={randomOptions[1] === randomCountry.name ? rightAnswer : null}
          className={randomOptions[1] === randomCountry.name ? "rightAnswer" : "wrongAnswer"}
        >
          <div className="btnContent">
            <div className="item">B-</div>
            <div className="name"> {randomOptions[1]}</div>
          </div>
        </button>

        <button
          style={bgBtns}
          value={randomOptions[2]}
          onClick={checkWin}
          ref={randomOptions[2] === randomCountry.name ? rightAnswer : null}
          className={randomOptions[2] === randomCountry.name ? "rightAnswer" : "wrongAnswer"}
        >
          <div className="btnContent">
            <div className="item">C-</div>
            <div className="name">{randomOptions[2]} </div>
          </div>
        </button>

        <button
          style={bgBtns}
          value={randomOptions[3]}
          onClick={checkWin}
          ref={randomOptions[3] === randomCountry.name ? rightAnswer : null}
          className={randomOptions[3] === randomCountry.name ? "rightAnswer" : "wrongAnswer"}
        >
          <div className="btnContent">
            <div className="item">D-</div>
            <div className="name"> {randomOptions[3]}</div>
          </div>
        </button>

        <div>
          {nextButton === false ? (
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
        score={score}
        checkWin={checkWin}
        leaveResult={leaveResult}
      />
    </div>
  );
}

export default QuizsComponents;
