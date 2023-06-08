import axios from "../axios";
import React, { useRef, useState,useEffect } from "react";
import { Navbar, Button, Nav, NavDropdown , Container,Row ,Col, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout, resetNotifications } from "../features/userSlice";
import {   ShoppingCartOutlined  } from "@material-ui/icons";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import PhonelinkRingIcon from '@material-ui/icons/PhonelinkRing';
import "./layoutcss/Navbar.css";

function Navbars() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const bellRef = useRef(null);
    const notificationRef = useRef(null);
    const [bellPos, setBellPos] = useState({});
    // const [showNotifications, setShowNotifications] = useState(false);


  
// 
function handleLogout() {
    dispatch(logout());
}
const unreadNotifications = user?.notifications?.reduce((acc, current) => {
    if (current.status == "unread") return acc + 1;
    return acc;
}, 0);

function handleToggleNotifications() {
    const position = bellRef.current.getBoundingClientRect();
    setBellPos(position);
    notificationRef.current.style.display = notificationRef.current.style.display === "block" ? "none" : "block";
    dispatch(resetNotifications());
    if (unreadNotifications > 0) axios.post(`/users/${user._id}/updateNotifications`);
}
    return (
         <Container fluid > 
            <div  style={{backgroundColor:" #5bc6f8",textAlign:"center" ,height:"22px"}}> 
                Miễn phí vận chuyển với đơn hàng trên 400k
            </div>
            <Row className="navbar-top-Row" > 
                <Col sm={2} >
                <a href="/" class="text-decoration-none"> 
                <img style={{maxHeight:"70px",maxWidth:"300px"}} src="https://file.hstatic.net/200000259629/file/6defaf9a-5eb7-4cff-81ef-4417bec8a949_9b0821c0c76e4c4891aece07962ba501.png"/>
                </a> 
                </Col><Col sm={5} >
                </Col>
               
                {/* if no user */}
                <Col sm={1} className="col_right " >
                
                {user && !user.isAdmin && (
                   <Nav.Link style={{ position: "relative",fontSize:"150%" }} onClick={handleToggleNotifications}>
                        <i className="fas fa-bell" ref={bellRef} data-count={unreadNotifications || null}></i>
                    </Nav.Link> 
                
                 )} 

                </Col> 
            
                {/* cart  */} 
                    <Col className=" nav-toggle" sm={1}  >
                    {user && !user.isAdmin && (
                        <LinkContainer to="/cart">
                        <Nav.Link  className="">
                            <i style={{fontSize:"140%"}} className=" fas fa-shopping-cart"></i>
                            {user?.cart.count > 0 && (
                                <span className="badge badge-warning" id="cartcount">
                                    {user.cart.count}
                                </span>
                            )}
                        </Nav.Link>
                    </LinkContainer>
                   )} 
                    
                    </Col> 
            
                
                     
                    <Col sm={2} style={{marginTop:"2.5rem"}}>
                        {/* login */}
                    {!user && ( 
                        <LinkContainer className=" notification2" to="/login">
                        
                        <Nav.Link>Đăng nhập / Đăng ký</Nav.Link>
                    </LinkContainer>
                    )} 
                    {/* if user */}
                    {user && (
                    <>
                    
                        <NavDropdown className="" title={`Tài khoản của ${user.name}`}> 
                        {user.isAdmin && (
                        <>
                        <LinkContainer to="/admin">
                            <NavDropdown.Item>Quản Lý</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to="/new-product">
                            <NavDropdown.Item>Thêm Sản phẩm</NavDropdown.Item>
                        </LinkContainer>

                        </>
                        )}
                    {/* if user */}
                        {!user.isAdmin && (
                        <>
                        <LinkContainer to="/cart">
                            <NavDropdown.Item>Giỏ hàng</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/orders">
                            <NavDropdown.Item>Đơn mua</NavDropdown.Item>
                        </LinkContainer>
                        </>
                        
                    )}
                        <Button style={{marginLeft:"20%"}} variant="danger" onClick={handleLogout} className="mt-2">Đăng xuất</Button>
                        </NavDropdown>
                    </>
                      
                    )}
                </Col>
            </Row>
           
            {/* <div  className="row mt-2"> */}
            <Row >  
            <Navbar className="navbar_row" >
            <Container fluid>
            
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {/* <Navbar.Collapse id="basic-navbar-nav"> */}
                <Nav  className="me-auto ">
                    <Nav.Link style={{paddingLeft:"30px"}} className="item_nav" href="/">TRANG CHỦ</Nav.Link>
                    <NavDropdown style={{paddingLeft:"30px"}} className="item_nav" title="SHOP" id="basic-nav-dropdown">
                    <LinkContainer  to="/category/all" >
                            <NavDropdown.Item>TẤT CẢ </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer  to="/category/polo" >
                            <NavDropdown.Item >ÁO POLO </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/category/t-shirt">
                            <NavDropdown.Item>ÁO THUN</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/category/short">
                            <NavDropdown.Item>QUẦN </NavDropdown.Item>
                            </LinkContainer>
                    </NavDropdown>
                    <Nav.Link style={{paddingLeft:"30px"}} className="item_nav" href="/contact">LIÊN HỆ</Nav.Link>
                    <Nav.Link style={{paddingLeft:"30px"}} className="item_nav" href="/orders">KIỂM TRA ĐƠN HÀNG</Nav.Link>
                </Nav>
                {/* <input style={{width:"40%"}} type="search" className="product_search form-control  mt-3" placeholder="Search ..."  /> */}

            </Container>
    </Navbar>
             </Row> 
             <div className="notifications-container" ref={notificationRef} style={{ position: "absolute", top: bellPos.top + 30, left: bellPos.left, display: "none" }}>
                
                {user?.notifications.length > 0 ? (
                   user?.notifications.map((notification) => (
                       <p className={`notification-${notification.status}`}>
                           {notification.message}
                           
                           <br />
                           <span>{notification.time.split("T")[0] + " " + notification.time.split("T")[1]}</span>
                       </p>
                   ))
               ) : (
                   <p>Không có thông báo </p>
               )}
           </div>
         </Container> 
        
        
    );
}
export default Navbars;


	