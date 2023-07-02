import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { Alert, Col, Container, Row, Table, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link,useLocation  } from "react-router-dom";
import CheckoutFormStripe from "../components/CheckoutFormStripe";
import CheckoutCOD from "../components/CheckoutCOD";
import { useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation } from "../services/appApi";
import './layoutcss/CheckoutProduct.css';

const stripePromise = loadStripe("pk_test_51M5XykCDcmviDs25zePXAKlNns7UuxCDxzoMZtC0C3OgOIDnQjs3CzdHUrzBkqnvCOcwvC6vEMZKhMQ29jAjJAFH00k4yZLjIZ");

function CheckoutProduct() {
 
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  
  function handlePaymentMethodChange(method) {
    setPaymentMethod(method);
  }

  return (
    <Container fluid style={{textAlign:"left"}}>
      <div className="mt-3">
        <div style={{ backgroundColor: "#f5f5f5", height: "40px" }} className="row">
          <div style={{ display: "initial" }} class="col">
            <ol class="breadcrumb breadcrumb-arrows" style={{ backgroundColor: "#f5f5f5", padding: "7px 5px 0" }}>Trang chủ / Giỏ hàng</ol>
          </div>
        </div>
      </div>

      <Row className="mt-3 ">
        <Col  >
          {cart.length === 0 ? (
            <Link to="/category/all">Hãy thêm sản phẩm vào giỏ hàng</Link>
          ) : (
            <>
              {paymentMethod === "Stripe" ? (
                <Elements stripe={stripePromise}>
                  <CheckoutFormStripe />
                </Elements>
              ) : (
                <CheckoutCOD/>
              )}
            </>
          )}
        </Col>
        {cart.length > 0 && (
          <Col sm={3}>
            {/* <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-white pr-3">Tổng đơn hàng</span></h5>
            <div class="bg-light p-30 mb-5">
              <h6 class="mb-3">Sản phẩm</h6>
              {cart.map((item) => (
                <div class="border-bottom mt-2">
                  <div class="d-flex justify-content-between">
                    <img className="me-4 " src={item.pictures[0].url} style={{ width: "40px" }} />
                    <p>{item.price}₫</p>
                    
                  </div>
                </div>
              ))}
              <div class="border-bottom pt-3 pb-2">
                <div class="d-flex justify-content-between mb-3">
                  <h6>Tạm Tính</h6>
                  <h6>{user.cart.total}₫</h6>
                </div>
                <div class="d-flex justify-content-between">
                  <h6 class="font-weight-medium">Phí Vận Chuyển</h6>
                  <h6 class="font-weight-medium">{user.cart.shippingAmount}đ</h6>
                </div>
              </div>
              <div class="pt-2">
                <div class="d-flex justify-content-between mt-2">
                  <h5>Tổng</h5>
                  <h5>{user.cart.total}₫</h5>
                </div>
              </div>
            </div> */}
            <div class="mb-5">
              <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-white pr-3">HÌNH THỨC THANH TOÁN</span></h5>
              <div class="bg-light p-30">
                <div class="form-group">
                  <div class="custom-control custom-radio">
                    <input type="radio" class="custom-control-input" name="payment" id="cod" checked={paymentMethod === "COD"} onChange={() => handlePaymentMethodChange("COD")} />
                    <label class="custom-control-label" for="cod">THANH TOÁN KHI NHẬN HÀNG</label>
                  </div>
                </div>
                <div class="form-group">
                  <div class="custom-control custom-radio">
                    <input type="radio" class="custom-control-input" name="payment" id="stripe" checked={paymentMethod === "Stripe"} onChange={() => handlePaymentMethodChange("Stripe")} />
                    <label class="custom-control-label" for="stripe">THANH TOÁN VỚI STRIPE</label>
                  </div>
                </div>
              </div>
            </div>
          </Col>    
        )}
      </Row>
    </Container>
  );
}

