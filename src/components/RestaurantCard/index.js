import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const RestaurantCard = props => {
  const {restaurantDetails} = props
  const {
    id,
    name,
    imageUrl,
    userRating,
    totalReviews,
    cuisine,
    opensAt,
  } = restaurantDetails

  return (
    <Link to={`/restaurant/${id}`} className="link-item">
      <li className="restaurant-details-card">
        <img
          src={imageUrl}
          alt="restaurant"
          className="restaurant-details-image"
        />
        <div className="each-restaurant-details">
          <h1 className="each-restaurant-name">{name}</h1>
          <p className="restaurant-type">{cuisine}</p>
          <p className="opening-time">Opens At: {opensAt}</p>
          <div className="rating-and-reviews">
            <AiFillStar color="#FFCC00" size="20" className="star-icon" />
            <p className="user-rating">{userRating}</p>
            <p className="total-reviews">({totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantCard
