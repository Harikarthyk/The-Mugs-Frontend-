import React, { useEffect } from 'react'
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import { forMobile } from '../responsive';
import { Link } from 'react-router-dom';

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
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
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

    useEffect(() => {

        try {
            setIsLoading(true);
            const data = [
                {
                    id: 1,
                    img: "https://i.ibb.co/XsdmR2c/1.png",
                    title: "SUMMER SALE",
                    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
                    bg: "f5fafd",
                },
                {
                    id: 2,
                    img: "https://i.ibb.co/DG69bQ4/2.png",
                    title: "AUTUMN COLLECTION",
                    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 50% OFF FOR NEW ARRIVALS.",
                    bg: "fcf1ed",
                },
                {
                    id: 3,
                    img: "https://i.ibb.co/cXFnLLV/3.png",
                    title: "LOUNGEWEAR LOVE",
                    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 300% OFF FOR NEW ARRIVALS.",
                    bg: "fbf0f4",
                },
            ];

            setSliderImages([...data]);
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
            </Arrow>
            <Wrapper slideIndex={currSliderImage}>
                {sliderImages.map((item) => (
                    <Slide bg={item.bg} key={item.id}>
                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Link
                                to="collection/collectionId"
                            >
                                <Button>SHOW NOW</Button>
                            </Link>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}

export default Slider
