interface GameButtonType {
  image: string;
  text: string;
}

const GameButton = ({ image, text }: GameButtonType) => {
  return (
    <button className="game-button">
      <img src={image} alt="Game Button" className="game-button-image" />
      <p className="game-button-text">{text}</p>
    </button>
  );
};

export default GameButton;
