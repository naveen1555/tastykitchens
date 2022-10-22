import Header from '../Header'
import RestaurantsOffer from '../RestaurantsOfferCarousel'
import RestaurantsList from '../RestaurantsList'
import Footer from '../Footer'

const Home = () => (
  <>
    <Header activeTabId="Home" />
    <RestaurantsOffer />
    <RestaurantsList />
    <Footer />
  </>
)

export default Home
