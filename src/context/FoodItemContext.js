import React from 'react'

const FoodItemContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  removeAllCartItems: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
})

export default FoodItemContext
