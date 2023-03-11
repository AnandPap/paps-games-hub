import puzzle from "./assets/puzzle.png";
import yatzy from "./assets/yatzy.png";
import GameButton from "./GameButton";
import { useRef, useState } from "react";
import ScrollButton from "./ScrollButton";

function App() {
  const [totalScrollOffset, setTotalScrollOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const gameButonsArray = [
    { image: puzzle, text: "Etch A Sketch" },
    { image: yatzy, text: "Yatzy" },
    { image: puzzle, text: "Hangman" },
    { image: puzzle, text: "Tic Tac Toe" },
    { image: puzzle, text: "Minesweeper" },
    { image: puzzle, text: "Mastermind" },
    { image: puzzle, text: "Number Guessing Game" },
  ];

  const scroll = (direction: string) => {
    if (ref.current) {
      const gap = 32;
      let scrollOffset = 0;
      const gameButtonsArray =
        ref.current.getElementsByClassName("game-button");
      let gameButtonsLengthsArray = [];
      for (let i = 0; i < gameButtonsArray.length; i++) {
        gameButtonsLengthsArray.push(gameButtonsArray[i].clientWidth + gap);
      }
      for (let i = 0; i < gameButtonsLengthsArray.length; i++) {
        scrollOffset += gameButtonsLengthsArray[i];
        if (scrollOffset > ref.current.clientWidth) {
          scrollOffset -= gameButtonsLengthsArray[i];
          break;
        }
      }
      console.log(gameButtonsLengthsArray);
      if (scrollOffset + totalScrollOffset > 0) {
        ref.current.style.transform = `translateX(0px)`;
        setTotalScrollOffset(0);
      } else if (
        scrollOffset + totalScrollOffset <
        ref.current.scrollWidth + ref.current.clientWidth
      ) {
        ref.current.style.transform = `translateX(${
          ref.current.scrollWidth + ref.current.clientWidth
        }px)`;
        setTotalScrollOffset(ref.current.scrollWidth + ref.current.clientWidth);
      } else {
        ref.current.style.transform = `translateX(${
          scrollOffset + totalScrollOffset
        }px)`;
        setTotalScrollOffset((s) => s + scrollOffset);
      }
    }
  };

  return (
    <div className="App">
      {totalScrollOffset}
      <br />
      <div className="scroll-bar-container">
        {totalScrollOffset < 0 && (
          <ScrollButton className="left" onClick={() => scroll("left")} />
        )}
        <div className="game-buttons-wrapper">
          <div ref={ref} className="game-buttons-container">
            {gameButonsArray.map((object, i) => (
              <GameButton key={i} image={object.image} text={object.text} />
            ))}
          </div>
        </div>
        {(totalScrollOffset === 0 ||
          (ref.current &&
            totalScrollOffset >
              -ref.current.scrollWidth + ref.current.clientWidth)) && (
          <ScrollButton className="right" onClick={() => scroll("right")} />
        )}
      </div>
      <footer>
        Idea for this site taken from
        <a href="https://www.msn.com/en-gb/play" target="_blank">
          MSN Games
        </a>
      </footer>
    </div>
  );
}

export default App;
