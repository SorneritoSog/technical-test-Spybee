const FilterIcon = (props) => (
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
      strokeWidth={2}
      d="M9 18a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 13 19v-7a2 2 0 0 1 .517-1.341L20.74 2.67A1 1 0 0 0 20 1H2a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 9 12v6Z"
    />
  </svg>
)
export default FilterIcon
