import puzzle from "./assets/puzzle.png";
import yatzy from "./assets/yatzy.png";
import GameButton from "./GameButton";
import { useEffect, useRef, useState } from "react";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const [totalScrollOffset, setTotalScrollOffset] = useState(0);

  const scroll = (
    containerWidth: number,
    elementWidth: number,
    direction: string
  ) => {
    let scrollOffset = Math.floor(containerWidth / elementWidth) * elementWidth;
    if (direction === "right") {
      scrollOffset = -scrollOffset;
    } else {
      scrollOffset = scrollOffset;
    }
    if (ref.current) {
      if (scrollOffset + totalScrollOffset > 0) {
        ref.current.style.transform = `translateX(0px)`;
        setTotalScrollOffset(0);
      } else if (
        scrollOffset + totalScrollOffset <
        containerWidth - elementWidth * 8
      ) {
        ref.current.style.transform = `translateX(${
          containerWidth - elementWidth * 8
        }px)`;
        setTotalScrollOffset(containerWidth - elementWidth * 8);
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
          <button
            className="scroll-to-left-button"
            onClick={() =>
              ref.current &&
              ref2.current &&
              scroll(ref.current.clientWidth, ref2.current.clientWidth, "left")
            }
          >
            <div className="scroll-bar-arrow-wrapper ">
              <div className="scroll-bar-arrow left"></div>
            </div>
          </button>
        )}
        <div className="game-buttons-wrapper">
          <div ref={ref} className="game-buttons-container">
            <div ref={ref2}>
              <GameButton image={puzzle} className="puzzle" text="Puzzle" />
            </div>
            <GameButton image={yatzy} className="puzzle" text="Yatzy" />
            <GameButton image={puzzle} className="puzzle" text="Puzzle" />
            <GameButton image={yatzy} className="puzzle" text="Yatzy" />
            <GameButton image={puzzle} className="puzzle" text="Puzzle" />
            <GameButton image={yatzy} className="puzzle" text="Yatzy" />
            <GameButton image={puzzle} className="puzzle" text="Puzzle" />
            <GameButton image={yatzy} className="puzzle" text="Yatzy" />
          </div>
        </div>
        {(totalScrollOffset === 0 ||
          (ref.current &&
            ref2.current &&
            totalScrollOffset >
              ref.current.clientWidth - ref2.current.clientWidth * 8)) && (
          <button
            className="scroll-to-right-button"
            onClick={() =>
              ref.current &&
              ref2.current &&
              scroll(ref.current.clientWidth, ref2.current.clientWidth, "right")
            }
          >
            <div className="scroll-bar-arrow-wrapper ">
              <div className="scroll-bar-arrow right"></div>
            </div>
          </button>
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
