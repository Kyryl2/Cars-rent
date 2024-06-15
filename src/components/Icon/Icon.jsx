import Icons from "../../icon.svg";

const Icon = ({ id, className, width, height }) => {
  return (
    <svg className={className} width={width} height={height}>
      <use href={`${Icons}#${id}`} />
    </svg>
  );
};
export default Icon;