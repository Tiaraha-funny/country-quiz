import React, { useEffect, useRef, useState } from "react";
import "./index.css";

//importing the display file show it in the state
import QuizsComponents from "./QuizsComponents";

//To show the result, we creact this element
const container = document.createElement("div");
document.body.appendChild(container);

//I used class here so that it won't be tough for me to handle the if statement

function Country() {
  //these are the states that we are going to access in the browser
  const [countries, setCountries] = useState([]);
  const [randomCountry, setRandomCountry] = useState({});
  const [randomOptions, setRandomOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [nextButton, setNextButton] = useState(false);
  const [userIsWin, setUserIsWin] = useState(false); // isResult

  // added some
  const [showAnswer, setShowAnswer] = useState(false);
  const [IsStart, setIsStart] = useState(false);
  const [number, setNumber] = useState(0);
  const rightAnswer = useRef(null);

  // Left didn't need
  const [bgBtns, setBgBtns] = useState({ backgroundColor: "#ffffff" });
  const [question, setQuestion] = useState("");

  //We use useEffect in hooks to fecth the data by creating this async function

  const fetchCountriesFromApi = async () => {
    const response = await fetch("https://restcountries.eu/rest/v2/all");
    const countryData = await response.json();
    setCountries(countryData);
    //  getRandomCountry();
    //  console.log(data);
  };

  //run the fetch countries at once and random it after the button is clicked

  useEffect(() => {
    fetchCountriesFromApi();
  }, [score]);

  //run the countries if the countries's lenght started run by the countries

  // useEffect(() => {
  //   if (countries.length) {
  //     getRandomCountry();
  //   }
  // }, [countries]);

  //To random all of the names of the countries and the flags one by one we are using random method not map it in the display

  function getRandomCountry() {
    //if the lenght of the countries is zero, return it null. if not, random it.

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
    // setUserIsWin("");
    // setQuestion("is the capital city of");
  }

  function handleClick(e) {
    if (e.target.value === randomCountry.name) {
      setNextButton(true);
      e.target.style.backgroundColor = "#60BF88";
      e.target.style.color = "white";
      e.target.style.borderColor = "#60BF88";
      setShowAnswer(true);
    } else {
      e.target.style.backgroundColor = "#EA8282";
      e.target.style.color = "white";
      e.target.style.borderColor = "#EA8282";
      rightAnswer.current.style.backgroundColor = "#60BF88";
      rightAnswer.current.style.color = "white";
      rightAnswer.current.style.borderColor = "#60BF88";
      setNextButton(true);
      setShowAnswer(false);
    }
  }

  function checkWin() {
    setNumber(Math.floor(Math.random() * 3));
    if (showAnswer) {
      //got to the next question
      getRandomCountry();
      setNextButton(false);
      setScore((prevScore) => prevScore + 1);
      rightAnswer.current.style.backgroundColor = "transparent";
      rightAnswer.current.style.color = "#6066D0";
    } else {
      //display the result
      setUserIsWin(true);
    }
  }

  //It checkes if the user's guess is true or false

  // function checkWin(e) {
  //   const answer = randomCountry.name;
  //   const userGuess = e;
  //
  //   //if the answer is choosen of what the user guess set all of these conditions
  //
  //   if (answer === userGuess) {
  //     setUserIsWin(true);
  //     setNextButton(false);
  //
  //     setScore((guess) => guess + 1);
  //
  //     const filterIdForBgClr = countries.find((bgCl) => bgCl.name != id);
  //     console.log(filterIdForBgClr);
  //     if (filterIdForBgClr) {
  //       setBgBtns({ backgroundColor: "green" });
  //     }
  //     setQuestion("is the capital city of");
  //
  //     getRandomCountry();
  //   }
  //
  //   //if not, change it and set into other thing
  //   else if (answer !== userGuess) {
  //     setUserIsWin(false);
  //     setNextButton(true);
  //
  //     const filterIdForBgClr = countries.find((bgCl) => bgCl.name != id);
  //     console.log(filterIdForBgClr);
  //     if (filterIdForBgClr) {
  //       setBgBtns({ backgroundColor: "red" });
  //     }
  //
  //     setQuestion("which country does this flag belong to");
  //   }
  //
  //   //to see the right answer in the console log
  //
  //   console.log(randomCountry.capital);
  //   console.log(question);
  //   console.log(answer);
  // }
  //
  // //Wait a second before the result is came
  //
  // setTimeout(() => {
  //   setUserIsWin(false);
  //   setBgBtns({ backgroundColor: "#ffffff" });
  // }, 1000);

  //return this component to run or state

  return (
    <div>
      <header className="headings">
        <h1>Country Quiz</h1>
      </header>

      <div>
        <QuizsComponents
          randomCountry={randomCountry}
          randomOptions={randomOptions}
          score={score}
          setScore={setScore}
          checkWin={checkWin}
          nextButton={nextButton}
          setNextButton={setNextButton}
          getRandomCountry={getRandomCountry}
          question={question}
          countries={countries}
          userIsWin={userIsWin}
          handleClick={handleClick}
          rightAnswer={rightAnswer}
          number={number}
        />
      </div>
    </div>
  );
}

export default Country;
