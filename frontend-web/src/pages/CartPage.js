import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Alert, Col, Container, Row, Table,Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation } from "../services/appApi";
import "./layoutcss/CartPage.css";

const stripePromise = loadStripe("pk_test_51M5XykCDcmviDs25zePXAKlNns7UuxCDxzoMZtC0C3OgOIDnQjs3CzdHUrzBkqnvCOcwvC6vEMZKhMQ29jAjJAFH00k4yZLjIZ");

function CartPage() {
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const userCartObj = user.cart;
    let cart = products.filter((product) => userCartObj[product._id] != null);
    const [increaseCart] = useIncreaseCartProductMutation();
    const [decreaseCart] = useDecreaseCartProductMutation();
    const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
 
    function handleDecrease(product) {
        const quantity = user.cart[product.productId];
        if (quantity <= 1) {
            alert("Số lượng sản phẩm trong giỏ hàng phải lớn hơn hoặc bằng 1");
            return;
        }
        decreaseCart(product);
    }

    return (
<Container fluid style={{height:"80vh" }} className="cart-container">
            <div  className=" mt-3">
                    <div  style={{backgroundColor:"#f5f5f5" ,height:"40px"}}className="row">
                    <div style={{display:"initial"}} class=" col ">
                    <ol class="breadcrumb breadcrumb-arrows" style={{backgroundColor:"#f5f5f5" ,padding:"7px 5px 0"}}>Trang chủ /  Giỏ hàng</ol> 
                    </div>
              </div>
            </div>

            {cart.length == 0 && (
                        
                <Link  to="/category/all"  >Giỏ hàng của bạn đang trống? thêm sản phẩm vào giỏ hàng!! </Link>

            )}
            {cart.length > 0 && (
            <Row className="mt-2">
                
                <p>Có {user.cart.count} sản phẩm trong giỏ hàng</p>
          
            <Col md={7} style={{marginLeft:"20px"}}>
               <div>
               <Table className="Table_cart" striped bordered hover style={{width:"100%",marginBottom:"1rem",color:"#6C757D"}}>
                <thead>
                    <tr style={{backgroundColor:"#4bb6fa",color:"white"}}>
                        <th>Sản phẩm</th>
                        <th>Kích thước</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng</th>
                        <th>Xoá</th>
                    
                    </tr>
                </thead>

                <tbody >
                
                {cart.map((item) => (
                    <tr class="line-item-container">
                        <td className="d-flex align-middle justify-content-start">
                        <img className="me-4" src={item.pictures[0].url} style={{ width: "50px" }} />
                       
                        &nbsp;&nbsp;{item.name}
                        </td>
                        <td>{item.size[0]}</td>
                        <td>{item.price}₫ </td>
                        <td className="align-middle">
                        <div className=" quantity mx-auto" style={{ width: "100px" }} >
                          <div className="input-group-btn">
                            <button type="button"
                              className="qtyminus qty-btn "
                              onClick={() => handleDecrease({ productId: item._id, price: item.price, userId: user._id })}
                            >
                              <i className="fa fa-minus"></i>
                            </button>
                          </div>
                          <input
                            type="number" min="1"
                            className="tc line-item-qty item-quantity" value={user.cart[item._id]}
                          />
                          
                          <div className="input-group-btn">
                            <button type="button"
                              className=" qtyplus qty-btn"
                              onClick={() => increaseCart({ productId: item._id, price: item.price, userId: user._id })}
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      {/*  */}
                    
                    <td>{(item.price * user.cart[item._id]).toLocaleString('vi-VN')}₫</td>
                    <td> 
                    <button
                          className="btn btn-sm btn-danger"
                          onClick={() => removeFromCart({ productId: item._id, price: item.price, userId: user._id })}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                    </td>
                    </tr>
                ))}
                
                </tbody>
                </Table> 
           
          </div>
            </Col>
           
            <Col sm={4} >

                <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-white ">TỔNG ĐƠN TRONG GIỎ HÀNG</span></h5>
                <div class="bg-light p-30 mb-5">
                    <div class="border-bottom pb-2">
                        <div class="d-flex justify-content-between mb-3">
                            <h6>Tạm Tính</h6>
                            <h6>{(user.cart.total).toLocaleString('vi-VN')}₫</h6>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h6 class="font-weight-medium">Phí Vận Chuyển</h6>
                            <h6 class="font-weight-medium">__</h6>
                        </div>
                    </div>
                    <div class="pt-2">
                        <div class="d-flex justify-content-between mt-2">
                            <h5>Tổng Đơn</h5>
                            <h5>{(user.cart.total).toLocaleString('vi-VN')}₫</h5>
                        </div>
                        <div class="d-flex justify-content-between mt-2">
                        <Link style={{marginLeft:"1px"}} to="/category/all"class="mt-4 btn-checkout  button dark" name="checkout">TIẾP TỤC MUA </Link>

                        <Link  to="/checkout" id="checkout" class="mt-4 btn-checkout  button dark" name="checkout">THANH TOÁN</Link>
                        </div>
                    </div>
                </div>
            
       
    
            </Col>
              
    </Row>
    )}
</Container> 

       
    );
}

export default CartPage;
