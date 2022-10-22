import {BiRupee} from 'react-icons/bi'
import FoodItemContext from '../../context/FoodItemContext'
import './index.css'

const CartTotalCostView = props => {
  const {orderPlaced} = props
  return (
    <FoodItemContext.Consumer>
      {value => {
        const {cartList} = value

        const onClickPlaceOrder = () => {
          orderPlaced()
        }

        let totalPrice = 0
        cartList.forEach(eachItem => {
          totalPrice += eachItem.quantity * eachItem.cost
        })
        return (
          <>
            <div className="total-price-container">
              <h1 className="total-price-heading">Order Total:</h1>
              <div className="total-price-icon-and-price">
                <BiRupee className="total-price-icon" />
                <p className="total-price">{totalPrice}.00</p>
              </div>
            </div>
            <button
              type="button"
              className="place-order-button"
              onClick={onClickPlaceOrder}
            >
              Place Order
            </button>
          </>
        )
      }}
    </FoodItemContext.Consumer>
  )
}

export default CartTotalCostView
