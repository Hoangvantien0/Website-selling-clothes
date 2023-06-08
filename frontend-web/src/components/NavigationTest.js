import axios from "../axios";
import React, { useRef, useState } from "react";
import { Navbar, Button, Nav, NavDropdown, Container,Row,Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout, resetNotifications } from "../features/userSlice";
// import "./layoutcss/Navigation.css";
import Home from "../pages/Home";

function Navigation() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const bellRef = useRef(null);
    const notificationRef = useRef(null);
    const [bellPos, setBellPos] = useState({});

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
        <Container>
            <Row>
            <Navbar  variant="white" expand="lg" className="navbar--form">
           
           <Container>
           <a href="/" class="text-decoration-none"> 
                   {/* <span style={{marginRight:"-3%"}} class="h1 text-uppercase text-black  px-2 ">CEMMERY</span>  */}
                <img style={{maxHeight:"70px",maxWidth:"300px"}} src="https://file.hstatic.net/200000259629/file/6defaf9a-5eb7-4cff-81ef-4417bec8a949_9b0821c0c76e4c4891aece07962ba501.png"/>
                </a> 
             
              
               

               {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
               {/* <Navbar.Collapse id="basic-navbar-nav" className="navbar-coll" > */}
                   <Nav className="ms-auto nav-toggle " >
                     
                           
                       {!user && (
                           <LinkContainer to="/login">
                               <Nav.Link>Đăng nhập/ đăng ký</Nav.Link>
                           </LinkContainer>
                       )}
                       {user && !user.isAdmin && (
                           <LinkContainer to="/cart">
                               <Nav.Link>
                                   <i className="fas fa-shopping-cart"></i>
                                   {user?.cart.count > 0 && (
                                       <span className="badge badge-warning" id="cartcount">
                                           {user.cart.count}
                                       </span>
                                   )}
                               </Nav.Link>
                           </LinkContainer>
                       )}
                       {user && !user.isAdmin && (
                        <Nav.Link className="kkkk" onClick={handleToggleNotifications}>
                                   <i className="fas fa-bell" ref={bellRef} data-count={unreadNotifications || null}></i>
                               </Nav.Link>
                            )} 
                       {/* if user */}
                       {user && (
                    <>
                    
                    {/* <Nav.Link style={{ position: "relative" }} onClick={handleToggleNotifications}>
                        <i className="fas fa-bell" ref={bellRef} data-count={unreadNotifications || null}></i>
                    </Nav.Link> */}
                        <NavDropdown className="mt-3" title={`Xin chào ${user.name}`}> 
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
                        {/* <LinkContainer to="/info">
                            <NavDropdown.Item>Thông tin cá nhân</NavDropdown.Item>
                        </LinkContainer> */}
                        
                        
                        
                        </>
                        
                    )}
                        <Button style={{marginLeft:"20%"}} variant="danger" onClick={handleLogout} className="mt-2">Đăng xuất</Button>
                        </NavDropdown>
                    </>
                      
                    )}
                   </Nav>
               {/* </Navbar.Collapse> */}

               
           </Container>
           {/* notifications */}
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
       
       {/* <Home/> */}
     </Navbar>
            </Row>
            <Row>
            <Navbar  expand="lg">
      <Container>
       
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* <Navbar.Collapse id="basic-navbar-nav"> */}
          <Nav className="me-auto">
            <Nav.Link href="*">TRANG CHỦ</Nav.Link>
            <NavDropdown title="SHOP" id="basic-nav-dropdown">
            <LinkContainer to="/category/all" >
                    <NavDropdown.Item>TẤT CẢ </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/category/polo" >
                    <NavDropdown.Item>ÁO POLO </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/category/t-shirt">
                    <NavDropdown.Item>ÁO THUN</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/category/short">
                    <NavDropdown.Item>QUẦN </NavDropdown.Item>
                    </LinkContainer>
            </NavDropdown>
            <Nav.Link href="#home">LIÊN HỆ</Nav.Link>
          </Nav>
          <input style={{width:"40%"}} type="search" className="product_search form-control  mt-3" placeholder="Search ..."  />

      </Container>
    </Navbar>
            </Row>
        
      </Container>
    );
}

export default Navigation;