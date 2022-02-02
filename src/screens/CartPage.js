import { useEffect, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
// import { setCart } from "../redux/action/cart";
import { forMobile } from "../responsive";
import { loadScript, requestHandler } from "../services";
import { API_ENDPOINT } from "../constants";
import { Box, Button as RemoveButton, Modal, TextField } from "@mui/material";
import LoadingOverlay from 'react-loading-overlay';
import { removeUser } from "../redux/action/user";


const Container = styled.div``;


const Wrapper = styled.div`
  padding: 20px;
  ${forMobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${forMobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${forMobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  ${forMobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${forMobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${forMobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  minHeight: ${(props) => props.length * 110}px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const StyledLoader = styled(LoadingOverlay)`
  width: '100%';
  overflow: scroll;
  .MyLoader_overlay {
    background: rgba(255, 0, 0, 0.5);
  }
  &.MyLoader_wrapper--active {
    overflow: hidden;
  }
`
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const Cart = ({ user }) => {
  const history = useHistory();
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const url = `${API_ENDPOINT}/cart`;
    const data = null;
    const header = {
      'Content-Type': 'application/json',
    };
    const method = "get";
    setIsLoading(true);
    const response = await requestHandler(url, data, header, method);
    setIsLoading(false);
    if (response?.success === true) {
      setCouponLoader({
        isApplied: response?.cart?.coupon?._id ? true : false,
        message: response?.cart?.coupon?._id ? "Coupon Applied": "",
        isOpen: false,
        type: response?.cart?.coupon?.type || "",
        discount: response?.cart?.coupon?.discount || "",
        coupon: response?.cart?.coupon?.name || ""
      })
      setCart({ ...response?.cart });
    }
  }, [])

  const removeFromCartHandler = async (item) => {
    try {
      const url = `${API_ENDPOINT}/cart/items`;

      const data = {
        "item": item,
        "mode": "REMOVE",
        "price": item.price
      };
      const header = {
        'Content-Type': 'application/json',
      };
      const method = "put";

    setIsLoading(true);
      const response = await requestHandler(url, data, header, method);
      setIsLoading(false);
      if (response.success === true) {
        setCart({ ...response.cart });
        setCouponLoader({
          isApplied: response?.cart?.coupon?._id ? true : false,
          message: response?.cart?.coupon?._id ? "Coupon Applied": "",
          isOpen: false,
          type: response?.cart?.coupon?.type || "",
          discount: response?.cart?.coupon?.discount || "",
          coupon: response?.cart?.coupon?.name || ""
        })
      }
    } catch (error) {

    }
  }

  const updateQuantity = async (qty, itemId, price) => {
    try {
      const url = `${API_ENDPOINT}/cart/items`;

      const data = {
        "item": {
          "product": itemId,
          "quantity": qty,
          "price": price
        },
        "mode": "ADD",
        "price": price
      };
      const header = {
        'Content-Type': 'application/json',
      };
      const method = "put";
      setIsLoading(true);
      const response = await requestHandler(url, data, header, method);
      setIsLoading(false);
      if (response.success === true) {
        setCouponLoader({
          isApplied: response?.cart?.coupon?._id ? true : false,
          message: response?.cart?.coupon?._id ? "Coupon Applied": "",
          isOpen: false,
          type: response?.cart?.coupon?.type || "",
          discount: response?.cart?.coupon?.discount || "",
          coupon: response?.cart?.coupon?.name || ""
        })
        setCart({ ...response.cart });
        
      }
    } catch (error) {

    }
  }

  const [couponLoader, setCouponLoader] = useState({
    isLoading: false,
    message: "",
    isOpen: false,
    coupon: "",
    isApplied: false,
    discount: "",
    type: ""
  });

  const applyCouponHandler = async () => {
    try {
      setCouponLoader({
        isLoading: true,
        message: "",
        isOpen: false,
        isApplied: false,
        discount: "",
        type: ""
      });

      const url = `${API_ENDPOINT}/cart/coupon/${cart._id}`;

      const data = {
        "name": couponLoader.coupon,
        "total": cart.subtotal
      };
      const header = {
        'Content-Type': 'application/json',
      };
      const method = "put";
      const response = await requestHandler(url, data, header, method);
      if (response.success === true) {
        setCouponLoader({
          isLoading: false,
          message: "Coupon Applied Successfully.",
          isOpen: true,
          type: response?.coupon?.type,
          isApplied: true,
          discount: response?.coupon?.discount
        });
        
      
        // setCart({ ...response.cart });
      }else{
        setCouponLoader({
          isLoading: false,
          message: response.error?.length ? response?.error : "Error in Applying Coupon",
          isOpen: true,   
          isApplied: false,
          discount: ""
       
        });
      }

      
    } catch (error) {
      setCouponLoader({
        isLoading: false,
        message: "Error in Applying Coupon",
        isOpen: true
      })
    }
  }

  const displayRazorpay = async() => {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		  const url = `${API_ENDPOINT}/order/`;
      const body = {
        subtotal: cart.subtotal,
        total: couponLoader.isApplied === true ? (couponLoader?.type === "FLAT" ? cart?.subtotal - (Number)(couponLoader.discount) : cart?.subtotal - (((100 - (Number)(couponLoader.discount)) * cart?.subtotal) / 100)).toFixed(2): cart?.subtotal,
        tax: 0,
        discount: couponLoader.isApplied === true ? (couponLoader?.type === "FLAT" ? (Number)(couponLoader.discount) : (((100 - (Number)(couponLoader.discount)) * cart?.subtotal) / 100)).toFixed(2): 0,
        couponCode: '',
        user: user.user.user._id,
        items: cart.items.map(item => {
          return({
            product: item.product._id,
            quantity: item.quantity,
            image:item.product.thumbnailImage,
            name: item.product.name,
            price: item.product.sellingPrice
          })
        }),
        phone: address.phone,
        shippingAddress: address,
        billingAddress: address,
        shippingAmount: 0,
        paymentMethod: "RAZORYPAY"
      };
      const header = {
        'Content-Type': 'application/json',
      };
      const method = "post";
      const response = await requestHandler(url, body, header, method);
      if(response.success === false){
        alert('Something went wrong.')
        return;
      }
      const data = response.order;

		const options = {
			key: 'rzp_test_LFDCiolbIVRZTm',
			currency: data.currency,
			amount: (data.total*100)+"",
			// order_id: data._id,
			name: 'THE MUGS.',
			description: 'Thank you for your Purchase.',
			image: 'data:image/jpeg;base64,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',
			handler: async function (razResponse) {
        if(razResponse.razorpay_payment_id){
          const transactionUrl = `${API_ENDPOINT}/transaction`;
          const transactionBody = {
            user: user.user.user._id,
            amount: data.total,
            amountPaid: data.total,
            receipt: razResponse.razorpay_payment_id,
            currency: "INR",
            status: "PAID",
            orderNumber: data.orderNumber,
            order: data._id,
            cartId: cart._id,
            coupon: couponLoader.isApplied === true ? couponLoader.coupon: null
          };
          const header = {
            'Content-Type': 'application/json',
          };
          const method = "post";
          const response = await requestHandler(transactionUrl, transactionBody, header, method);
          console.log(response,"res")
          if(response.success){
            setIsModel(false);
            alert('Order Placed Successfully.');
            history.push('/orders');
          }
        }
			},
			prefill: {
				name: user.user.user.name,
				email: user.user.user.email,
				contact: address.phone
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open();
	}

  const [isModel, setIsModel] = useState(false);
  const [address, setAddress] = useState({
    phone: '',
    line1: '',
    line2: '',
    pinCode: '',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    country: 'India'
  })

  const checkoutHandler = () => {
    setIsModel(true);
  }
  
  const paymentHandler = () => {
    if(!address.line1 || !address.line2 || !address.phone || !address.pinCode || !address.state || !address.city){
      alert('All values are required.');
      return;
    }
    displayRazorpay();
  }
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <Modal
        open={isModel}
        onClose={() => setIsModel(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3, width: '80%'
        }}>
          <h2 id="parent-modal-title">Enter your Shipping Address.</h2>
          <div style={{
            display: "flex",
            flexDirection: "column"
          }}>
            <TextField style={{ marginTop: 10 }} id="outlined-basic" value={address.phone} required={true} onChange={e => setAddress({ ...address, phone: e.target.value })} label="Phone Number" variant="outlined" />
            <TextField style={{ marginTop: 10 }} id="outlined-basic" value={address.line1} required={true}onChange={e => setAddress({ ...address, line1: e.target.value })} label="Line 1" variant="outlined" />
            <TextField style={{ marginTop: 10 }} id="outlined-basic" value={address.line2} required={true}onChange={e => setAddress({ ...address, line2: e.target.value })} label="Line 2" variant="outlined" />
            <TextField style={{ marginTop: 10 }} id="outlined-basic" value={address.city}required={true} onChange={e => setAddress({ ...address, city: e.target.value })} label="City" variant="outlined" />
            <TextField style={{ marginTop: 10 }} id="outlined-basic" value={address.pinCode} required={true}onChange={e => setAddress({ ...address, pinCode: e.target.value })} label="Pin code" variant="outlined" />
            <TextField style={{ marginTop: 10 }} id="outlined-basic" value={address.state} required={true}onChange={e => setAddress({ ...address, state: e.target.value })} label="State" variant="outlined" />
          </div>
          <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "15px 0px 0px 0px"
          }}>
            <RemoveButton variant="outlined" style={{
              cursor: "pointer",
              height: "fit-content",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }} onClick={() => setIsModel(false)} >
              BACK
            </RemoveButton>
            <RemoveButton variant="outlined" style={{
              cursor: "pointer",
              height: "fit-content",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }} onClick={paymentHandler} >
              PROCEED TO PAYMENT
            </RemoveButton>
          </div>
        </Box>
      </Modal>
      <Navbar user={user} cart={cart} history={history} removeUser={removeUser} />
      {/* <Announcement /> */}
      <StyledLoader
        active={isLoading}
        spinner
      >
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <Link to="/">
              <TopButton>CONTINUE SHOPPING</TopButton>
            </Link>
            <TopTexts>
              <TopText>Shopping Bag({cart?.items?.length || 0})</TopText>
              {/* <TopText>Your Wishlist (0)</TopText> */}
            </TopTexts>
            <TopButton onClick={checkoutHandler} type="filled">CHECKOUT NOW</TopButton>
          </Top>
          <Bottom>

            <Info>
              {cart?.items?.map((item, index) => {
                return (
                  <div key={index}>
                    <Product>
                      <ProductDetail>
                        <Image src={item?.product?.thumbnailImage} />
                        <Details>
                          <ProductName>
                            <b>Product: </b> {item?.product?.name}
                          </ProductName>
                          {/* <ProductId>
                    <b>ID:</b> 93813718293
                  </ProductId> */}
                          {/* <ProductColor color="black" /> */}
                          <ProductSize>
                            {item.product?.size} {item.product?.color}
                          </ProductSize>
                        </Details>

                      </ProductDetail>
                      <PriceDetail>
                        <ProductAmountContainer>
                          {
                            item.quantity < item?.product?.stock - 1 ?
                              <Add style={{
                                cursor: "pointer"
                              }} onClick={() => {
                                updateQuantity(item.quantity + 1, item?.product?._id, item.price);
                              }} /> : <></>
                          }

                          <ProductAmount>{item?.quantity}</ProductAmount>
                          {
                            item.quantity > 1 ?
                              <Remove style={{
                                cursor: "pointer",
                              }} onClick={() => {
                                updateQuantity(item.quantity - 1, item.product?._id, item.price);
                              }} /> : <></>
                          }

                        </ProductAmountContainer>
                        <ProductPrice>$ {item?.product?.sellingPrice}</ProductPrice>
                      </PriceDetail>
                      <RemoveButton onClick={() => {
                        removeFromCartHandler({
                          product: item?.product?._id,
                          quantity: item?.quantity,
                          price: item?.product?.sellingPrice
                        });
                      }} variant="outlined" style={{
                        cursor: "pointer",
                        height: "fit-content",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                      }} color="error">
                        Remove
                      </RemoveButton>
                    </Product>

                    {index + 1 !== item?.items?.length && <Hr />}
                  </div>
                )
              })}
            </Info>
            {
              cart?.items?.length > 0 ?

                <Summary length={cart?.items?.length}>
                  <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                  {cart?.items?.map((item, index) => {
                    return (
                      <SummaryItem key={index}>
                        <SummaryItemText>{item?.product?.name}</SummaryItemText>
                        <SummaryItemPrice>$ {item?.product?.sellingPrice}</SummaryItemPrice>
                      </SummaryItem>
                    )
                  }
                  )}
                  <SummaryItem>
                    <SummaryItemText>Subtotal</SummaryItemText>
                    <SummaryItemPrice>$ {cart?.subtotal}</SummaryItemPrice>
                  </SummaryItem>
                  {/* <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem> */}
                  <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "baseline"
                  }}>
                    <TextField value={couponLoader.coupon} onChange={e => setCouponLoader({
                      ...couponLoader,
                      coupon: e.target.value
                    })} id="outlined-basic" label="Coupon Code" inputProps={{ maxLength: 10 }} size="small" variant="outlined" style={{
                      flex: 1,
                      marginBottom: 15
                    }} />
                    <Button style={{ flex: .3, marginLeft: 5 }} disabled={couponLoader.isLoading} onClick={applyCouponHandler}>{couponLoader.isLoading === true ? "Loading." : "Apply"}</Button>
                  </div>
                  {
                    couponLoader.message &&
                    <div
                      style={{
                        textAlign: "center",
                        color: "gray",
                        fontSize: "13px"
                      }}
                    >
                      {couponLoader.message}
                    </div>
                  }
                  <SummaryItem>
                    <SummaryItemText>Discount ({couponLoader?.discount} {couponLoader.type})</SummaryItemText>
                    <SummaryItemPrice>- $ {couponLoader.isApplied === true ? (couponLoader?.type === "FLAT" ? (Number)(couponLoader.discount) : (((100 - (Number)(couponLoader.discount)) * cart?.subtotal) / 100)).toFixed(2) : 0}</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem type="total">
                    <SummaryItemText>Total</SummaryItemText>
                    <SummaryItemPrice>$ {couponLoader.isApplied === true ? (couponLoader?.type === "FLAT" ? cart?.subtotal - (Number)(couponLoader.discount) : cart?.subtotal - (((100 - (Number)(couponLoader.discount)) * cart?.subtotal) / 100)).toFixed(2) : cart?.subtotal}</SummaryItemPrice>
                  </SummaryItem>

                  <Button onClick={checkoutHandler}>CHECKOUT NOW</Button>
                </Summary>
                :
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    height: 120
                  }}
                >
                  No Items found in the cart .
                </div>
            }
          </Bottom>
        </Wrapper>
      </StyledLoader>
      <Footer />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user,
    wishlist: state.wishlist
  };
};

const mapDispatchToProps = dispatch => ({
  removeUser: () => dispatch(removeUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);