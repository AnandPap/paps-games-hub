import { useRef, useState } from "react";
import GameButton from "./GameButton";
import ScrollButton from "./ScrollButton";
import puzzle from "./images/puzzle.png";
import yatzy from "./images/yatzy.png";
import ticTacToe from "./images/ticTacToe.png";
import "./scrollbar.css";

const ScrollBar = () => {
  const [totalScrollOffset, setTotalScrollOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const gameButonsArray = [
    { image: puzzle, text: "Etch A Sketch" },
    { image: yatzy, text: "Yatzy" },
    { image: puzzle, text: "Hangman" },
    { image: ticTacToe, text: "Tic Tac Toe" },
    { image: puzzle, text: "Minesweeper" },
    { image: puzzle, text: "Mastermind" },
    { image: puzzle, text: "Number Guessing Game" },
  ];

  const scroll = (direction: string) => {
    if (ref.current) {
      const gameButtonsArray =
        ref.current.getElementsByClassName("game-button");
      const gap = 32;
      let gameButtonsLengthsArray = [];
      let scrollOffset: number;

      for (let i = 0; i < gameButtonsArray.length; i++) {
        if (i === gameButtonsArray.length - 1)
          gameButtonsLengthsArray.push(gameButtonsArray[i].clientWidth);
        else
          gameButtonsLengthsArray.push(gameButtonsArray[i].clientWidth + gap);
      }

      if (direction === "right") {
        scrollOffset = totalScrollOffset;
        for (let i = 0; i < gameButtonsLengthsArray.length; i++) {
          scrollOffset += gameButtonsLengthsArray[i];
          if (scrollOffset > ref.current.offsetWidth) {
            scrollOffset -= gameButtonsLengthsArray[i];
            break;
          }
        }
        scrollOffset = -scrollOffset;
        ref.current.style.transform = `translateX(${
          scrollOffset + totalScrollOffset
        }px)`;
        setTotalScrollOffset((s) => s + scrollOffset);
      } else {
        scrollOffset = -ref.current.scrollWidth;
        for (let i = gameButtonsLengthsArray.length - 1; i >= 0; i--) {
          console.log(scrollOffset);
          scrollOffset += gameButtonsLengthsArray[i];
          if (scrollOffset > totalScrollOffset + ref.current.offsetWidth) {
            scrollOffset -= gameButtonsLengthsArray[i];
            break;
          }
        }
        if (scrollOffset >= -2) {
          ref.current.style.transform = `translateX(0px)`;
          setTotalScrollOffset(0);
        } else {
          ref.current.style.transform = `translateX(${scrollOffset}px)`;
          setTotalScrollOffset((s) => scrollOffset);
        }
      }
    }
  };

  return (
    <div className="scrollbar">
      {totalScrollOffset < 0 && (
        <ScrollButton className="left" onClick={() => scroll("left")} />
      )}
      <div className="game-buttons-container-wrapper">
        <div ref={ref} className="game-buttons-container">
          {gameButonsArray.map((object, i) => (
            <GameButton key={i} image={object.image} text={object.text} />
          ))}
        </div>
      </div>
      {(totalScrollOffset === 0 ||
        (ref.current &&
          totalScrollOffset >
            -ref.current.scrollWidth + ref.current.offsetWidth + 1)) && (
        <ScrollButton className="right" onClick={() => scroll("right")} />
      )}
    </div>
  );
};

export default ScrollBar;
