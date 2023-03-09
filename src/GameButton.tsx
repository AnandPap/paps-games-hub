interface GameButtonType {
  image: string;
  className: string;
  text: string;
}

const GameButton = ({ image, className, text }: GameButtonType) => {
  return (
    <button className="nav-bar-game-button">
      <img src={image} alt="" className={className} />
      <p className="nav-bar-game-button-text">{text}</p>
    </button>
  );
};

export default GameButton;
