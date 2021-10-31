import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Product from './Product';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`


const ProductContainer = styled.div`
// flex: 1;
// display: flex;
// align-items: center;
// justify-content: center;
// position: relative;
// margin: 5px;
// min-width: 280px;
// height: 350px;
`;

function Products({ products, isLoading, cart, addProductToCart, setCart }) {
    // const [isLoading, setIsLoading] = useState(true);
    // const [products, setProducts] = useState([]);
    const dummyArray = [1, 2, 3, 4, 5, 6, 7];

    const cartListener = async(product, newQuantity = 1) => {
        if(!cart?.products){
            setCart({
                total: product.sellingPrice * newQuantity,
                products: [{
                    product: product,
                    quantity: newQuantity
                }],
            });
            return;
        }
        const exists = await cart?.products?.filter(item => item.product._id === product._id);
        // console.log(exists)
        if(exists?.length === 0){
            addProductToCart({
                product: product,
                quantity: newQuantity
            });
        };
    }

    return (
        <Container>
            {isLoading === true ?
                dummyArray.map(item => {
                    return (
                        <div
                            style={{
                                margin: 10
                            }}
                            key={item}>
                            <Skeleton height={350} width={320} />
                        </div>
                    )
                })
                :
                products.map((item) => (
                    <Product key={item._id} cartListener={cartListener} item={item} key={item.id} />
                ))}
        </Container>
    )
}

export default Products
