const PresentationIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 22"
    fill="none"
    stroke="none"
    {...props}
  >
    <path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 1h20m-1 0v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V1m4 18 5-5 5 5"
    />
  </svg>
)
export default PresentationIcon
