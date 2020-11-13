import React, { useEffect, useState } from "react";
import "./index.css";

//importing the display file show it in the state
import QuizsComponents from "./QuizsComponents";

//To show the result, we sreact this element
const container = document.createElement("div");
document.body.appendChild(container);

//I used class here so that it won't be tough for me to handle the if statement

function Country() {
  //this are the state that we are going to access in the browser
  const [countries, setCountries] = useState([]);
  const [randomCountry, setRandomCountry] = useState({});
  const [randomOptions, setRandomOptions] = useState([]);
  const [userIsWin, setUserIsWin] = useState(false);
  const [score, setScore] = useState(0);
  const [bgBtns, setBgBtns] = useState({ backgroundColor: "#ffffff" });
  const [nextButton, setNextButton] = useState(false);
  const [question, setQuestion] = useState("");

  //We use useEffect in hooks to fecth the data by creating this async function

  const fetchCountries = async () => {
    const response = await fetch("https://restcountries.eu/rest/v2/all");
    const data = await response.json();
    setCountries(data);
    getRandomCountry();
    console.log(data);
  };

  //run the fetch countries at once and random it after the button is clicked

  useEffect(() => {
    fetchCountries();
  }, []);

  //run the countries if the countries's lenght started run by the countries

  useEffect(() => {
    if (countries.length) {
      getRandomCountry();
    }
  }, [countries]);

  //To random all of the names of the countries and the flags one by one we are using random method not map it in the display

  function getRandomCountry() {
    //if the lenght of the countries is zero, return it null. if not, random it.

    if (countries.length == 0) return null;

    const random = countries[Math.floor(Math.random() * countries.length)];
    const randomOpt1 = countries[Math.floor(Math.random() * countries.length)];
    const randomOpt2 = countries[Math.floor(Math.random() * countries.length)];
    const randomOpt3 = countries[Math.floor(Math.random() * countries.length)];

    //To get the names from the randoms

    const randomOptions = [
      random.name,
      randomOpt1.name,
      randomOpt2.name,
      randomOpt3.name,
    ];

    //Set these random in place that need them to be set

    setRandomCountry(random);
    setRandomOptions(randomOptions);
    setUserIsWin("");
    setQuestion("is the capital city of");
  }

  //It checkes if the user's guess is true or false

  function checkWin(e) {
    const answer = randomCountry.name;
    const userGuess = e;

    //if the answer is choosen of what the user guess set all of these conditions

    if (answer === userGuess) {
      setUserIsWin(true);
      setNextButton(false);

      setScore((guess) => guess + 1);

      setBgBtns({ backgroundColor: "green" });
      setQuestion("is the capital city of");

      getRandomCountry();
    }

    //if not, change it and set into other thing
    else if (answer !== userGuess) {
      setUserIsWin(false);
      setNextButton(true);

      setBgBtns({ backgroundColor: "red" });

      setQuestion("which country does this flag belong to");
    }

    //to see the right answer in the console log

    console.log(randomCountry.capital);
    console.log(question);
    console.log(answer);
  }

  //Wait a second before the result is came

  setTimeout(() => {
    setUserIsWin(false);
    setBgBtns({ backgroundColor: "#ffffff" });
  }, 1000);

  //return this component to run or state

  return (
    <div>
      <header className="headings">
        <h1>Country Quiz</h1>
      </header>
      <QuizsComponents
        randomCountry={randomCountry}
        randomOptions={randomOptions}
        score={score}
        setScore={setScore}
        checkWin={checkWin}
        bgBtns={bgBtns}
        nextButton={nextButton}
        setNextButton={setNextButton}
        getRandomCountry={getRandomCountry}
        question={question}
        countries={countries}
        userIsWin={userIsWin}
      />
    </div>
  );
}

export default Country;
