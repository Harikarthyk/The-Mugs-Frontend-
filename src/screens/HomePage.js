import React, {useEffect} from 'react'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Slider from '../components/Slider'

function HomePage() {
    useEffect(() => {
        window.scrollTo(0, 0);
     }, []);
    return (
        <div>
            <Announcement/>
            <Navbar/>
            <Slider/>
            <Categories/>
            <Products/>
            <Footer/>
        </div>
    )
}

export default HomePage
