import { useEffect, useState } from "react";
import ScrollBar from "./scrollbar/ScrollBar";
import mastermind from "./assets/scrollbar-images/mastermind.png";
import yatzy from "./assets/scrollbar-images/yatzy.png";
import mine from "./assets/scrollbar-images/minesweeper.png";
import hangman from "./assets/scrollbar-images/hangman.png";
import tictactoe from "./assets/scrollbar-images/tic-tac-toe.png";
import etch from "./assets/scrollbar-images/etch-a-sketch.png";
import guessthenumber from "./assets/scrollbar-images/guess-the-number.png";
import recommended from "./assets/recommended.png";
import staffPicks from "./assets/staff-picks.png";
import minesweeper2 from "./assets/minesweeper2.png";
import mastermind2 from "./assets/mastermind2.jpg";
import ticTacToe2 from "./assets/tic-tac-toe2.png";
import recentlyPlayed from "./assets/recently-played.png";

function App() {
  const [recentlyPlayedGames, setRecentlyPlayedGames] = useState<string[]>([]);
  const gamesArray = [
    { image: mine, gameName: "Minesweeper" },
    { image: mastermind, gameName: "Mastermind" },
    { image: hangman, gameName: "Hangman" },
    { image: tictactoe, gameName: "Tic Tac Toe" },
    { image: yatzy, gameName: "Yatzy" },
    { image: guessthenumber, gameName: "Number Guessing Game" },
    { image: etch, gameName: "Etch-A-Sketch" },
  ];

  useEffect(() => {
    const temp = localStorage.getItem("recentlyPlayedGames");
    temp && setRecentlyPlayedGames([...temp]);
  }, []);

  return (
    <div className="App">
      <ScrollBar gamesArray={gamesArray} />
      <div className="all-games-container">
        <div className="all-games-left">
          <div className="game-suggestion-title-wrapper">
            <img
              src={recommended}
              alt="Recently played"
              className="game-suggestion-image"
            />
            <h2>Games you may like</h2>
            {/* <h2>Recently played</h2> */}
          </div>
          <div className="game-suggestion-left-content">
            {gamesArray.map((game, i) => {
              return (
                <div key={i} className="recommended-game-wrapper">
                  <img
                    src={game.image}
                    alt="Game image"
                    className="recommended-game-image"
                  />
                  <h3>{game.gameName}</h3>
                </div>
              );
            })}
          </div>
        </div>
        <div className="all-games-right">
          <div className="game-suggestion-title-wrapper">
            <img
              src={staffPicks}
              alt="Recently played"
              className="game-suggestion-image"
            />
            <h2>Staff picks</h2>
          </div>
          <div className="game-suggestion-right-content">
            <div className="left-grid-column">
              <div className="top-game"></div>
              <div className="bottom-game"></div>
            </div>
            <div className="middle-grid-column">
              <div className="middle-game"></div>
            </div>
            <div className="right-grid-column">
              <div className="top-game"></div>
              <div className="bottom-game"></div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p>
          Idea for this site taken from{" "}
          <a href="https://www.msn.com/en-gb/play" target="_blank">
            MSN Games
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
