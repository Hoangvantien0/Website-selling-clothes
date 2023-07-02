import axios from "../axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { ButtonGroup, Form, Button,Col,Row,Container,Pagination   } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
// import { useAddToCartMutation } from "../services/appApi";
import "./layoutcss/ProductPage.css";
import { LinkContainer } from "react-router-bootstrap";
import ToastMessage from "../components/ToastMessage";
import ProductPreview from "../components/ProductPreview";
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import Rating from "react-rating";
import {  useAddToCartMutation } from "../services/appApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

import rateApi from "../axio/rateApi";
const Filter = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px dotted #dfe0e1;
    padding: 10px 0;
`;
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
    align-items: left;
`;
const FilterColor = styled.div`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
    cursor: pointer;
    align-items: left;
    border: 1px solid #ccc;
    margin-left: 30px;
`;
const FilterSize = styled.select`
    margin-left: 30px;
    padding: 5px;
   background-color: rgb(212, 210, 221);
`;
const FilterSizeOption = styled.option`
border-radius: 50%;

`;
const Price = styled.div`


text-align: left;
font-size: 130%
`
function ProductPage() {
    const { id } = useParams();
    const [rates ,setRates] = useState("");
    const user = useSelector((state) => state.user);
    const [product, setProduct] = useState("");
    const [similar, setSimilar] = useState(null);
    const handleDragStart = (e) => e.preventDefault();
    const [selectedImage, setSelectedImage] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addToCart, { isSuccess }] = useAddToCartMutation();
    const [loading, setLoading] = useState(true);

// rating
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 1;
// số lượng sp
const [quantity, setQuantity] = useState(1);
  const maxQuantity = product.quality; 

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const incrementQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };
  useEffect(() => {
    setLoading(true);
    setQuantity(1); 
  }, []);
//lấy ra sản phẩm và rate 
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const productResponse = await axios.get(`/products/${id}`);
          const rateResponse = await axios.get(`/rates/${id}`);
          setLoading(false);
          setProduct(productResponse.data.product);
          setSimilar(productResponse.data.similar);
          setSelectedImage(productResponse.data.product.pictures[0].url);
          setRates(rateResponse.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [id]);
//
const handleImageClick = (url) => {
    setSelectedImage(url);
    };
//
    if (!product) {
        return <Loading />;
    }
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };
//
    let similarProducts = [];
    if (similar) {
        similarProducts = similar.map((product, idx) => (
            <div className="item" data-value={idx}>
                <ProductPreview {...product} />
            </div>
        ));
    }
// đánh giá sp
const totalPages = Math.ceil(rates.length / itemsPerPage);

// Get current items to display
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = rates.slice(indexOfFirstItem, indexOfLastItem);

