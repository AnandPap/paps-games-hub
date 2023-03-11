const ScrollButtonArrow = (props: { className: string }) => {
  return (
    <div className="scroll-bar-arrow-wrapper ">
      <div className={`scroll-bar-arrow ${props.className}`}></div>
    </div>
  );
};

export default ScrollButtonArrow;
