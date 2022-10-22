import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import FoodItemContext from '../../context/FoodItemContext'
import './index.css'

class FoodItemCard extends Component {
  state = {
    quantity: 0,
  }

  render() {
    return (
      <FoodItemContext.Consumer>
        {value => {
          const {addCartItem, increaseQuantity, decreaseQuantity} = value

          const {foodDetails} = this.props
          const {id, imageUrl, name, cost, rating} = foodDetails
          const {quantity} = this.state

          const onClickAddButton = () => {
            this.setState(
              prevState => ({
                quantity: prevState.quantity + 1,
              }),
              addCartItem({...foodDetails, quantity: quantity + 1}),
            )
          }

          const onClickDecreaseButton = () => {
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
            decreaseQuantity(id)
          }

          const onClickIncreaseButton = () => {
            this.setState(prevState => ({quantity: prevState.quantity + 1}))
            increaseQuantity(id)
          }

          return (
            <li className="food-card-container">
              <img src={imageUrl} alt={name} className="food-image" />
              <div className="food-details">
                <h1 className="food-name">{name}</h1>
                <div className="cost-container">
                  <BiRupee className="icon" />
                  <p className="cost">{cost}</p>
                </div>
                <div className="cost-container">
                  <AiFillStar className="star-icon" />
                  <p className="food-rating">{rating}</p>
                </div>
                {quantity < 1 ? (
                  <button
                    type="button"
                    className="add-button"
                    onClick={onClickAddButton}
                  >
                    Add
                  </button>
                ) : (
                  <div className="arrow-buttons-container">
                    <button
                      type="button"
                      className="button"
                      onClick={onClickDecreaseButton}
                    >
                      <BsDashSquare className="quantity-icon" />
                    </button>
                    <p className="quantity-number">{quantity}</p>
                    <button
                      type="button"
                      className="button"
                      onClick={onClickIncreaseButton}
                    >
                      <BsPlusSquare className="quantity-icon" />
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        }}
      </FoodItemContext.Consumer>
    )
  }
}
export default FoodItemCard
