import React, { useEffect } from 'react'
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import { forMobile } from '../responsive';
import { Link } from 'react-router-dom';
import { API_ENDPOINT } from '../constants';
import { requestHandler } from '../services';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;

  ${forMobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;



const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 100%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 30px;
  position: absolute;
    z-index: 3;
    background: white;
    opacity: 0.7;
    left: 
}


`;

const Title = styled.h1`
  font-size: 70px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

function Slider() {
    const [currSliderImage, setCurrSliderImage] = useState(0);
    const [sliderImages, setSliderImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleClick = (direction) => {
        switch (direction) {
            case "left":
                setCurrSliderImage(currSliderImage > 0 ? currSliderImage - 1 : sliderImages.length - 1);
                break;
            case "right":
                setCurrSliderImage(currSliderImage < sliderImages.length - 1 ? currSliderImage + 1 : 0);
                break;
            default:
                break;
        }
    }

    useEffect(async() => {

        try {
            setIsLoading(true);
            const url = `${API_ENDPOINT}/banner`;
            const data = null;
            const header = {
                'Content-Type': 'application/json',
            };
            const method = "get";
            const response = await requestHandler(url, data, header, method);
            const { banners } = response;
            console.log(banners, "Banner")
            setSliderImages([...banners]);
            setIsLoading(false);
        } catch (error) {

            setIsLoading(false);
            console.log('------------------------Slider Line 132-------------------------');
            console.log(error);

        }
    }, [])
    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </Arrow>{isLoading === false &&
            <Wrapper slideIndex={currSliderImage}>
                {sliderImages.map((item) => (
                    <Link     
                        to={"banner/"+item._id}
                        key={item._id}
                    >
                    <Slide bg={"red"} key={item._id}>
                        <ImgContainer>
                            <Image src={item.bannerImage} alt={item.bannerHeading} />
                        </ImgContainer>
                        {/* <InfoContainer>
                            <Title>{item.bannerHeading}</Title>
                            <Desc>{item.bannerCaption}</Desc>
                            <Link
                                to="collection/collectionId"
                            
                            >
                                <Button>SHOW NOW</Button>
                            </Link>
                        </InfoContainer> */}
                    </Slide>
                    </Link>
                ))}
            </Wrapper>}
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}

export default Slider
