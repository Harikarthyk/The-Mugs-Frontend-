import { Link } from "react-router-dom";
import styled from "styled-components";
import { forMobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  ${forMobile({ height: "20vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
`;

const Button = styled.button`
padding: 10px;
color: gray;
cursor: pointer;
margin-top: 75px;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container key={item._id}>
      <Image src={item.thumbnail} />
      <Info>
        {/* <Title>{item.name}</Title> */}
        <Link
          to={`/collection/${item._id}`}
        >
        <Button>SHOP NOW</Button>
        </Link>
      </Info>
    </Container>
  );
};

export default CategoryItem;