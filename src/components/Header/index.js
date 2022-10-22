import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoCloseCircle} from 'react-icons/io5'
import Cookies from 'js-cookie'
import './index.css'

const navLinkItems = [
  {id: 0, path: 'Home', displayText: 'Home'},
  {id: 1, path: 'Cart', displayText: 'Cart'},
  {id: 2, displayText: 'Logout'},
  {id: 3, path: 'Profile', displayText: 'Profile'},
]

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const {activeTabId} = props

  return (
    <nav className="Navbar-container">
      <div className="Navbar-large-devices">
        <Link to="/" className="logo-nav-link">
          <div className="desktop-logo-and-heading-container">
            <img
              src="https://res.cloudinary.com/dg5zldvhw/image/upload/v1662029431/Vector_1px_iths5s.png"
              alt="website logo"
              className="home-website-logo"
            />
            <h1 className="hotel-title">Tasty Kitchens</h1>
          </div>
        </Link>
        <ul className="nav-items-container">
          <li className="nav-item" key={navLinkItems[0].id}>
            <Link
              to="/"
              className={
                activeTabId === navLinkItems[0].path
                  ? `nav-item active-item`
                  : 'nav-item'
              }
            >
              {navLinkItems[0].displayText}
            </Link>
          </li>
          <li className="nav-item" key={navLinkItems[1].id}>
            <Link
              to="/cart"
              className={
                activeTabId === navLinkItems[1].path
                  ? `nav-item active-item`
                  : 'nav-item'
              }
            >
              {navLinkItems[1].displayText}
            </Link>
          </li>
          <li className="nav-item" key={navLinkItems[3].id}>
            <Link
              to="/profile"
              className={
                activeTabId === navLinkItems[3].path
                  ? `nav-item active-item`
                  : 'nav-item'
              }
            >
              {navLinkItems[3].displayText}
            </Link>
          </li>
          <li className="nav-item" key={navLinkItems[2].id}>
            <button
              type="button"
              className="logout-button"
              onClick={onClickLogout}
            >
              {navLinkItems[2].displayText}
            </button>
          </li>
        </ul>
      </div>
      <div className="Navbar-small-devices">
        <Link to="/" className="mobile-logo-link">
          <div className="mobile-logo-and-heading-container">
            <img
              src="https://res.cloudinary.com/dg5zldvhw/image/upload/v1662029431/Vector_1px_iths5s.png"
              alt="website logo"
              className="home-website-logo"
            />
            <h1 className="hotel-title">Tasty Kitchens</h1>
          </div>
        </Link>
        <Popup
          modal
          trigger={
            <button type="button">
              <GiHamburgerMenu className="hamburger-icon" />
            </button>
          }
          className="popup-content"
        >
          {close => (
            <div className="popup-container">
              <ul className="small-devices-links">
                <li key={navLinkItems[0].id} className="small-device-item">
                  <Link
                    to="/"
                    className={
                      activeTabId === navLinkItems[0].path
                        ? `mobile-item active-link`
                        : 'mobile-item'
                    }
                  >
                    {navLinkItems[0].displayText}
                  </Link>
                </li>
                <li key={navLinkItems[1].id} className="small-device-item">
                  <Link
                    to="/cart"
                    className={
                      activeTabId === navLinkItems[1].path
                        ? `mobile-item active-link`
                        : 'mobile-item'
                    }
                  >
                    {navLinkItems[1].displayText}
                  </Link>
                </li>
                <li key={navLinkItems[3].id} className="small-device-item">
                  <Link
                    to="/profile"
                    className={
                      activeTabId === navLinkItems[3].path
                        ? `mobile-item active-link`
                        : 'mobile-item'
                    }
                  >
                    {navLinkItems[3].displayText}
                  </Link>
                </li>
                <li className="small-device-item" key={navLinkItems[2].id}>
                  <button
                    type="button"
                    className="mobile-logout-button"
                    onClick={onClickLogout}
                  >
                    {navLinkItems[2].displayText}
                  </button>
                </li>
              </ul>
              <button
                type="button"
                className="popup-close-btn"
                onClick={() => close()}
              >
                <IoCloseCircle size="25" color="#334155" />
              </button>
            </div>
          )}
        </Popup>
      </div>
    </nav>
  )
}

export default withRouter(Header)
