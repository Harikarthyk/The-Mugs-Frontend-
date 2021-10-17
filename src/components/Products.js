import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Product from './Product';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`


function Products({products, isLoading}) {
    // const [isLoading, setIsLoading] = useState(true);
    // const [products, setProducts] = useState([]);
    
    return (
        <Container>
            {products.map((item) => (
                <Product item={item} key={item.id} />
            ))}
        </Container>
    )
}

export default Products
