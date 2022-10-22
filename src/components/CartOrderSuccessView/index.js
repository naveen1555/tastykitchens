import {Link} from 'react-router-dom'
import FoodItemContext from '../../context/FoodItemContext'
import './index.css'

const CartOrderSuccessView = () => (
  <FoodItemContext.Consumer>
    {value => {
      const {removeAllCartItems} = value

      const onClickClearButton = () => {
        removeAllCartItems()
      }

      return (
        <div className="order-success-container">
          <img
            src="https://res.cloudinary.com/dg5zldvhw/image/upload/v1662377302/Vectorsuccess_m5outn.png"
            alt="success"
            className="success-image"
          />
          <h1 className="payment-heading">Payment Successful</h1>
          <p className="payment-description">
            Thank you for ordering Your payment is successfully completed.
          </p>
          <Link to="/">
            <button
              type="button"
              className="goto-home-page-btn"
              onClick={onClickClearButton}
            >
              Go To Home Page
            </button>
          </Link>
        </div>
      )
    }}
  </FoodItemContext.Consumer>
)

export default CartOrderSuccessView
