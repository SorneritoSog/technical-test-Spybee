import ArrowIcon from "./ArrowIcon"
import UserIcon from "./UserIcon"
import ListIcon from "./ListIcon"
import FilterIcon from "./FilterIcon"
import LocationIcon from "./LocationIcon"
import GridIcon from "./GridIcon"
import SearchIcon from "./SearchIcon"
import AddIcon from "./AddIcon"
import PresentationIcon from "./PresentationIcon"
import UpdateIcon from "./UpdateIcon"
import ClockIcon from "./ClockIcon"
import OrderIcon from "./OrderIcon"
import ChronometerIcon from "./ChronometerIcon"
import CalendarIcon from "./CalendarIcon"

const ApplicationIcons = ({ iconName, ...props }) => {
  const icons = {
    arrowicon: ArrowIcon,
    usericon: UserIcon,
    listicon: ListIcon,
    filtericon: FilterIcon,
    locationicon: LocationIcon,
    gridicon: GridIcon,
    searchicon: SearchIcon,
    addicon: AddIcon,
    presentationicon: PresentationIcon,
    updateicon: UpdateIcon,
    clockicon: ClockIcon,
    ordericon: OrderIcon,
    chronometericon: ChronometerIcon,
    calendaricon: CalendarIcon,
  }

  if (!iconName) return null

  const IconComponent = icons[iconName.toLowerCase()]

  if (!IconComponent) {
    return null
  }

  return <IconComponent {...props} />
}

export default ApplicationIcons