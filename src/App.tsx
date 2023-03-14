import ScrollBar from "./scrollbar/ScrollBar";
import recentlyPlayed from "./assets/recently-played.png";
import { useEffect, useState } from "react";
import mastermind from "./assets/scrollbar-images/mastermind.png";
import yatzy from "./assets/scrollbar-images/yatzy.png";
import mine from "./assets/scrollbar-images/mine.png";
import hangman from "./assets/scrollbar-images/hangman.png";
import tictactoe from "./assets/scrollbar-images/tic-tac-toe.png";
import etch from "./assets/scrollbar-images/etch.png";
import guessthenumber from "./assets/scrollbar-images/guess-the-number.png";

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
    { image: etch, gameName: "Etch-A-Sketch" },
    { image: etch, gameName: "Etch-A-Sketch" },
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
          <div className="recently-played-title-wrapper recommended-title-wrapper">
            <img
              src={recentlyPlayed}
              alt="Recently played"
              className="recently-played-image"
            />
            <h2>Recently played</h2>
          </div>
          <div className="recently-played-content recommended-content">
            {gamesArray.map((game, i) => {
              return (
                <div className="recommended-game-wrapper">
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
        <div className="all-games-right"></div>
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
