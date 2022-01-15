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
import { requestHandler } from "../services";
import { API_ENDPOINT } from "../constants";
import { Button as RemoveButton } from "@mui/material";

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

  useEffect(async()=>{
      const url = `${API_ENDPOINT}/cart`;
      const data = null;
      const header = {
        'Content-Type': 'application/json',
      };
      const method = "get";
      const response = await requestHandler(url, data, header, method);
      if(response?.success === true){
        console.log(response.cart)
        setCart({...response?.cart});
      }
  },[])

  const removeFromCartHandler = async(item) => {
    try{
      const url = `${API_ENDPOINT}/cart/items`;

      const data = {
        "item":item,
        "mode": "REMOVE",
        "price": item.price
      };
      const header = {
        'Content-Type': 'application/json',
      };
      const method = "put";
      const response = await requestHandler(url, data, header, method);
      console.log(response);
      if(response.success === true){
        setCart({...response.cart});
      }
    }catch(error){

    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <Navbar user={user} cart={cart} history={history} />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
          <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({cart?.products?.length || 0})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
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
                        <Add />
                        <ProductAmount>{item?.quantity}</ProductAmount>
                        <Remove />
                      </ProductAmountContainer>
                      <ProductPrice>$ {item?.product?.sellingPrice}</ProductPrice>
                    </PriceDetail>
                    <RemoveButton onClick={()=>{
                      removeFromCartHandler({
                        product: item?.product?._id,
                        quantity: item?.quantity,
                        price: item?.product?.sellingPrice
                      });
                    }} variant="outlined" color="error">
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
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart?.total}</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
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

export default connect(mapStateToProps, null)(Cart);