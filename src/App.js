import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Cart from './components/Cart'
import RestaurantDetails from './components/RestaurantDetails'
import ProtectedRoute from './components/ProtectedRoute'
import FoodItemContext from './context/FoodItemContext'
import Profile from './components/Profile'
import NotFound from './components/NotFound'
import './App.css'

const getDataFromLocalStorage = () => {
  const striginifiedData = localStorage.getItem('cartData')
  const parsedData = JSON.parse(striginifiedData)

  if (parsedData === null) {
    return []
  }
  return parsedData
}

class App extends Component {
  state = {
    cartList: getDataFromLocalStorage(),
  }

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  increaseQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          const increaseQuantity = eachItem.quantity + 1
          return {...eachItem, quantity: increaseQuantity}
        }
        return eachItem
      }),
    }))
  }

  decreaseQuantity = id => {
    const {cartList} = this.state
    const foodItem = cartList.find(eachItem => eachItem.id === id)

    if (foodItem.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === id) {
            const decreaseQuantity = eachItem.quantity - 1
            return {...eachItem, quantity: decreaseQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state

    const filterData = cartList.filter(eachItem => eachItem.id !== id)

    this.setState({
      cartList: filterData,
    })
  }

  addCartItem = product => {
    const {cartList} = this.state

    const foodItem = cartList.find(eachItem => eachItem.id === product.id)

    if (foodItem) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === foodItem.id) {
            const updateQuantity = product.quantity
            return {...eachItem, quantity: updateQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      const updateItem = [...cartList, product]
      this.setState({
        cartList: updateItem,
      })
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <FoodItemContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          increaseQuantity: this.increaseQuantity,
          decreaseQuantity: this.decreaseQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <Route component={NotFound} />
        </Switch>
      </FoodItemContext.Provider>
    )
  }
}

export default App