export default CheckoutProduct;
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import React from "react";
// import { Alert, Col, Container, Row, Table,Form } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import CheckoutForm from "../components/CheckoutForm";
// import { useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation } from "../services/appApi";
// import './layoutcss/CheckoutProduct.css'
// const stripePromise = loadStripe("pk_test_51M5XykCDcmviDs25zePXAKlNns7UuxCDxzoMZtC0C3OgOIDnQjs3CzdHUrzBkqnvCOcwvC6vEMZKhMQ29jAjJAFH00k4yZLjIZ");

// function CheckoutProduct() {
//     const user = useSelector((state) => state.user);
//     const products = useSelector((state) => state.products);
//     const userCartObj = user.cart;
//     let cart = products.filter((product) => userCartObj[product._id] != null);
//     const [increaseCart] = useIncreaseCartProductMutation();
//     const [decreaseCart] = useDecreaseCartProductMutation();
//     const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

//     function handleDecrease(product) {
//         const quantity = user.cart.count;
//         if (quantity <= 1) return alert("Không thể tiếp tục");
//         decreaseCart(product);
//     }


//     return (
//         <Container fluid style={{ textAlign: "left" }} >
//               <div  className=" mt-3">
//                     <div  style={{backgroundColor:"#f5f5f5" ,height:"40px"}}className="row">
//                     <div style={{display:"initial"}} class=" col ">
//                     <ol class="breadcrumb breadcrumb-arrows" style={{backgroundColor:"#f5f5f5" ,padding:"7px 5px 0"}}>Trang chủ /  Giỏ hàng</ol> 
//                     </div>
//               </div>
//             </div>

           
     
//         <Row style={{width:"90%",marginLeft:"80px"}} className="mt-3 ">
//             <Col sm={8}>
                
//                     {cart.length == 0 ? (
//                 <Link  to="/category/all">Hãy thêm sản phẩm vào giỏ hàng </Link>
//                 ) : (
//                         <Elements stripe={stripePromise}>
//                             <CheckoutForm />
//                         </Elements>
//                     )}
//             </Col>
//             {cart.length > 0 && ( 
//             <Col sm={4}>
//                 <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-white pr-3">Tổng đơn hàng</span></h5>
//                 <div class="bg-light p-30 mb-5">
//                   <h6 class="mb-3">Sản phẩm</h6>
//                   {cart.map((item) => (
//                     <div class="border-bottom mt-2">
//                         <div class="d-flex justify-content-between">
//                         <img className="me-4 " src={item.pictures[0].url} style={{ width: "40px" }} />
//                             <p>{item.price}₫</p>
//                         </div>
                        
//                     </div>
//                     ))}
//                     <div class="border-bottom pt-3 pb-2">
//                         <div class="d-flex justify-content-between mb-3">
//                             <h6>Tạm Tính</h6>
//                             <h6>{user.cart.total}₫</h6>
//                         </div>
//                         <div class="d-flex justify-content-between">
//                             <h6 class="font-weight-medium">Phí Vận Chuyển</h6>
//                             <h6 class="font-weight-medium">__</h6>
//                         </div>
//                     </div>
//                     <div class="pt-2">
//                         <div class="d-flex justify-content-between mt-2">
//                             <h5>Tổng</h5>
//                             <h5>{(user.cart.total)}₫</h5>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="mb-5">
//                     <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-white pr-3">Thanh Toán</span></h5>
//                     <div class="bg-light p-30">
//                         <div class="form-group">
//                             <div class="custom-control custom-radio">
//                                 <input type="radio" class="custom-control-input" name="payment" id="paypal"/>
//                                 <label class="custom-control-label" for="paypal">Stripe</label>
//                             </div>
//                         </div>
//                         <div class="form-group">
//                             <div class="custom-control custom-radio">
//                                 <input type="radio" class="custom-control-input" name="payment" id="paypal"/>
//                                 <label class="custom-control-label" for="paypal">COD</label>
//                             </div>
//                         </div>
//                         <button  id="checkout" class="mt-4 btn--checkout  button dark">CHỌN PHƯƠNG THỨC THANH TOÁN</button>
//                     </div>
//                 </div>
//             </Col>
//              )} 
//         </Row>
    
//     </Container>
//     );
// }

// export default CheckoutProduct;
											