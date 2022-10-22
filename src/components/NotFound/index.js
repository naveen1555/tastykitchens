import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dkwefqjnn/image/upload/v1660704261/Layer_1_c8ydvi.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found Please go back to
      the homepage
    </p>
    <Link to="/" className="not-found-link">
      <button className="not-found-button" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
