import React, {useEffect} from 'react';
import { GoogleLogin } from 'react-google-login';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { forMobile } from '../responsive';

const Container = styled.div`
`

const Wrapper = styled.div`
    display: flex;
    height: 80vh;
    margin-top:25px;
    margin-bottom:25px
`;

const ImageWrapper = styled.div`
    flex: 1;
    justify-content: center;
    align-items: center;
    ${forMobile({
        display: "none"
    })}
`;

const Image = styled.img`
    height: 100%;
    border-radius:10px;
    margin-left:8px;
`;

const Text = styled.div`
    flex: 1;
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Title = styled.div`
    font-size: larger;
    font-weight: 800;
    margin-bottom: 25px;
    text-align: center;
`;

const Logo = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom : 50px
`;

function LoginPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
     }, []);
    const responseGoogle = (res) => {
        console.log(res)
    }
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImageWrapper>
                    <Image src="https://images.pexels.com/photos/3867000/pexels-photo-3867000.jpeg" />
                </ImageWrapper>
                <Text>
                    <Logo src="https://user-images.githubusercontent.com/54505967/136685543-82e884b6-fdf7-41ef-8759-f713d74c7da7.png" />
                    <Title>Lets Get Started with The Mugs...</Title>
                    <GoogleLogin
                        clientId={'322501477862-c7dd2lpqggvsmhok7au0baha7ee88bbv.apps.googleusercontent.com'}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    >
                        <span> Login with Google</span>
                    </GoogleLogin>
                </Text>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default LoginPage
