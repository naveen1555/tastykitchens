import Header from '../Header'
import Footer from '../Footer'
import CartEmptyView from '../CartEmptyView'
import CartListView from '../CartListView'
import FoodItemContext from '../../context/FoodItemContext'

import './index.css'

const Cart = () => (
  <FoodItemContext.Consumer>
    {value => {
      const {cartList} = value
      const cartLength = cartList.length === 0
      return (
        <>
          <Header activeTabId="Cart" />
          <div className="cart-main-container">
            {cartLength ? <CartEmptyView /> : <CartListView />}
          </div>
          <Footer />
        </>
      )
    }}
  </FoodItemContext.Consumer>
)

export default Cart
