import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import RestaurantDetailsCard from '../RestaurantDetailsCard'
import FoodItemCard from '../FoodItemCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    restaurantDetails: {},
    apiStatus: apiStatusConstants.initial,
    foodItems: [],
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const fetchedData = {
        id: data.id,
        rating: data.rating,
        name: data.name,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        opensAt: data.opens_at,
        reviewsCount: data.reviews_count,
      }

      const updatedFoodItems = data.food_items.map(eachFood => ({
        cost: eachFood.cost,
        foodType: eachFood.food_type,
        id: eachFood.id,
        imageUrl: eachFood.image_url,
        name: eachFood.name,
        rating: eachFood.rating,
      }))

      this.setState({
        restaurantDetails: fetchedData,
        foodItems: updatedFoodItems,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderRestaurantDetails = () => {
    const {restaurantDetails, foodItems} = this.state

    return (
      <div className="top-section">
        <RestaurantDetailsCard restaurantDetails={restaurantDetails} />
        <ul className="foods-list-container">
          {foodItems.map(eachFood => (
            <FoodItemCard key={eachFood.id} foodDetails={eachFood} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="details-loader">
      <Loader type="Oval" color="#F7931E" width="100%" height="100%" />
    </div>
  )

  renderPageAsPerStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderPageAsPerStatus()}
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
