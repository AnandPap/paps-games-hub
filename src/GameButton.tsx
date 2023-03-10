interface GameButtonType {
  image: string;
  className: string;
  text: string;
}

const GameButton = ({ image, className, text }: GameButtonType) => {
  return (
    <button className="scroll-bar-game-button">
      <img src={image} alt="" className={className} />
      <p className="scroll-bar-game-button-text">{text}</p>
    </button>
  );
};

export default GameButton;
