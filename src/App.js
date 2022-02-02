import './App.css';
import CartPage from './screens/CartPage';
import LoginPage from './screens/LoginPage';
import HomePage from './screens/HomePage';
import ProductPage from './screens/ProductPage';
import ProductListPage from './screens/ProductListPage';
import ProductListBannerPage from "./screens/ProductListBannerPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import OrdersPage from './screens/OrdersPage';
import { connect } from 'react-redux';
import { setCart } from './redux/action/cart';


// function CheckUserExists({
//   path
// }) {

//   if (false) {
//     return (
//       <Redirect exact path="/cart">
//         <CartPage />
//       </Redirect>
//     )
//   } else {
//     return (
//       <Redirect to="/login" />
//     )
//   }
// }

function WrongRoute() {
  return (
    <Redirect to="/" />
  )
}

function App({ user, cart }) {
  return (
    <Router>
      <Switch>

        <Route exact path="/cart">
          <CartPage />
        </Route>
       
        <Route exact path="/product/:productId">
          <ProductPage />
        </Route>

        <Route exact path="/collection/:collectionId">
          <ProductListPage />
        </Route>

        {!user?.token  &&
          <Route exact path="/login">
            <LoginPage />
          </Route>
        }

        <Route exact path="/banner/:bannerId">
          <ProductListBannerPage />
        </Route>

        <Route exact path="/orders">
          <OrdersPage />
        </Route>

        <Route exact path="/">
          <HomePage />
        </Route>
        

        <WrongRoute>
          <HomePage />
        </WrongRoute>

      </Switch>
    </Router>
  )
}

const mapDispatchToProps = dispatch => ({
  setCart: cart => dispatch(setCart(cart)),
});

const mapStateToProps = state => {
  return {
      cart: state.cart,
      user: state.user,
      wishlist: state.wishlist
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
