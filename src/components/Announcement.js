import styled from "styled-components";

const Container = styled.div`
    height: 45px;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-weight: 500;

    text-align: center;
    padding: 15px;
`;

const Announcement = () => {
    return (
        <Container>
            Super Deal! Free Shipping on Orders Over 1500
        </Container>
    );
};

export default Announcement;