const GameButton = (props: { image: string; text: string }) => {
  return (
    <button className="game-button">
      <img src={props.image} alt="Game Button" className="game-button-image" />
      <p className="game-button-text">{props.text}</p>
    </button>
  );
};

export default GameButton;
