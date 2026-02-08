const LocationIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17 21"
    fill="none"
    stroke="none"
    {...props}
  >
    <path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 8.5c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C6.039 18.693.5 13.493.5 8.5a8 8 0 1 1 16 0Z"
    />
    <path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.5 11.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
    />
  </svg>
)
export default LocationIcon
