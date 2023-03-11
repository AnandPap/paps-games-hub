import puzzle from "./assets/puzzle.png";
import yatzy from "./assets/yatzy.png";
import GameButton from "./GameButton";
import { useEffect, useRef, useState } from "react";
import ScrollBarArrow from "./ScrollButtonArrow";
import ScrollButton from "./ScrollButton";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [totalScrollOffset, setTotalScrollOffset] = useState(0);
  const gameButonsArray = [
    { image: puzzle, text: "Etch A Sketch" },
    { image: yatzy, text: "Yatzy" },
    { image: puzzle, text: "Hangman" },
    { image: puzzle, text: "Tic Tac Toe" },
    { image: puzzle, text: "Minesweeper" },
    { image: puzzle, text: "Mastermind" },
    { image: puzzle, text: "Number Guessing Game" },
  ];

  const scroll = (containerWidth: number, direction: string) => {
    let scrollOffset = Math.floor(containerWidth);
    if (direction === "right") {
      scrollOffset = -scrollOffset;
    } else {
      scrollOffset = scrollOffset;
    }
    if (ref.current) {
      const gameButtonsArray = ref.current.getElementsByClassName(
        "scroll-bar-game-button"
      );
      let gameButtonsLengthArray = [];
      for (let i = 0; i < gameButtonsArray.length; i++) {
        gameButtonsLengthArray.push(gameButtonsArray[i].clientWidth);
      }
      console.log(gameButtonsLengthArray);
      console.log(ref.current.getElementsByClassName("scroll-bar-game-button"));
      console.log(ref.current.scrollWidth);
      console.log(ref.current.offsetWidth);
      if (scrollOffset + totalScrollOffset > 0) {
        ref.current.style.transform = `translateX(0px)`;
        setTotalScrollOffset(0);
      } else if (
        scrollOffset + totalScrollOffset <
        -ref.current.scrollWidth + ref.current.offsetWidth
      ) {
        ref.current.style.transform = `translateX(${
          -ref.current.scrollWidth + ref.current.offsetWidth
        }px)`;
        setTotalScrollOffset(
          -ref.current.scrollWidth + ref.current.offsetWidth
        );
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
          <ScrollButton
            className="left"
            onClick={() =>
              ref.current && scroll(ref.current.clientWidth, "left")
            }
          />
        )}
        <div className="game-buttons-wrapper">
          <div id="asd" ref={ref} className="game-buttons-container">
            {gameButonsArray.map((object, i) => (
              <GameButton key={i} image={object.image} text={object.text} />
            ))}
          </div>
        </div>
        {(totalScrollOffset === 0 ||
          (ref.current &&
            totalScrollOffset >
              -ref.current.scrollWidth + ref.current.offsetWidth)) && (
          <ScrollButton
            className="right"
            onClick={() =>
              ref.current && scroll(ref.current.clientWidth, "right")
            }
          />
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
