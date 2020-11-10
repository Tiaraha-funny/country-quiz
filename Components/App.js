import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./index.css";

//importing the display file show it in the state
import QuizsComponents from "./QuizsComponents";
import WinComponents from "./WinComponents";

//I used class here so that it won't be tough for me to handle the if statement

class Country extends Component {
  constructor(props) {
    //By using class we have to set this constructor followed by super method and the state after that
    super(props);
    //this are the state that we are going to access in the browser
    this.state = {
      countries: [],
      randomCountry: {},
      randomOptions: [],
      userIsWin: false,
      goodGuess: 0,
      bgBtns: { backgroundColor: "#ffffff" },
    };

    //We have to use bind in class component to access our functions

    this.getRandomCountry = this.getRandomCountry.bind(this);
    this.checkWin = this.checkWin.bind(this);
  }

  //Instead of using useEffect in hooks we use componentDidMount in class but they are the same uses

  async componentDidMount() {
    const COUNTRY_URL = "https://restcountries.eu/rest/v2/all";
    const NAME = "https://restcountries.eu/rest/v2/all?fields=name";

    const res = await fetch(COUNTRY_URL);
    const data = await res.json();
    this.setState({ countries: data });
    this.getRandomCountry();
  }

  //To random all of the names of the countries and the flags one by one we are using random method not map it in the display

  getRandomCountry() {
    const random = this.state.countries[
      Math.floor(Math.random() * this.state.countries.length)
    ];
    const randomOpt1 = this.state.countries[
      Math.floor(Math.random() * this.state.countries.length)
    ];
    const randomOpt2 = this.state.countries[
      Math.floor(Math.random() * this.state.countries.length)
    ];
    const randomOpt3 = this.state.countries[
      Math.floor(Math.random() * this.state.countries.length)
    ];

    //To get the names from the randoms

    const randomOptions = [
      random.name,
      randomOpt1.name,
      randomOpt2.name,
      randomOpt3.name,
    ];

    //We are looping over the randoms to get the other

    function loopTheCountriesThroughArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    loopTheCountriesThroughArray(randomOptions);

    this.setState({
      randomCountry: random,
      randomOptions: randomOptions,
      userIsWin: false,
    });
  }

  //It checkes if the user's guess is true or false

  checkWin(event) {
    const answer = this.state.randomCountry.name;
    const userGuess = event;

    if (answer === userGuess) {
      this.setState({
        userIsWin: true,
        goodGuess: this.state.goodGuess + 1,
        bgBtns: { backgroundColor: "green" },
      })
    } 
    else {
      this.setState({
        userIsWin: false,
        bgBtns: { backgroundColor: "red" },
      });
    }

    console.log(answer);

    //Wait a second before the result is came

    setTimeout(() => {
      this.getRandomCountry();
      this.setState({
        userIsWin: false,
        bgBtns: { backgroundColor: "#ffffff" },
      });
    }, 1000);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/">
            <QuizsComponents
              randomCountry={this.state.randomCountry}
              randomOptions={this.state.randomOptions}
              userGuess={this.state.userGuess}
              goodGuess={this.state.goodGuess}
              checkWin={this.checkWin}
              bgBtns={this.state.bgBtns}
              nextQuestion={this.nextQuestion}
            />
          </Route>
          <Route path="/">
            <WinComponents
              goodGuess={this.state.goodGuess}
              checkWin={this.checkWin}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default Country;
