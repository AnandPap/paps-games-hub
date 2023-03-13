import { useEffect, useRef, useState } from "react";
import GameButton from "./GameButton";
import ScrollButton from "./ScrollButton";
import mastermind from "./images/mastermind.png";
import yatzy from "./images/yatzy.png";
import mine from "./images/mine.png";
import hangman from "./images/hangman.png";
import tictactoe from "./images/tic-tac-toe.png";
import etch from "./images/etch.png";
import guessthenumber from "./images/guess-the-number.png";
import "./scrollbar.css";

const ScrollBar = () => {
  const [totalScrollOffset, setTotalScrollOffset] = useState(0);
  const [widthOf, setWidthOf] = useState({ screen: 0, container: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const gameButonsArray = [
    { image: guessthenumber, text: "Number Guessing Game" },
    { image: tictactoe, text: "Tic Tac Toe" },
    { image: etch, text: "Etch-A-Sketch" },
    { image: mine, text: "Minesweeper" },
    { image: mastermind, text: "Mastermind" },
    { image: yatzy, text: "Yatzy" },
    { image: hangman, text: "Hangman" },
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

      for (let i = 0; i < gameButtonsArray.length; i++) {
        if (i === gameButtonsArray.length - 1)
          gameButtonsLengthsArray.push(gameButtonsArray[i].clientWidth);
        else
          gameButtonsLengthsArray.push(gameButtonsArray[i].clientWidth + gap);
      }

      if (direction === "right") {
        for (let i = 0; i < gameButtonsLengthsArray.length; i++) {
          scrollOffset += gameButtonsLengthsArray[i];
          // + 32 ispod za kada je gap posljednjeg buttona u okviru velicine screen-a, da ne bi moralo ponovo pokazati njega na scroll
          if (scrollOffset > totalScrollOffset + ref.current.offsetWidth + 32) {
            // uslov ispod za kada treba skrolati samo jedan, tj za male ekrane
            if (scrollOffset - totalScrollOffset > gameButtonsLengthsArray[i])
              scrollOffset -= gameButtonsLengthsArray[i];
            break;
          }
        }
        ref.current.style.transform = `translateX(-${scrollOffset}px)`;
        setTotalScrollOffset(scrollOffset);
      } else {
        for (let i = 0; i < gameButtonsLengthsArray.length; i++) {
          scrollOffset += gameButtonsLengthsArray[i];
          if (scrollOffset > totalScrollOffset - ref.current.offsetWidth) {
            if (scrollOffset === gameButtonsLengthsArray[i])
              scrollOffset -= gameButtonsLengthsArray[i];
            break;
          }
        }
        if (scrollOffset <= errorMargin) {
          ref.current.style.transform = `translateX(0px)`;
          setTotalScrollOffset(0);
        } else {
          ref.current.style.transform = `translateX(-${scrollOffset}px)`;
          setTotalScrollOffset((s) => scrollOffset);
        }
      }
    }
  };

  return (
    <div className="scrollbar">
      {totalScrollOffset > 0 && (
        <ScrollButton className="left" onClick={() => scroll("left")} />
      )}
      <div className="game-buttons-container-wrapper">
        <div ref={ref} className="game-buttons-container">
          {gameButonsArray.map((object, i) => (
            <GameButton key={i} image={object.image} text={object.text} />
          ))}
        </div>
      </div>
      {((totalScrollOffset === 0 && widthOf.container > widthOf.screen) ||
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
