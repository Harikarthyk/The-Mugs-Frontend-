import React, {useEffect, useState} from 'react'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Slider from '../components/Slider'
import { API_ENDPOINT } from '../constants'
import { requestHandler } from '../services'

function HomePage() {
    const [products, setProducts] = useState({
        data:[],
        isLoading: true,
    });

    const getPopularProducts = async() => {
        const url = `${API_ENDPOINT}/products/?sort=1`;
        const data = null;
        const header = {
            'Content-Type': 'application/json',
        };
        const method = "get";
        const response = await requestHandler(url, data, header, method);
        const { products } = response;
        products.length = 6;
        setProducts({
            ...products,
            isLoading: false,
            data: products
        });
    }
    
    useEffect(() => {
        window.scrollTo(0, 0);
        getPopularProducts();
    }, []);

    return (
        <div>
            <Announcement/>
            <Navbar/>
            <Slider/>
            <Categories/>
            <Products products={products.data} isLoading={products.isLoading} />
            <Footer/>
        </div>
    )
}

export default HomePage
