const ArrowIcon = ({ direction = 'left', style, ...props }) => {
  const rotationMap = {
    left: '0deg',
    top: '90deg',
    right: '180deg',
    bottom: '270deg'
  };

  const rotation = rotationMap[direction] || '0deg';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 13 15"
      fill="none"
      stroke="none"
      style={{
        transform: `rotate(${rotation})`,
        ...style
      }}
      {...props}
    >
      <path
        stroke={props.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m7.5 14.5-7-7 7-7"
      />
    </svg>
  )
}
export default ArrowIcon
