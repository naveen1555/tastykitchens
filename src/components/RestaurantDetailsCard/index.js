import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import './index.css'

const RestaurantDetailsCard = props => {
  const {restaurantDetails} = props
  const {
    imageUrl,
    name,
    cuisine,
    location,
    rating,
    reviewsCount,
    costForTwo,
  } = restaurantDetails

  return (
    <div className="restaurant-details-container">
      <div className="restaurant-details-cards">
        <img src={imageUrl} alt="restaurant" className="restaurant-image" />
        <div className="name-and-details-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <p className="restaurant-location">{location}</p>
          <div className="ratings-and-details-container">
            <div className="rating-and-description-container">
              <div className="rating-and-star-container">
                <AiFillStar className="rating-star-icon" />
                <p className="restaurant-rating">{rating}</p>
              </div>
              <p className="ratings-count">{reviewsCount}+ Ratings</p>
            </div>
            <hr className="hr" />
            <div className="rating-and-description-container">
              <div className="rating-and-star-container">
                <BiRupee className="rating-star-icon" />
                <p className="restaurant-rating">{costForTwo}</p>
              </div>
              <p className="ratings-count">Cost for two</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RestaurantDetailsCard
