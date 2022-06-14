import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.initialState = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      numGuesses: 0,
      totalGuesses: 5,
      attemptsLeft: 10,
      // Insert form input state here
      value: '',
      win: false
    };
    this.state = {...this.initialState};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.outOfGuesses = this.outOfGuesses.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  restartGame(event){
    this.setState((prevState) => {
      return {
        ...prevState,
        currWord: getRandomWord(),
        guessedLetters: [],
        numGuesses: 0,
        totalGuesses: 5,
        attemptsLeft: 10,
        value: '',
        win: false
      }
    });
  }

  // Insert form callback functions handleChange and handleSubmit here
  handleChange(event) {
    let str = event.target.value;
    let lastChar = str.charAt(str.length-1);
    this.setState({
      value: event.target.value,
      gussedLetters: this.state.guessedLetters.push(lastChar)
    });
    this.setState((prevState => ({
      attemptsLeft: prevState.attemptsLeft - 1
    })));
    this.checkWin();
  }

  handleSubmit(event) {
    this.setState((prevState) => ({
      numGuesses: prevState.numGuesses + 1,
      totalGuesses: prevState.totalGuesses - 1
    }));
    event.preventDefault();
  }

  outOfGuesses = () => {
    let text = "The word was: " + this.state.currWord;
    this.restartGame();
    return alert(text);
  }

  checkWin = () => {
    let myset = [];
    myset = [...this.state.guessedLetters];
    let bools = 1;
    console.log(myset);
    console.log(this.state.currWord);
    let newArr = [...this.state.currWord.split("")];
    for (let i = 0; i<newArr.length; i++){
      if (myset.includes(newArr[i])){
        bools *= 1;
      } else {
        bools *= 0;
      }
      console.log(bools);
    }
    if (bools) { // has won
      return this.setState((prevState) => ({
        ...prevState,
        win: true
      }));
    } else {
      return;
    }
  }

  winLogic = () => {
    if (this.state.win === true){
      return alert("Congratulations you have won!!");
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {this.generateWordDisplay()}
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "-"}
          <h4>You have {this.state.attemptsLeft} attempts left</h4>
          <h3>Input</h3>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <h3>
            {this.state.guessedLetters}
          </h3>
          <h3>
            {this.state.attemptsLeft <= 0
              ? this.outOfGuesses() : ""}
          </h3>
          <button onClick={this.restartGame}>
            Would you like to restart?
          </button>
          <div>
            {this.winLogic()}
          </div>
        </header>
      </div>
    );
  }
}

export default App;