import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import QuizComponents from "./QuizComponents";
import Result from "./Result";

const API_URL = "https://restcountries.com/v3.1/all";

const Country = () => {
  const rightAnswer = useRef(null);
  const [countries, setCountries] = useState([]);
  const [randomCountry, setRandomCountry] = useState({});
  const [randomOptions, setRandomOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [nextButton, setNextButton] = useState(false);
  const [userIsWin, setUserIsWin] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [number, setNumber] = useState(0);

  const fetchCountriesFromApi = async () => {
    const response = await fetch(API_URL);
    const countryData = await response.json();
    setCountries(countryData);
  };

  useEffect(() => {
    fetchCountriesFromApi();
  }, []);

  const getRandomCountry = () => {
    setIsStart(true);
    if (countries.length === 0) return;

    const getRandom = () =>
      countries[Math.floor(Math.random() * countries.length)];

    const randomName = getRandom();
    const randomOptions = [randomName, getRandom(), getRandom(), getRandom()]
      .map((country) => country.name.common)
      .sort(() => Math.random() - 0.5);

    setRandomCountry(randomName);
    setRandomOptions(randomOptions);
  };

  const handleClick = (e) => {
    const choice = e.currentTarget.value;
    const answer = randomCountry.name.common;

    if (!nextButton) {
      if (choice === answer) {
        e.currentTarget.classList.add("right-answer");
        setShowAnswer(true);
      } else {
        rightAnswer.current.classList.add("right-answer");
        e.currentTarget.classList.add("wrong-answer");
        setShowAnswer(false);
      }
      setNextButton(true);
    }
  };

  const checkWin = () => {
    setNumber(Math.floor(Math.random() * 3));
    rightAnswer.current.classList.remove("right-answer");
    if (showAnswer) {
      getRandomCountry();
      setNextButton(false);
      setUserIsWin(false);
      setScore((prevScore) => prevScore + 1);
    } else {
      setUserIsWin(true);
    }
  };

  const startGame = () => {
    setIsStart(true);
    getRandomCountry();
  };

  return (
    <>
      {isStart ? (
        <div role="definition" className="container">
          {userIsWin ? (
            <Result
              score={score}
              setUserIsWin={setUserIsWin}
              randomCountry={randomCountry}
              randomOptions={randomOptions}
              getRandomCountry={getRandomCountry}
              setScore={setScore}
              setNextButton={setNextButton}
            />
          ) : (
            <>
              {!countries ? (
                <h3>Loading...</h3>
              ) : (
                <QuizComponents
                  randomCountry={randomCountry}
                  randomOptions={randomOptions}
                  nextButton={nextButton}
                  checkWin={checkWin}
                  handleClick={handleClick}
                  rightAnswer={rightAnswer}
                  number={number}
                  countries={countries}
                />
              )}
            </>
          )}
        </div>
      ) : (
        <div role="button" className="startBtn">
          <header className="headings__start">
            <h1>Country Quiz</h1>
          </header>
          <button role="button" onClick={startGame} className="startQuiz">
            Start Game
          </button>
        </div>
      )}
    </>
  );
};

export default Country;
