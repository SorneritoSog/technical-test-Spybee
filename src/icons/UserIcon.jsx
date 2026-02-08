const UserIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17 17"
    fill="none"
    stroke="none"
    {...props}
  >
    <path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.5 10.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 0a8 8 0 0 1 8 8m-8-8a8 8 0 0 0-8 8"
    />
  </svg>
)
export default UserIcon
