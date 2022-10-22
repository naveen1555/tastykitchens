import {Link} from 'react-router-dom'

import './index.css'

const CartEmptyView = () => (
  <div className="empty-view-container">
    <img
      src="https://res.cloudinary.com/dg5zldvhw/image/upload/v1662374584/cooking_1empty_avtycw.png"
      alt="empty cart"
      className="empty-cart-image"
    />
    <h1 className="empty-cart-heading">No Order Yet!</h1>
    <p className="empty-cart-description">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/">
      <button type="button" className="order-now-button">
        Order Now
      </button>
    </Link>
  </div>
)

export default CartEmptyView
