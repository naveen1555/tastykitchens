import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  adaptiveHeight: true,
  appendDots: dots => (
    <div className="slick-dots">
      <ul>{dots}</ul>
    </div>
  ),
}

class RestaurantsOffer extends Component {
  state = {
    offersList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOffersList()
  }

  getOffersList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.offers.map(eachOffer => ({
        id: eachOffer.id,
        imageUrl: eachOffer.image_url,
      }))

      this.setState({
        offersList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderOffersListItems = () => {
    const {offersList} = this.state

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {offersList.map(eachOffer => (
            <div key={eachOffer.id}>
              <img
                src={eachOffer.imageUrl}
                alt="offer"
                className="offer-image"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="carousel-loader">
      <Loader type="Oval" color="#F7931E" width="100%" height="100%" />
    </div>
  )

  renderAllOffersDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOffersListItems()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="offers-list-container">
        {this.renderAllOffersDetails()}
      </div>
    )
  }
}

export default RestaurantsOffer
