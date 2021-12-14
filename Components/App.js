import React, { useEffect, useRef, useState } from "react";
import "./index.css";

import QuizComponents from "./QuizComponents";
import Result from "./Result";

const API_URL = 'https://restcountries.com/v3.1/all'


function Country() {

  const [countries, setCountries] = useState([]);
  const [randomCountry, setRandomCountry] = useState({});
  const [randomOptions, setRandomOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [nextButton, setNextButton] = useState(false);
  const [userIsWin, setUserIsWin] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [IsStart, setIsStart] = useState(false);
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(true);

  const rightAnswer = useRef(null);


  const fetchCountriesFromApi = async () => {
    const response = await fetch(API_URL);
    const countryData = await response.json();
    setCountries(countryData);
  };



  useEffect(() => {
    fetchCountriesFromApi();
  }, []);

  function getRandomCountry() {
    setIsStart(true)

    if (countries.length === 0) return null;

    const randomName = countries && countries[Math.floor(Math.random() * countries.length)];
    const randomFirstOption = countries &&
      countries[Math.floor(Math.random() * countries.length)];
    const randomSecondOption = countries &&
      countries[Math.floor(Math.random() * countries.length)];
    const randomThirdOption = countries &&
      countries[Math.floor(Math.random() * countries.length)];


    const randomOptions = [
      randomName.name?.common,
      randomFirstOption.name?.common,
      randomSecondOption.name?.common,
      randomThirdOption.name?.common,
    ];

    randomOptions.sort(() => {
      return 0.5 - Math.random();
    });

    setRandomCountry(randomName);
    setRandomOptions(randomOptions);
  }

  function handleClick(e) {
    const choice = e.target.value
    const answer = randomCountry.name.common;
   
    if (choice === answer && !nextButton) {
      e.target.classList.add("right-answer");
      setNextButton(true);
      setShowAnswer(true);
    } else if (choice !== answer && !nextButton) {
      rightAnswer.current.classList.add("right-answer");
      // console.log(e.currentTarget);
      e.currentTarget.classList.add("wrong-answer");
      setNextButton(true);
      setShowAnswer(false);
    }
  }

  function checkWin(e) {
    setNumber(Math.floor(Math.random() * 3));
    rightAnswer.current.classList.remove("right-answer");
    if (showAnswer) {
      getRandomCountry();
      setNextButton(false);
      setUserIsWin(false);
      setScore((prevScore) => prevScore + 1);
    } else if (!showAnswer) {
      setUserIsWin(true);
    }
  }



  return (
    <>
      {IsStart ? (
        <div className="container">
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
            <>{!countries.length === 0
              ? <h3>Loading...</h3>
              : <QuizComponents
                randomCountry={randomCountry}
                randomOptions={randomOptions}
                nextButton={nextButton}
                checkWin={checkWin}
                handleClick={handleClick}
                rightAnswer={rightAnswer}
                number={number}
                countries={countries}
              />
            }</>
          )}
        </div>
      ) : (
        <div className="startBtn">
          <header className="headings__start">
            <h1>Country Quiz</h1>
          </header>
          <button onClick={getRandomCountry} className="startQuiz">
            Start Game
          </button>
        </div>
      )}
    </>
  );
}

export default Country;
