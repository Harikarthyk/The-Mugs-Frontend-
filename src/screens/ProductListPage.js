import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import { useParams } from "react-router-dom";
import { API_ENDPOINT } from '../constants';
import { requestHandler } from '../services';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Container = styled.div`
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const Option = styled.option``;

function ProductListPage() {
    const [collection, setCollection] = useState({});
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { collectionId } = useParams();
    
    useEffect(() => {
        window.scrollTo(0, 0);
        getAllProductsByCategory();
    }, []);

    const getAllProductsByCategory = async() => {
        const url = `${API_ENDPOINT}/categories/${collectionId}`;
        const data = null;
        const header = {
            'Content-Type': 'application/json',
        };
        const method = "get";
        const response = await requestHandler(url, data, header, method);
        setIsLoading(false);
        setProducts([...response?.products]);
        setCollection({...response?.category});
    }

    return (
        <div>
            <Navbar />
            <Announcement />
            <Title>
                {isLoading === true ?
                <div
                    style={{
                        marginLeft: 5
                    }}
                >
                    <Skeleton width={260} height={55} /> 
                    </div>:
                    collection.name
                }
            </Title>
            {/* <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select>
                        <Option disabled selected>
                            Color
                        </Option>
                        <Option>White</Option>
                        <Option>Black</Option>
                        <Option>Red</Option>
                        <Option>Blue</Option>
                        <Option>Yellow</Option>
                        <Option>Green</Option>
                    </Select>
                    <Select>
                        <Option disabled selected>
                            Size
                        </Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select>
                        <Option selected>Newest</Option>
                        <Option>Price (asc)</Option>
                        <Option>Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer> */}
            <Products products={products} isLoading={isLoading} />
            <Footer />
        </div>
    )
}

export default ProductListPage;
