import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Slider from '../components/Slider'
import { API_ENDPOINT } from '../constants';
import { addProduct, setCart } from '../redux/action/cart';
import { removeUser } from '../redux/action/user'
import { requestHandler } from '../services';

function HomePage({ user, cart, addProductToCart, setCart, removeUser }) {

    const history = useHistory();
    const [products, setProducts] = useState({
        data:[],
        isLoading: true,
    });



    const getPopularProducts = async() => {
        const url = `${API_ENDPOINT}/product/?limit=6&page=1`;
        const data = null;
        const header = {
            'Content-Type': 'application/json',
        };
        const method = "get";
        const response = await requestHandler(url, data, header, method);
        const { products } = response;
        setProducts({
            ...products,
            isLoading: false,
            data: products
        });
    };
    
    useEffect(() => {
        window.scrollTo(0, 0);
        getPopularProducts();
    }, []);

    return (
        <div>
            {/* <Announcement/> */}

            <Navbar 
                user={user} 
                cart={cart} 
                history={history}
                removeUser={removeUser}
            />

            <Slider/>
            
            <Categories/>

            <Products 
            history={history}
            user={user}
                cart={cart} 
                setCart={setCart} 
                addProductToCart={addProductToCart} 
                products={products.data} 
                isLoading={products.isLoading} 
            />

            <Footer/>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addProductToCart: product => dispatch(addProduct(product)),
    setCart: cart => dispatch(setCart(cart)),
    removeUser: () => dispatch(removeUser())
});

const mapStateToProps = state => {
    return {
        cart: state.cart,
        user: state.user,
        wishlist: state.wishlist
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
