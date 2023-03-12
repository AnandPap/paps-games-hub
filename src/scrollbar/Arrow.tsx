const Arrow = (props: { className: string }) => {
  return (
    <div className="arrow-wrapper ">
      <div className={`arrow-${props.className}`}></div>
    </div>
  );
};

export default Arrow;
