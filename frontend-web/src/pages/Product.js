import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row,Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ProductPreview from "../components/ProductPreview";
import Pagination from "../components/Pagination";
import "./layoutcss/Product.css";
import styled from "styled-components";

const Container = styled.div``;
const Filter = styled.div`
  display: flex;
  align-items: center;
   
`;
const FilterText = styled.span`
  font-size: 15px;
  font-weight: 50px;
  margin-right: 5px;
  `;
const Option = styled.option``;

function Product()
 {
    const { category } = useParams();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/products/category/${category}`)
            .then(({ data }) => {
                setLoading(false);
                setProducts(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e.message);
            });
    }, [category]);

    if (loading) {
        <Loading />;
    }

    // const productsSearch = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const productsSearch = products.filter((product) =>
    searchTerm.toLowerCase().trim() === "" || // return all products when no search term is entered
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    function ProductSearch({ _id, category, name, pictures ,price,color,size}) {
        return <ProductPreview _id={_id} category={category} name={name} pictures={pictures} price={price} color={color} size={size}/>;
    }
  
   
  
    return (

        <Container >
            <Container className="hh1">
              <Row style={{backgroundColor:"#f5f5f5" ,height:"38px"}}>
                <Col sm={4}>
                <p style={{marginTop:"6px",marginRight:"50%"}}>Trang chủ / Shop / {category.charAt(0).toUpperCase() + category.slice(1)}</p>
                </Col>
                <Col  >
                <input style={{width:"50%",marginLeft:"50%"}} type="search" class="form-control " placeholder="Search ..." onChange={(e) => setSearchTerm(e.target.value)} />
                </Col>
                <Col sm={2}>
                <Filter>
                <FilterText>Sizes:</FilterText>
                <Form.Select name="size" style={{width:"45%"}}  onChange={(e) => setSearchTerm(e.target.value)}>
                <Option value="">Tất cả</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
                </Form.Select>
            </Filter>
                </Col>
              </Row>
            </Container>
                {/* product */}
                {productsSearch.length === 0 ? (
                  // san pham =0
               <Container>
                <Row>
                   <Col style={{borderRight:"1px dotted #dfe0e1"}} sm={2}> 
  
                  </Col>

                  <Col style={{backgroundColor: 'white', height: '70vh'}} sm={10}> 
                  <p style={{marginTop:"10%"}}>Không có sản phẩm nào?</p>
                  </Col>
                </Row>
               </Container>
                ) : (
                <Container >
                  <Row  >  
                    <Col style={{borderRight:"1px double #dfe0e1"}} sm={2} className="">
                    <p style={{marginTop:"10%"}}>Sản phẩm nổi bật </p>
                    <p>tất cả sản phẩm </p>
                    </Col> 
                    {/* list product */}
                    <Col  sm={10} className="mt-4" >
                      <Pagination data={productsSearch} RenderComponent={ProductSearch} pageLimit={5} dataLimit={16} tablePagination={false} />
                    </Col>

                  </Row>
                </Container>
                )}
      </Container>

        
    );
}

export default  Product;

