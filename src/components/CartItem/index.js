import {BiRupee} from 'react-icons/bi'
import Counter from '../Counter'
import FoodItemContext from '../../context/FoodItemContext'
import './index.css'

const CartItem = props => (
  <FoodItemContext.Consumer>
    {value => {
      const {increaseQuantity, decreaseQuantity} = value
      const {foodDetails} = props
      const {id, imageUrl, name, cost, quantity} = foodDetails
      const itemCost = quantity * cost
      return (
        <div className="food-details-container">
          <img src={imageUrl} alt={name} className="cart-image" />
          <div className="cart-details-container">
            <h1 className="cart-food-name">{name}</h1>
            <div className="cart-quantity-container">
              <Counter
                key={id}
                quantity={quantity}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                foodId={id}
              />
              <div className="cart-food-item-price-container">
                <BiRupee className="cart-food-item-price-icon" />
                <p className="cart-food-item-price">{itemCost}.00</p>
              </div>
            </div>
          </div>
        </div>
      )
    }}
  </FoodItemContext.Consumer>
)

export default CartItem
