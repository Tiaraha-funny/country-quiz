import React from "react";
import adventure from "./images/undraw_adventure.svg";

function QuizComponents({
  randomOptions,
  randomCountry,
  checkWin,
  nextButton,
  handleClick,
  rightAnswer,
  number,
}) {
  const countryOption = randomCountry?.name?.common;
  let capital =
    randomCountry?.capital?.length > 1
      ? randomCountry?.capital.join(" ")
      : randomCountry?.capital;

  return (
    <>
      <header className="headings">
        <h1>Country Quiz</h1>
      </header>
      <div role="main" className="main">
        <div role="contentinfo" className="wrapper">
          <img
            src={adventure}
            alt="winner of the world"
            className="headerImg"
          />
          <div role="contentinfo" className="content">
            {number === 0 && <h3>{capital} is the the capital of </h3>}
            {number === 1 && (
              <h3>{randomCountry?.demonyms?.eng.f} are people from </h3>
            )}
            {number === 2 && (
              <header>
                <img src={randomCountry.flags.svg} className="images" />
                <h3>Which country does this flag belong to?</h3>
              </header>
            )}
          </div>

          <div role="option" className="btn-wrapper">
            {["A", "B", "C", "D"].map((choice, index) => {
              return (
                <button
                  key={index}
                  role="button"
                  value={randomOptions[index]}
                  onClick={handleClick}
                  ref={
                    randomOptions[index] === countryOption ? rightAnswer : null
                  }
                >
                  <div className="item">{choice}</div>
                  <div className="name"> {randomOptions[index]}</div>
                </button>
              );
            })}
          </div>
          <div role="button">
            {nextButton && (
              <button role="button" className="next" onClick={checkWin}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizComponents;
