import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import RestaurantSortingHeader from '../RestaurantSortingHeader'
import RestaurantCard from '../RestaurantCard'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Lowest',
    value: 'Lowest',
  },
  {
    id: 1,
    displayText: 'Highest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantsList extends Component {
  state = {
    activeSortOption: sortByOptions[0].value,
    restaurantsList: [],
    activePage: 1,
    limit: 9,
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {activeSortOption, activePage, limit, searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const offset = (activePage - 1) * limit
    const restaurantApiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${activeSortOption}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantApiUrl, options)

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.restaurants.map(eachHotel => ({
        id: eachHotel.id,
        costForTwo: eachHotel.cost_for_two,
        cuisine: eachHotel.cuisine,
        groupByTime: eachHotel.group_by_time,
        hasOnlineDelivery: eachHotel.has_online_delivery,
        hasTableBooking: eachHotel.has_table_booking,
        imageUrl: eachHotel.image_url,
        isDeliveringNow: eachHotel.is_delivering_now,
        location: eachHotel.location,
        menuType: eachHotel.menu_type,
        name: eachHotel.name,
        opensAt: eachHotel.opens_at,
        userRating: eachHotel.user_rating.rating,
        ratingColor: eachHotel.user_rating.rating_color,
        ratingText: eachHotel.user_rating.rating_text,
        totalReviews: eachHotel.user_rating.total_reviews,
      }))
      this.setState({
        restaurantsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSortOption = option => {
    this.setState({activeSortOption: option}, this.getRestaurantsList)
  }

  onClickLeftArrow = () => {
    const {activePage} = this.state

    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  onClickRightArrow = () => {
    const {activePage} = this.state

    if (activePage < 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickSearchButton = () => {
    this.getRestaurantsList()
  }

  onClickRetryButton = () => {
    this.setState(
      {
        searchInput: '',
      },
      this.getRestaurantsList,
    )
  }

  renderLoadingView = () => (
    <div className="restaurants-lists-loader">
      <Loader type="Oval" color="#F7931E" width="100%" height="100%" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="no results"
        className="Failure-image"
      />
      <h1 className="no-results-heading">No Results Found!</h1>
      <p className="no-results-description">
        We are having some trouble to complete your request. Please try again.
        <br />
        Please try again later.
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderRestaurantsList = () => {
    const {restaurantsList, activePage, searchInput} = this.state

    return (
      <>
        <div className="search-container">
          <input
            type="search"
            className="search-input-box"
            placeholder="Search"
            onChange={this.onChangeSearchInput}
            value={searchInput}
          />
          <button
            type="button"
            className="search-button"
            onClick={this.onClickSearchButton}
          >
            <AiOutlineSearch size="20" />
          </button>
        </div>
        <ul className="all-restaurants-list-container">
          {restaurantsList.map(eachRestaurant => (
            <RestaurantCard
              key={eachRestaurant.id}
              restaurantDetails={eachRestaurant}
            />
          ))}
        </ul>
        <div className="pagination-container">
          <button
            type="button"
            onClick={this.onClickLeftArrow}
            className="back-button"
          >
            <IoIosArrowBack />
          </button>
          <p className="pages">
            <span>{activePage}</span> to 4
          </p>
          <button
            type="button"
            onClick={this.onClickRightArrow}
            className="forward-button"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </>
    )
  }

  renderAllRestaurantsDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderRestaurantsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderSortByOrder = () => {
    const {activeSortOption} = this.state

    return (
      <>
        <RestaurantSortingHeader
          sortByOptions={sortByOptions}
          activeSortOption={activeSortOption}
          changeSortOption={this.changeSortOption}
        />
      </>
    )
  }

  render() {
    return (
      <div className="restaurants-container">
        {this.renderSortByOrder()}
        <hr className="hr-line" />
        {this.renderAllRestaurantsDetails()}
      </div>
    )
  }
}

export default RestaurantsList
