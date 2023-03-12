import Arrow from "./Arrow";

const ScrollButton = (props: {
  className: string;
  onClick: () => void | null;
}) => {
  return (
    <button
      className={`scroll-${props.className}-button`}
      onClick={props.onClick}
    >
      <Arrow className={props.className} />
    </button>
  );
};

export default ScrollButton;
