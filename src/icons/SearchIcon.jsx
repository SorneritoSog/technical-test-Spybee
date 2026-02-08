const SearchIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="none"
    {...props}
  >
    <path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m18.5 18.5-4.34-4.34M16.5 8.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
    />
  </svg>
)
export default SearchIcon
