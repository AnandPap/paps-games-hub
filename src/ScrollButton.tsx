import ScrollButtonArrow from "./ScrollButtonArrow";

const ScrollButton = (props: {
  className: string;
  onClick: () => void | null;
}) => {
  return (
    <button
      className={`scroll-${props.className}-button`}
      onClick={props.onClick}
    >
      <ScrollButtonArrow className={props.className} />
    </button>
  );
};

export default ScrollButton;
