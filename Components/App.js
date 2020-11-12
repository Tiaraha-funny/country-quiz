import React, { useEffect, useState } from "react";

import "./index.css";

//importing the display file show it in the state
import QuizsComponents from "./QuizsComponents";

//To show the result, we sreact this element
const container = document.createElement("div");
document.body.appendChild(container);

//I used class here so that it won't be tough for me to handle the if statement

function Country(props) {
  //this are the state that we are going to access in the browser
  const [countries, setCountries] = useState([]);
  const [randomCountry, setRandomCountry] = useState({});
  const [randomOptions, setRandomOptions] = useState([]);
  const [userIsWin, setUserIsWin] = useState(false);
  const [goodGuess, setGoodGuess] = useState(0);
  const [bgBtns, setBgBtns] = useState({ backgroundColor: "#ffffff" });
  const [nextButton, setNextButton] = useState(false);
  const [hover, setHover] = useState(false);
  const [question, setQuestion] = useState("");

  //Instead of using useEffect in hooks we use componentDidMount in class but they are the same uses

  useEffect(() => {
    const COUNTRY_URL = "https://restcountries.eu/rest/v2/all";
    async function fetchApi() {
      const res = await fetch(COUNTRY_URL);
      const data = await res.json();
      setCountries({ countries: data });
      getRandomCountry();
    }
    fetchApi();

  }, []);

  //To random all of the names of the countries and the flags one by one we are using random method not map it in the display

  function getRandomCountry() {
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

    //We are looping over the randoms to get the other country names

    function loopTheCountriesThroughArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    loopTheCountriesThroughArray(randomOptions);

    setRandomCountry({ random });
    setRandomOptions([random]);
    setUserIsWin(false);
    setQuestion("is the capital city of");
  }

  //It checkes if the user's guess is true or false

  function checkWin(e) {

    const answer = randomCountry.name;
    const userGuess = e;

    if (answer === userGuess) {
      setUserIsWin(true);
      setNextButton(false);

      setGoodGuess((guess) => {
        guess.goodGuess + 1;
      });

      setBgBtns({ backgroundColor: "green" });
      setQuestion("is the capital city of");

      getRandomCountry();

    } else if (answer !== userGuess) {
      setUserIsWin(false);
      setNextButton(true);

      setBgBtns({ backgroundColor: "red" });

      setQuestion("which country does this flag belong to");
    }

    console.log(userIsWin);
    console.log(randomCountry.capital);
    console.log(question);
    console.log(answer);
  }

  //Wait a second before the result is came

  setTimeout(() => {
    setUserIsWin(false);
    setBgBtns({ backgroundColor: "#ffffff" });
  }, 1000);

  //If the mouse is hovering the buttons, the background color changes
  function mouseHover() {
    setHover({
      hover: true,
    });
  }

  return (
    <div>
      <header className="headings">
        <h1>Country Quiz</h1>
      </header>
      <QuizsComponents
        randomCountry={randomCountry}
        randomOptions={randomOptions}
        goodGuess={goodGuess}
        checkWin={checkWin}
        bgBtns={bgBtns}
        nextButton={nextButton}
        mouseHover={mouseHover}
        getRandomCountry={getRandomCountry}
        question={question}
        countries={countries}
        userIsWin={userIsWin}
      />
    </div>
  );
}

export default Country;
