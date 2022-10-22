import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, 'expires:30')
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showErrorMsg: true,
      errorMsg,
    })
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-image">
          <img
            alt="website login"
            className="login-bg"
            src="https://res.cloudinary.com/dg5zldvhw/image/upload/v1662028132/Rectangle_1456_1x_wvtlvm.jpg"
          />
        </div>
        <div>
          <form onSubmit={this.onSubmitUserDetails} className="form-container">
            <img
              src="https://res.cloudinary.com/dg5zldvhw/image/upload/v1662029431/Vector_1px_iths5s.png"
              className="login-desktop"
              alt="website logo"
            />
            <h1 className="form-title">Tasty Kitchens</h1>
            <h1 className="form-login-text">Login</h1>
            <div className="input-container">
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="input"
                value={username}
                placeholder="Username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="input"
                value={password}
                placeholder="Password"
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
