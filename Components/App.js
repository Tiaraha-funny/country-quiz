import React, { useEffect, useRef, useState } from "react";
import "./index.css";

//importing the display file to show it in the state
import QuizsComponents from "./QuizsComponents";
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
    console.log(e.currentTarget.value === randomCountry.name);

    if (e.currentTarget.value === randomCountry.name) {
      setNextButton(true);
      e.currentTarget.style.backgroundColor = "#60BF88";
      e.currentTarget.style.borderColor = "#60BF88";
      rightAnswer.current.classList.add("tickTrue");
      setShowAnswer(true);
    } else if (e.currentTarget.value !== randomCountry.name) {
      e.currentTarget.style.backgroundColor = "#EA8282";
      e.currentTarget.style.borderColor = "#EA8282";
      rightAnswer.current.style.backgroundColor = "#60BF88";
      e.currentTarget.classList.add("tickFalse");
      rightAnswer.current.classList.add("tickTrue");
      rightAnswer.current.style.borderColor = "#60BF88";
      setNextButton(true);
      setShowAnswer(false);
    }
  }

  function checkWin() {
    setNumber(Math.floor(Math.random() * 3));
    if (showAnswer) {
      getRandomCountry();
      setNextButton(false);
      setScore((prevScore) => prevScore + 1);
      rightAnswer.current.style.backgroundColor = "#ffffff";
      rightAnswer.current.style.borderColor = "#6066D0";
      e.currentTarget.style.backgroundColor = "#EA8282";
    } else if (!showAnswer) {
      setUserIsWin(true);
    }
  }

  //return this component to run or state

  return (
    <div>

      {IsStart ? (
        <div>
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
            <QuizsComponents
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
    </div>
  );
}

export default Country;
