import { useEffect, useRef, useState } from "react";
import GameButton from "./GameButton";
import ScrollButton from "./ScrollButton";
import allgames from "../assets/scrollbar-icons/all-games.png";

interface gamesObject {
  image: string;
  gameName: string;
}

const ScrollBar = (props: { gamesArray: gamesObject[] }) => {
  const [totalScrollOffset, setTotalScrollOffset] = useState(0);
  const [widthOf, setWidthOf] = useState({ screen: 0, container: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const gameButonsArray = [
    { image: allgames, gameName: "All Games" },
    ...props.gamesArray,
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
            <GameButton
              key={i}
              image={object.image}
              gameName={object.gameName}
            />
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
