import './App.css';
import CartPage from './screens/CartPage';
import LoginPage from './screens/LoginPage';
import HomePage from './screens/HomePage';
import ProductPage from './screens/ProductPage';
import ProductListPage from './screens/ProductListPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
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

        {/* <CheckUserExists path="/cart"> */}
        <Route exact path="/cart">
          <CartPage />
        </Route>
        {console.log(user,'----',cart)}
        {/* </CheckUserExists> */}

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
