import React, { useEffect, useState } from "react";
import adventure from "./undraw_adventure.svg";
import Button from "./Button";
import "./index.css";

function App() {
  const API_URL = "https://restcountries.eu/rest/v2/";
  const FULL_URL = "/name/";
  const NAME = "https://restcountries.eu/rest/v2/all?fields=name";

  const [quizs, setQuizs] = useState([]);

  const fetchQuizs = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    // console.log(data);
    setQuizs(data);
  };

  useEffect(() => {
    fetchQuizs();
  }, []);

  return (
    <div className="container">
      <img src={adventure} className="headerImg" />
      {quizs.map(quiz => (
        <div key={quiz.flag} className="content">
          <h2>What is the capital of {quiz.capital}?</h2>
          <div className="flags">
            <img src={quiz.flag} className="images" />
          </div>
        </div>
      ))}
      <h2>{quizs.name}</h2>
      <Button quizs={quizs} />
      <Button quizs={quizs} />
      <Button quizs={quizs} />
      <Button quizs={quizs} />
    </div>
  );
}

export default App;
