import React from 'react'
import styled from 'styled-components';
import Badge from '@mui/material/Badge'
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import { forMobile } from '../responsive';
import { Link } from 'react-router-dom';

const Container = styled.div`
    height: 60px;
    justify-content: "center";

    align-self: center;
    ${forMobile({
    height: "70px",
    display: "flex",
    flex: 1,
})}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: center;

    align-items: center;
    ${forMobile({

    flex: 1,
    display: "flex",
    })}
`;
const Left = styled.div`
    flex:1;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color: black;
  ${forMobile({ fontSize: "20px" })}

`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${forMobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color:black;
  ${forMobile({ fontSize: "12px", marginLeft: "10px" })}
`;


const Language = styled.div`
font-size: 14px;
cursor: pointer;
${forMobile({ display: "none" })}
`;

function navbar() {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>TAMIL NADU | IN</Language>
                </Left>
                <Center>
                    <Link
                        to="/"
                    >
                    <Logo>The MUGS.</Logo>
                    </Link>
                </Center>
                <Right>
                    <Link to="/login">
                        <MenuItem>GET STARTED</MenuItem>
                    </Link>
                    <Link to="/cart">
                   
                    <MenuItem>
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>
                </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default navbar
