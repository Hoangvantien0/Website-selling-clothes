import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Alert, Col, Container, Row, Table,Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import CheckoutForm from "../components/CheckoutForm";
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
    // const [similar, setSimilar] = useState(null);
    // const [product, setProduct] = useState("");
    // 
    // const handleDragStart = (e) => e.preventDefault();
    // useEffect(() => {
    //     axios.get(`/products/${id}`).then(({ data }) => {
    //         setProduct(data.product);
    //         setSimilar(data.similar);
    //     });
    // }, [id]);
    // 
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
                        <td>{item.price}₫</td>
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
                    
                    <td>{item.price * user.cart[item._id]}₫</td>
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
                            <h6>{user.cart.total}₫</h6>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h6 class="font-weight-medium">Phí Vận Chuyển</h6>
                            <h6 class="font-weight-medium">__</h6>
                        </div>
                    </div>
                    <div class="pt-2">
                        <div class="d-flex justify-content-between mt-2">
                            <h5>Tổng Đơn</h5>
                            <h5>{(user.cart.total)}₫</h5>
                        </div>
                        {/* <button type="submit" to="/checkout" id="checkout" class="mt-4 btn-checkout  button dark" name="checkout" value="">Thanh toán</button> */}
                        <Link  to="/checkout" id="checkout" class="mt-4 btn-checkout  button dark" name="checkout">THANH TOÁN</Link>
                    </div>
                </div>
            
       
    
            </Col>
              
    </Row>
    )}
</Container> 
        // 
        // <Container fluid style={{ minHeight: "70vh" }} className="cart-container">
        //     <div  className=" mt-3">
        //             <div  style={{backgroundColor:"#f5f5f5" ,height:"40px"}}className="row">
        //             <div style={{display:"initial"}} class=" col ">
        //             <ol class="breadcrumb breadcrumb-arrows" style={{backgroundColor:"#f5f5f5" ,padding:"7px 5px 0"}}>Trang chủ /  Giỏ hàng</ol> 
        //             </div>
        //       </div>
        //     </div>
        //     <Row>
                
               
                    
        //             {cart.length == 0 ? (
        //                 // <Alert style={{width:"50%",marginLeft:"25%",marginTop:"10%"}}  variant="info">Bạn không có sản phẩm trong giỏ hàng,vui lòng thêm sản phẩm?</Alert>
                       
                    
        //         <div class="row mb-4" >
        //                 <h3>Giỏ hàng của bạn</h3>
        //                 <p style={{backgroundColor:"white",minHeight:"40%",marginTop:"1%"}}>Giỏ hàng của bạn đang trống</p>

                   
                    
        //             <div class="cart-buttons mt-4 mb-4">
        //             <a style={{color:"black"}} class="button dark link-continue" href="/category/all" title="Tiếp tục mua hàng"><i class="fa fa-reply"></i>Tiếp tục mua hàng</a>
        //             {/* <button type="submit" id="update-cart" class="btn-update button dark" name="update" value="">Cập nhật</button> */}
        //             <button type="submit" id="checkout" class="btn-checkout  button dark" name="checkout" value="">Thanh toán</button>
        //             </div>
        //            </div>
                
            
        //             ) : (
        //                 <Elements stripe={stripePromise}>
        //                     <CheckoutForm />
        //                 </Elements>
        //             )}
 
        //         {/*  */}
               
        //         {cart.length > 0 && (
                    
        //          <Col md={7} >
        //             <div class="row">
                        
        //                 <p>Giỏ hàng của bạn</p>
        //             <div class="col-md-12 col-sm-12 col-xs-12" style={{borderBottom:"1px dotted   #727475"}}>
        //                     {cart.map((item) => (
        //                 <table class="table-cart">
                        
        //                 <tbody>
                            
        //                 <tr class="line-item-container" >
                           
        //                     <td class="image">
        //                     {!isLoading && <i className="fa fa-times" style={{ marginRight: 10, cursor: "pointer" }}
        //                     onClick={() => removeFromCart({ productId: item._id, price: item.price, userId: user._id })}></i>}
        //                     <img src={item.pictures[0].url} style={{ width: 110, height: 110, objectFit: "cover" }} />
        //                     </td>
        //                     <td className="item" >
                    
        //                     <h5 className="item">{item.name}</h5>
        //                     <p className="item">{item.price}₫</p>
        //                     <p className="item">{item.size[0]} / {item.color}</p>
                    
        //                         <div class=" item qty quantity-partent qty-click clearfix quantity-indicato">
        //                         <button type="button "  class="qtyminus qty-btn" onClick={() => handleDecrease({ productId: item._id, price: item.price, userId: user._id })}>-</button>	
        //                         {/* <input type="number" min="1"  class="tc line-item-qty item-quantity" value={user.cart[item._id]} onChange={(e) => increaseCart({ productId: item._id, price: item.price, userId: user._id, quantity: e.target.value })} /> */}

        //                         <input type="number" min="1"  class="tc line-item-qty item-quantity" value={user.cart[item._id]} />	
        //                         <button type="button" class="qtyplus qty-btn" onClick={() => increaseCart({ productId: item._id, price: item.price, userId: user._id })}>+</button>
                                
        //                         </div>
        //                     </td>

        //                     <td class="remove">
                                
        //                     </td>
        //                     </tr>
        //                 </tbody>
        //             </table>
        //                 ))}
        //             </div>
        //             <div class="col-md-4 col-sm-12 col-xs-12"></div>
        //             {/*  */}
        //             <div class="col-md-8 col-sm-12 col-xs-12 text-right">
        //             <table class="table_tolal">   
        //             <tbody>
        //                 <tr>
        //                    <td style={{textAlign:"left"}}>Tạm tính</td>
        //                    <td style={{textAlign:"right"}}>{user.cart.total}₫</td>
                           
        //                 </tr>
        //                 {/*  */}
        //                 <tr style={{borderBottom:"1px double  #727475 "}}>
        //                     <td style={{textAlign:"left"}}>Phí vận chuyển</td>
        //                     <td style={{textAlign:"right",}}></td>
        //                 </tr>
        //                    {/*  */}
        //                    <tr >
        //                         <td style={{textAlign:"left"}}>Tổng cộng</td>
        //                         <td style={{textAlign:"right"}}>{(user.cart.total)}₫</td>
        //                     </tr>
        //             </tbody>
        //             </table>


        //             <div class="cart-buttons mt-4 mb-4">
        //             <a  class="button button_cart dark link-continue" href="/category/all" title="Tiếp tục mua hàng"><i class="fa fa-reply"></i>Tiếp tục mua hàng</a>
        //             {/* <button type="submit" id="update-cart" class="btn-update button dark" name="update" value="">Cập nhật</button> */}
        //             <button type="submit" id="checkout" class="btn-checkout  button dark" name="checkout" value="">Thanh toán</button>
                    
        //             </div>

        //            </div>
            
        //     </div>
        //     </Col>
            
        //     )}
        //         </Row>
        //        </Container>
    );
}

export default CartPage;