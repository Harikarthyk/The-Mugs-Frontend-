import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Product from './Product';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { API_ENDPOINT } from '../constants';
import { requestHandler } from '../services';
import { Snackbar, TextField } from "@mui/material";
import { useHistory } from 'react-router-dom';

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

function Products({ user, history , products, isLoading, cart, addProductToCart, setCart }) {
    // const [isLoading, setIsLoading] = useState(true);
    // const [products, setProducts] = useState([]);
    const dummyArray = [1, 2, 3, 4, 5, 6, 7];
    const [addingToCart, setAddingToCart] = useState(false);
    const [snackbar, setSnackbar] = useState({
        message: '',
        isOpen: false
    })

    const cartListener = async(product) => {
        try {
            if (addingToCart === true) {
              return;
            }
        
            setAddingToCart(true);
      
            const url = `${API_ENDPOINT}/cart/items`;
      
            const data = {
              "item": {
                "product": product._id,
                "quantity": 1,
                "price": product.sellingPrice
              },
              "mode": "ADD",
              "price": product.sellingPrice
            };
            const header = {
              'Content-Type': 'application/json',
            };
            const method = "put";
            const response = await requestHandler(url, data, header, method);
            setAddingToCart(false);
            if (!response?.success) {
              alert('Something Went Wrong');
              return;
            }else{
      
            }
            const { success } = response;
            if (success === true) {
              setSnackbar({
                isOpen: true,
                message: "Added to cart."
              })
            } else {
              alert('Something Went Wrong');
              return;
            }
      
          } catch (error) {
            console.log(error)
            alert("Something went wrong while adding to cart.");
            setAddingToCart(false);
          }
    }

    return (
        <Container>
            <Snackbar
                open={snackbar.isOpen}
                autoHideDuration={3000}
                onClose={() => {
                    setSnackbar({
                        isOpen: false,
                        message: ""
                    })
                }}
                message={snackbar?.message}
            // action={action}
            />
            {isLoading === true ?
                dummyArray.map((item) => {
                    return (
                        <div
                            style={{
                                margin: 10
                            }}
                            key={item+""}
                            >
                            <Skeleton height={350} width={320} />
                        </div>
                    )
                })
                :
                products.map((item) => (
                    <Product history={history} user={user} key={item._id} addingToCart={addingToCart} cartListener={cartListener} item={item} key={item.id} />
                ))}
                {isLoading === false && products.length === 0 ?<div>No items found.</div> :<></>}
        </Container>
    )
}

export default Products
