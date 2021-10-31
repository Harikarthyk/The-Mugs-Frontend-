import React, { useEffect } from 'react';
import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { API_ENDPOINT } from '../constants';
import { setUser } from '../redux/action/user';
import { forMobile } from '../responsive';
import { requestHandler } from '../services';

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


function LoginPage({ user, cart, setUser }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();
    const responseGoogle = async (res) => {
        setIsLoading(true);
        const url = `${API_ENDPOINT}/users/auth`;
        const data = res.profileObj;
        const header = {
            'Content-Type': 'application/json',
        };
        const method = "post";
        const response = await requestHandler(url, data, header, method);
        setIsLoading(false);
        const { success } = response;
        if (success === true) {
            const { token, user } = response;
            localStorage.setItem('token', token);
            setUser({
                token: token,
                user: user
            });
            // history.goBack();
            history.replace('/');
        } else {
            alert('Something went wrong');
        }
    }


    return (
        <Container>
            <Navbar user={user} cart={cart} history={history}/>
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
                        onFailure={() => {

                        }}
                    >
                        <span> Login with Google </span>
                    </GoogleLogin>
                </Text>
            </Wrapper>
            <Footer />
        </Container>
    )
}


const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user)),
});

const mapStateToProps = state => {
    return {
        cart: state.cart,
        user: state.user,
        wishlist: state.wishlist
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
