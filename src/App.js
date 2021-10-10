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
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/cart">
          <CartPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/product/*">
          <ProductPage />
        </Route>
        <Route path="/collection/*">
          <ProductListPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
