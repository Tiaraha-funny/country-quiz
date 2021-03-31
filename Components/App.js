import React, { useEffect, useRef, useState } from "react";
import "./index.css";

//importing the display file to show it in the state
import QuizComponents from "./QuizComponents";
import Result from "./Result";

//I used class here so that it won't be tough for me to handle the if statement

function Country() {
  //these are the states that we are going to access in the browser
  const [countries, setCountries] = useState([]);
  const [randomCountry, setRandomCountry] = useState({});
  const [randomOptions, setRandomOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [nextButton, setNextButton] = useState(false);
  const [userIsWin, setUserIsWin] = useState(false); // isResult
  const [showAnswer, setShowAnswer] = useState(false);
  const [IsStart, setIsStart] = useState(false);
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(true);

  const rightAnswer = useRef(null);

  //We use useEffect in hooks to fecth the data by creating this async function

  const fetchCountriesFromApi = async () => {
    const response = await fetch("https://restcountries.eu/rest/v2/all");
    const countryData = await response.json();
    setCountries(countryData);
  };

  //run the fetch countries at once and random it after the button is clicked

  useEffect(() => {
    fetchCountriesFromApi();
    setLoading(false)
  }, []);

  function getRandomCountry() {
    setIsStart(true);

    if (countries.length == 0) return null;

    const randomName = countries[Math.floor(Math.random() * countries.length)];
    const randomFirstOption =
      countries[Math.floor(Math.random() * countries.length)];
    const randomSecondOption =
      countries[Math.floor(Math.random() * countries.length)];
    const randomThirdOption =
      countries[Math.floor(Math.random() * countries.length)];

    //To get the names from the randoms

    const randomOptions = [
      randomName.name,
      randomFirstOption.name,
      randomSecondOption.name,
      randomThirdOption.name,
    ];

    randomOptions.sort(() => {
      return 0.5 - Math.random();
    });

    //Set these random in place that need them to be set

    setRandomCountry(randomName);
    setRandomOptions(randomOptions);
  }

  function handleClick(e) {
  
    if (e.currentTarget.value === randomCountry.name && !nextButton) {
      setNextButton(true);
      e.currentTarget.classList.add("right-answer");
      setShowAnswer(true);
    } else if (e.currentTarget.value !== randomCountry.name && !nextButton) {
      e.currentTarget.classList.add("wrong-answer");
      rightAnswer.current.classList.add("right-answer");
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

  //return this component to run or state

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
            <>{loading 
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
