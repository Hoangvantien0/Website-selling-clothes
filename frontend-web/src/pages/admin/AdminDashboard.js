import React from "react";
import { Container, Nav, Tab, Col, Row, Form } from "react-bootstrap";
import ClientsAdminPage from "./ClientsAdminPage";
import DashboardProducts from "./DashboardProducts";
import OrdersAdminPage from "./OrdersAdminPage";
import AdminHome from "./AdminHome";
// import "./layout/AdminHome.css"
// import  "./layout/AdminDashboard.css";
function AdminDashboard() {
    return (
        <Container fluid  >
            <div className=" mt-3">
                <div  style={{backgroundColor:"#f5f5f5" ,height:"40px"}}className="row">
                <div style={{display:"initial"}} class=" col ">
                <ol class="breadcrumb breadcrumb-arrows" style={{backgroundColor:"#f5f5f5" ,padding:"7px 5px 0"}}>Trang chủ / Quản Lý</ol> 
                </div>
                </div>
            </div>
            <Form >
            <Tab.Container defaultActiveKey="total">
                <Row >
                    <Col sm={2} style={{borderRight:"1px dotted black"}}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="total">Thống kê</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="products">Sản phẩm</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="orders">Đặt hàng</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="clients">Khách hàng</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                        <Tab.Pane eventKey="total">
                                <AdminHome />
                            </Tab.Pane>
                            <Tab.Pane eventKey="products">
                                <DashboardProducts />
                            </Tab.Pane>
                            <Tab.Pane eventKey="orders">
                                <OrdersAdminPage />
                            </Tab.Pane>
                            <Tab.Pane eventKey="clients">
                                <ClientsAdminPage />
                            </Tab.Pane>
                           
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            </Form> 
          
      {/* <Tab.Container defaultActiveKey="products">
        <Row>
          
          <section className="section">
            <div className="container-fluid">
             
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-sm-6">
                    <div className="icon-card mb-30">
                      <div className="icon purple">
                        <i className="lni lni-cart-full"></i>
                      </div>
                      <div className="content">
                        <h6 className="mb-10">Đơn Mới</h6>
                        <h3 className="text-bold mb-10">
                          
                        </h3>
                        <p className="text-sm text-success">
                          <i className="lni lni-arrow-up"></i> +2.00%
                          <span className="text-gray">(30 days)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-sm-6">
                    <div className="icon-card mb-30">
                      <div className="icon success">
                        <i className="lni lni-dollar"></i>
                      </div>
                      <div className="content">
                        <h6 className="mb-10">Tổng thu nhập</h6>
                        <h3 className="text-bold mb-10">
                       
                        </h3>
                        <p className="text-sm text-success">
                          <i className="lni lni-arrow-up"></i> +5.45%
                          <span className="text-gray">Increased</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-sm-6">
                    <div className="icon-card mb-30">
                      <div className="icon primary">
                        <i className="lni lni-credit-cards"></i>
                      </div>
                      <div className="content">
                        <h6 className="mb-10">Tổng sản phẩm</h6>
                        <h3 className="text-bold mb-10">
                         
                        </h3>
                        <p className="text-sm text-danger">
                          <i className="lni lni-arrow-down"></i> -2.00%
                          <span className="text-gray">Expense</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-sm-6">
                    <div className="icon-card mb-30">
                      <div className="icon orange">
                        <i className="lni lni-user"></i>
                      </div>
                      <div className="content">
                        <h6 className="mb-10">Người dùng mới</h6>
                        <h3 className="text-bold mb-10">
                          
                        </h3>
                        <p className="text-sm text-danger">
                          <i className="lni lni-arrow-down"></i> -25.00%
                          <span className="text-gray"> Earning</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
          

              <div className="row">
                <div className="col-lg-7">
                  <div className="card-style mb-30">
                    <div className="chart-height">
                      <div
                        className="
                    title
                    d-flex
                    flex-wrap
                    align-items-center
                    justify-content-between
                  "
                        style={{ height: "10%" }}
                      >
                        <div className="left">
                          <h6 className="text-medium mb-30">Sales/Revenue</h6>
                        </div>
                        <div className="right">
                          <div className="select-style-1">
                            <div className="select-position select-sm">
                              <select
                                className="light-bg"
                              
                              >
                               
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="card-style mb-30">
                    <div className="chart-height">
                      <div
                        className="
                    title
                    d-flex
                    flex-wrap
                    align-items-center
                    justify-content-between
                  "
                        style={{ height: "10%" }}
                      >
                        <div className="left">
                          <h6 className="text-medium mb-30">Sales/Revenue</h6>
                        </div>
                        <div className="right">
                          <div className="select-style-1">
                            <div className="select-position select-sm">
                              <select
                                className="light-bg"
                        
                              >
                               
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Row>
      </Tab.Container> */}
   
        </Container>
    );
}

export default AdminDashboard;