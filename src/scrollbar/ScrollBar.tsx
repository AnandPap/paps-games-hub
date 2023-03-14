import { useEffect, useRef, useState } from "react";
import GameButton from "./GameButton";
import ScrollButton from "./ScrollButton";
import mastermind from "./images/mastermind.png";
import yatzy from "./images/yatzy.png";
import mine from "./images/mine.png";
import hangman from "./images/hangman.png";
import tictactoe from "./images/tic-tac-toe.png";
import etch from "./images/etch.png";
import allgames from "./images/all-games.png";
import guessthenumber from "./images/guess-the-number.png";
import "../styles/scrollbar.css";

const ScrollBar = () => {
  const [totalScrollOffset, setTotalScrollOffset] = useState(0);
  const [widthOf, setWidthOf] = useState({ screen: 0, container: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const gameButonsArray = [
    { image: allgames, text: "All Games" },
    { image: mine, text: "Minesweeper" },
    { image: mastermind, text: "Mastermind" },
    { image: hangman, text: "Hangman" },
    { image: tictactoe, text: "Tic Tac Toe" },
    { image: yatzy, text: "Yatzy" },
    { image: guessthenumber, text: "Number Guessing Game" },
    { image: etch, text: "Etch-A-Sketch" },
  ];
  const errorMargin = 2;

  useEffect(() => {
    if (ref.current)
      setWidthOf({
        screen: ref.current.offsetWidth,
        container: ref.current.scrollWidth,
      });
  }, []);

  const scroll = (direction: string) => {
    if (ref.current) {
      const gameButtonsArray =
        ref.current.getElementsByClassName("game-button");
      const gap = 32;
      let gameButtonsLengthsArray = [];
      let scrollOffset = 0;

      for (let i = 0; i < gameButtonsArray.length; i++)
        gameButtonsLengthsArray.push(gameButtonsArray[i].clientWidth + gap);

      if (direction === "right") {
        for (let i = 0; i < gameButtonsLengthsArray.length; i++) {
          scrollOffset += gameButtonsLengthsArray[i];
          if (
            scrollOffset >
            totalScrollOffset + ref.current.offsetWidth + gap
          ) {
            if (scrollOffset - totalScrollOffset > gameButtonsLengthsArray[i])
              scrollOffset -= gameButtonsLengthsArray[i];
            break;
          }
        }
        ref.current.style.transform = `translateX(-${scrollOffset}px)`;
        setTotalScrollOffset(scrollOffset);
      } else if (direction === "left") {
        let i = 0;
        for (i = 0; i < gameButtonsLengthsArray.length; i++) {
          scrollOffset += gameButtonsLengthsArray[i];
          if (Math.abs(scrollOffset - totalScrollOffset) <= errorMargin) {
            scrollOffset = 0;
            break;
          }
        }
        for (i; i > -1; i--) {
          scrollOffset += gameButtonsLengthsArray[i];
          if (
            gameButtonsLengthsArray[i] > ref.current.offsetWidth &&
            scrollOffset === gameButtonsLengthsArray[i]
          )
            break;
          if (scrollOffset > ref.current.offsetWidth + gap) {
            scrollOffset -= gameButtonsLengthsArray[i];
            break;
          }
        }
        ref.current.style.transform = `translateX(-${
          totalScrollOffset - scrollOffset
        }px)`;
        setTotalScrollOffset(totalScrollOffset - scrollOffset);
      } else {
        return;
      }
    }
  };

  return (
    <div className="scrollbar">
      {totalScrollOffset > errorMargin && (
        <ScrollButton className="left" onClick={() => scroll("left")} />
      )}
      <div className="game-buttons-container-wrapper">
        <div ref={ref} className="game-buttons-container">
          {gameButonsArray.map((object, i) => (
            <GameButton key={i} image={object.image} text={object.text} />
          ))}
        </div>
      </div>
      {((totalScrollOffset < errorMargin &&
        widthOf.container > widthOf.screen) ||
        (ref.current &&
          totalScrollOffset <
            ref.current.scrollWidth -
              ref.current.offsetWidth -
              errorMargin)) && (
        <ScrollButton className="right" onClick={() => scroll("right")} />
      )}
    </div>
  );
};

export default ScrollBar;
