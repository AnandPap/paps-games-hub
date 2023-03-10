import puzzle from "./assets/puzzle.png";
import yatzy from "./assets/yatzy.png";
import GameButton from "./GameButton";
import { useRef, useState } from "react";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const [totalScrollOffset, setTotalScrollOffset] = useState(0);

  const scroll = (scrollOffset: number) => {
    console.log(scrollOffset);
    console.log(ref2.current?.clientWidth);
    // if (totalScrollOffset >= 0 && scrollOffset)
    if (ref.current) {
      if (scrollOffset + totalScrollOffset < 0) {
        ref.current.style.transform = `translateX(0px)`;
      }
      ref.current.style.transform = `translateX(${
        scrollOffset + totalScrollOffset
      }px)`;
      setTotalScrollOffset((s) => s + scrollOffset);
    }
  };

  return (
    <div className="App">
      {totalScrollOffset}
      <div className="game-buttons-wrapper"></div>
      <br />
      <div ref={ref2} className="scroll-bar-container">
        {totalScrollOffset < 0 && (
          <button className="scroll-to-left-button" onClick={() => scroll(750)}>
            <div className="scroll-bar-arrow-wrapper ">
              <div className="scroll-bar-arrow left"></div>
            </div>
          </button>
        )}
        <div className="game-buttons-wrapper">
          <div ref={ref} className="game-buttons-container">
            <GameButton image={puzzle} className="puzzle" text="Puzzle" />
            <GameButton image={yatzy} className="puzzle" text="Yatzy" />
            <GameButton image={puzzle} className="puzzle" text="Puzzle" />
            <GameButton image={yatzy} className="puzzle" text="Yatzy" />
            <GameButton image={puzzle} className="puzzle" text="Puzzle" />
            <GameButton image={yatzy} className="puzzle" text="Yatzy" />
            <GameButton image={puzzle} className="puzzle" text="Puzzle" />
            <GameButton image={yatzy} className="puzzle" text="Yatzy" />
          </div>
        </div>
        {totalScrollOffset > -1000 && (
          <button
            className="scroll-to-right-button"
            onClick={() => scroll(-750)}
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
