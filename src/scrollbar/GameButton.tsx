const GameButton = (props: { image: string; gameName: string }) => {
  return (
    <button className="game-button">
      <img src={props.image} alt="Game Button" className="game-button-image" />
      <p className="game-button-name">{props.gameName}</p>
    </button>
  );
};

export default GameButton;
