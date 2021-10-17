import { useEffect, useState } from "react";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { forMobile } from "../responsive";
import { requestHandler } from "../services";
import { API_ENDPOINT } from "../constants";

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
            const url = `${API_ENDPOINT}/categories`;
            const data = null;
            const header = {
                'Content-Type': 'application/json',
            };
            const method = "get";
            const response = await requestHandler(url, data, header, method);
            const {categories} = response;
            setCategories([...categories]);
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