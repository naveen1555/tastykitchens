import {MdOutlineSort} from 'react-icons/md'
import './index.css'

const RestaurantSortingHeader = props => {
  const {sortByOptions, activeSortOption, changeSortOption} = props

  const onChangeSortOption = event => {
    changeSortOption(event.target.value)
  }
  return (
    <div className="container">
      <div className="heading-container">
        <h1 className="popular-restaurants-heading">Popular Restaurants</h1>
        <p className="popular-restaurants-description">
          Select Your favourite restaurant special dish and make your day
          happy....
        </p>
      </div>
      <div className="sort-container">
        <MdOutlineSort className="sort-icon" color=" #475569" />
        <p className="sort-by-heading">Sort by</p>
        <div className="select-options">
          <select
            name="sort-select"
            className="select-container"
            value={activeSortOption}
            onChange={onChangeSortOption}
          >
            {sortByOptions.map(eachOption => (
              <option key={eachOption.id} value={eachOption.id}>
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default RestaurantSortingHeader
