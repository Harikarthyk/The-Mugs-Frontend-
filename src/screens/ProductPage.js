
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { Snackbar, TextField } from "@mui/material";
import Navbar from "../components/Navbar";
import { API_ENDPOINT } from "../constants";
import { requestHandler } from "../services";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import { connect } from "react-redux";
import { addProduct, setCart } from "../redux/action/cart";
import ReactImageMagnify from 'react-image-magnify';

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import LoadingOverlay from "react-loading-overlay";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: contain;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin-left: 25px;
  &:hover{
      background-color: #f8f4f4;
  }
`;

const ProductPage = ({ user, cart, setCart, addProductToCart }) => {

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getProductInfo();
  }, []);

  const getProductInfo = async () => {
    setIsLoading(true);
    const url = `${API_ENDPOINT}/product/${productId}`;
    const data = null;
    const header = {
      'Content-Type': 'application/json',
    };
    const method = "get";
    const response = await requestHandler(url, data, header, method);
    if (!response?.success) {
      setIsLoading(false);
      alert('Something Went Wrong');
      return;
    }
    const { success } = response;
    if (success === true) {
      setProduct({ ...response?.product });
      console.log(response?.product)
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alert('Something Went Wrong');
      return;
    }
  }

  const addToCartHandler = async () => {
    try {
      if (addingToCart === true) {
        return;
      }
      const qty = (Number)(quantity) || 0;
      if (!qty) {
        alert("Enter Qty.");
        return;
      }
      setAddingToCart(true);

      const url = `${API_ENDPOINT}/cart/items`;

      const data = {
        "item": {
          "product": product._id,
          "quantity": qty,
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

  const [addingToCart, setAddingToCart] = useState(false);

  const history = useHistory();
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: ""
  })

  return (
    <Container>
      <Navbar user={user} cart={cart} history={history} />
      <Announcement />
      <LoadingOverlay
        active={addingToCart || isLoading}
        spinner
      >
        <Snackbar
          open={snackbar.isOpen}
          autoHideDuration={3000}
          onClose={()=>{
            setSnackbar({
              isOpen: false,
              message: ""
            })
          }}
          message={snackbar?.message}
          // action={action}
        />
      <Wrapper>
        <ImgContainer>
          {
            isLoading === true ?
              <Skeleton width={"100%"} height="100%" />
              :


              // product.gallery.map((src) => (
              //     <div>
              //         <ReactImageMagnify
              //             {...{
              //                 smallImage: {
              //                     alt: 'Wristwatch by Versace',
              //                     // isFluidWidth: true,
              //                     src: src.url,
              //                     // srcSet: src.srcSet,
              //                     // sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
              //                 },
              //                 largeImage: {
              //                     src: src.url,
              //                     width: 26,
              //                     height: 20
              //                 },
              //                 lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }
              //             }}
              //         />
              //     </div>
              // ))

              // <div style={{width: "100%", height: "100%"}}>
              <AwesomeSlider style={{ width: "100%", height: "100%" }}>
                {product.gallery.map(item => {
                  return (
                    <div style={{ width: "100%", height: "100%" }}>
                      <ReactImageMagnify
                        {...{
                          smallImage:
                          {
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            src: item.url
                          },
                          largeImage: {
                            src: item.url,
                            width: 1200,
                            height: 1800
                          }
                        }}
                      />
                    </div>
                  )
                })}
              </AwesomeSlider>

            // </div>
          }
          {/* // <Image src={product?.gallery[0].url} /> */}

        </ImgContainer>
        <InfoContainer>
          <Title>{product?.name}</Title>
          <Desc>
            {
              isLoading === true ?
                <Skeleton count={4} width={"100%"} height="120%" />
                :
                product?.description
            }
          </Desc>
          <Price>
            {
              isLoading === true ?
                <Skeleton width={140} height={35} />
                :
                "INR. " + product?.sellingPrice
            }
          </Price>
          <div style={{
            color: product.isActive ? "green" : "red"
          }} >
            {
              isLoading === true ?
                <Skeleton width={90} height={25} />
                :
                product.isActive === true ? "AVAILABLE" : "NOT AVAILABLE"
              }
          </div>

          {/* <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer> */}
          <AddContainer>
            <AmountContainer>
              <TextField
                type="number"
                InputProps={{
                  inputProps: {
                    max: product.stock > 10 ? 10 : product.stock, min: 1,
                    inputMode: 'decimal'
                  }
                }}
                style={{
                  width: 100
                }}
                value={quantity}
                onChange ={(e) => {
                  setQuantity(e.target.value)
                }}
                id="qty"
                label="Qty"
              />
            </AmountContainer>
            <Button onClick={addToCartHandler}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      </LoadingOverlay>
      <Footer />
    </Container>
  );
};

const mapDispatchToProps = dispatch => ({
  setCart: user => dispatch(setCart(user)),
  addProductToCart: product => dispatch(addProduct(product)),
});

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user,
    wishlist: state.wishlist
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);