import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { API_ENDPOINT } from "../constants";
import { requestHandler } from "../services";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

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
  width: 60%;
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

const ProductPage = () => {

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(()=>{
    getProductInfo();
  },[]);

  const getProductInfo = async() => {
    setIsLoading(true);
      const url = `${API_ENDPOINT}/products/${productId}`;
        const data = null;
        const header = {
            'Content-Type': 'application/json',
        };
        const method = "get";
        const response = await requestHandler(url, data, header, method);
        if(!response?.success){
          setIsLoading(false);
          alert('Something Went Wrong');
          return;
        } 
        const { success } = response ;
        if(success === true){ 
          setProduct({...response?.product});
          console.log(response?.product)
          setIsLoading(false);
        }else{
          setIsLoading(false);
          alert('Something Went Wrong');
          return;
        }
  }

  const history = useHistory();

  return (
    <Container>
      <Navbar history={history} />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          {
            isLoading === true ? 
              <Skeleton width={"100%"} height="100%" />
            :
            <Image src={product?.gallery[0]} />
          }
          
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
              <Skeleton  width={140} height={35} />
            :
            "$" + product?.sellingPrice
          }
          </Price>
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
              <Remove />
              <Amount>1</Amount>
              <Add />
            </AmountContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default ProductPage;