import { useEffect, useState } from "react";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { forMobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;

  ${forMobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getCategories();
    });

    const getCategories = async () => {
        try {
            setIsLoading(true);
            const data = [
                {
                    id: 1,
                    img: "https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                    title: "SHIRT STYLE!",
                },
                {
                    id: 2,
                    img: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                    title: "LOUNGEWEAR LOVE",
                },
                {
                    id: 3,
                    img: "https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
                    title: "LIGHT JACKETS",
                },
            ];
            setCategories([...data]);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            console.log('------------ERROR Categories Line 22-----------');
        }
    }

    return (
        <Container>
            {categories.map((item) => (
                <CategoryItem item={item} key={item.id} />
            ))}
        </Container>
    );
};

export default Categories;