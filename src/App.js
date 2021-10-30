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

function BackToMain() {
  return (
    <Redirect to="/" />
  )
}
function App() {
  return (
    <Router>
      <Switch>
        {/* <CheckUserExists path="/cart"> */}
        <Route exact path="/cart">
          <CartPage />
        </Route>
        {/* </CheckUserExists> */}

        <Route exact path="/product/:productId">
          <ProductPage />
        </Route>
        <Route exact path="/collection/:collectionId">
          <ProductListPage />
        </Route>
        {!localStorage.getItem('user') &&
          <Route exact path="/login">
            <LoginPage />
          </Route>
        }

        <Route exact path="/">
          <HomePage />
        </Route>
        <BackToMain>
          <HomePage />
        </BackToMain>
      </Switch>
    </Router>
  )
}

export default App;