// Function to handle page change
const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};
//
return (
  <Container fluid>  
    <div  className=" mt-3">
      <div  style={{backgroundColor:"#f5f5f5" ,height:"40px"}}className="row">
        <div  class=" col ">
          <ol class="breadcrumb breadcrumb-arrows" style={{padding:"8px 5px 0"}}>Trang chủ / Chi tiết sản phẩm </ol>
        </div>
      </div>
    </div>
            
     <Row>
      <Col sm={6} className=" mt-2"> 
        <Row className="product-content-img">
      <Col  sm={3} class="product-gallery__thumbs  ">
        <div class="product-gallery__thumbs-container hidden-sm hidden-xs">
          <div class="product-gallery__thumb "  >
            {product.pictures.map((picture) => (
              <img 
              className="mt-2"
              style={{width:"70%",height:"70%",objectFit:"cover"}}
              key={picture.id}
              src={picture.url}
              alt={product.name}
              onClick={() => handleImageClick(picture.url)}
              />
            ))}
          </div>
        </div>
      </Col>
        
        <Col className="product-gallery" sm={5}>
          <img style={{width:"250%",height:"100%",objectFit:"cover"}} src={selectedImage} alt={product.name} />
        </Col>
      </Row>
    {/*  */}
          </Col>
          <Col>
            <Filter> <Price>{product.name} ( Còn {product.quality} sản phẩm)</Price></Filter>
            <Filter>  <Price>{product.price}₫</Price> </Filter>
            <Filter>
            <FilterTitle>Kích thước</FilterTitle>
            <FilterSize>
              {product.size?.map((s) => (
                <FilterSizeOption
                  key={s} >
                  {s}
                </FilterSizeOption>
              ))}
            </FilterSize>
          </Filter>
          <Filter>
            <FilterTitle>Màu</FilterTitle>
            {product.color?.map((c) => (
              <FilterColor
                color={c}
                key={c}/>
            ))}
          </Filter>
          
              <Filter>
          <div className="quantity mx-auto" style={{ width: "100%" }}>
            <div className="input-group-btn">
              <button type="button" className="qtyminus qty-btn1" onClick={decrementQuantity}>
                <i className="fa fa-minus"></i>
              </button>
            </div>
            <input
              type="number" min="1" value={quantity} 
              className="tc line-item-qty item-quantity1" 
              onChange={handleQuantityChange}
            />
            <div className="input-group-btn">
              <button type="button" className="qtyplus qty-btn1" onClick={incrementQuantity}>
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </Filter>
          {user && !user.isAdmin && (
            <ButtonGroup style={{ width: "100%"}} className=" ">
              
              <button class="button_cart dark" onClick={() => addToCart({ userId: user._id, productId: id, price: product.price, image: product.pictures[0].url })} >
               Thêm Vào Giỏ Hàng
              </button>
            </ButtonGroup>                          
          )}
              {/* admin edit sp */}
                  {user && user.isAdmin && (
                    <ButtonGroup style={{ width: "100%"}} className=" ">
                    <a style={{}} class="button button_cart dark" size="lg" href={`/product/${product._id}/edit`} title="Sửa sản phẩm"><i class="fa fa-reply"></i>Sửa sản phẩm</a>
                    </ButtonGroup> 
                    )}
                    {/* thong báo thêm sp vào cart */}
                    {isSuccess && <ToastMessage bg="info" title="Hãy tiếp tục thêm Sản phẩm" body={`${product.name} đã có trong giỏ hàng của bạn`} />}
  
                   <p class="comment mt-3"> Mô tả </p>
                    <div class="comment1 py-2" style={{ textAlign: "justify" }}>
                      <p>Bảng size áo Cemmery :<br/>
                      <br/>M : Dài 70 Rộng 56 | 1m55 - 1m60, 45kg - 55kg<br/>
                      <br/>L : Dài 72 Rộng 58 | 1m60 - 1m75, 55kg - 65kg<br/>
                      <br/>XL : Dài 74 Rộng 60 | trên 1m75, trên 70kg<br/>
                      <br/>Bảng size quần Cemmery :<br/>
                      <br/> M : Dài 56 Rộng 69 | 1m55 - 1m60, 45kg - 55kg<br/>
                      <br/>L : Dài 58 Rộng 70 | 1m60 - 1m75, 55kg - 60kg<br/>
                      <br/>XL : Dài 60 Rộng 72 | trên 1m75, trên 70kg 
                    </p>
                        <p>🔹{product.desc}</p>
                        <p>
                            <br/>Hướng dẫn sử dụng :
                            <br/>Nhớ lộn áo trái khi giặt và không giặt ngâm<b/>
                            Không giặt máy trong 10 ngày đầu
                            <br/>Khi phơi lộn trái áo và không phơi trực tiếp dưới ánh nắng mặt trời<br/>
                            <br/>Chính sách đổi trả :<br/>Sản phẩm được đổi trả 1 lần trong vòng 3 ngày kể từ khi nhận được hàng (chỉ đổi size, không đổi mẫu và màu khác)
                            <br/>Miễn phí đổi hàng cho khách trong trường hợp bị lỗi từ nhà sản xuất, giao nhầm trong vòng 30 ngày.
                            </p>
                    </div>
                </Col>
            </Row>
              {/* đánh giá sản phẩm */}
              
       <Container style={{ width: "90%" }} className="bg-light container_rate mt-4">
          <div className="nav nav-tabs mb-4">
            <h3  className="nav-item nav-link text-dark" data-toggle="tab" style={{fontSize:"15px"}}>
            <b>ĐÁNH GIÁ SẢN PHẨM</b>
            </h3>
          </div>
          {currentItems.map((rates) => (
            <Row className="bg-light product_user" key={currentItems.id}>
              <Col sm={1} style={{ padding: "0" }}>
                <div className="bg-light p-30">
                  <div className="product-rating">
                    <img
                      style={{ height: "60%", width: "60%" }}
                      src="https://static.vecteezy.com/system/resources/previews/007/407/996/original/user-icon-person-icon-client-symbol-login-head-sign-icon-design-vector.jpg"
                      alt="User Avatar"
                    />
                  </div>
                </div>
              </Col>
              <Col className="rating__main tab-content">
                {/* <div className="rating_content nav-tabs">
                  <p>
                    Khách hàng : {rates.user.name}
                    <br />
                    Email : {rates.user.email}
                  </p>
                </div> */}
                <div className="rating">
                  ĐÁNH GIÁ:{" "}
                  <Rating
                    initialRating={rates.score}
                    emptySymbol={<i className="far fa-star"></i>}
                    fullSymbol={<i className="fas fa-star"></i>}
                    readonly
                  />
                 
                </div>
                <div>
                  <p className="nav-tabs">{rates.content}</p>
                </div>

              </Col>
            </Row>
          ))}   
           <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
        </Container>

{/* sản phẩm liên quan  */}
            <div class="mt-4">
                <h2>SẢN PHẨM LIÊN QUAN</h2>
                <div className="d-flex justify-content-center align-items-center flex-wrap mt-4">
              <AliceCarousel
                mouseTracking
                items={similarProducts}
                responsive={responsive}
                tablePagination={false}
                slideToIndex={currentIndex}
                onSlideChanged={(event) => setCurrentIndex(event.item)}
                renderPrevButton={() => <FaArrowAltCircleLeft />}
                renderNextButton={() => <FaArrowAltCircleRight />}
              />
    
            </div>
            </div>
            
            
        </Container>
        
    )
}

export default ProductPage;
