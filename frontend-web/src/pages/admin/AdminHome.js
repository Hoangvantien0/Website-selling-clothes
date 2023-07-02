import React, { useEffect, useState } from "react";
import { Container ,Tab,Row} from "react-bootstrap";
import { useSelector } from "react-redux"
import Loading from "../../components/Loading";
import axios from "../../axios";


import "./layout/AdminHome.css"


function AdminHome ()  {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/products")
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });

    setLoading(true);
    axios
      .get("/users")
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
      axios
      .get("/orders")
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  const totalRevenue = orders.reduce(
    (total, order) => total + order.total,
    0
  );
//doanh thu đơn hàng khi nhập vào là 60%
  const totalRevenueAfterDiscount = totalRevenue * 0.6;
  const total1 = Math.floor(totalRevenue - totalRevenueAfterDiscount);
//



if (loading) {
    <Loading />;
}
  return (
    <Container>
      <Tab.Container defaultActiveKey="products">
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
                      <h3 className="text-bold mb-10">{orders.length}</h3>
                      <p className="text-sm text-success">
                        <i className="lni lni-arrow-up"></i> +2.00% tăng
                        <span className="text-gray">(30 ngày)</span>
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
                      <h3 style={{letterSpacing: "3px"}}
                      className="text-bold mb-10">{totalRevenue}đ</h3>
                      <p className="text-sm text-success">
                        <i className="lni lni-arrow-up"></i>
                        <span className="text-gray">Thu nhập thực {total1}đ</span>
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
                      <h3 className="text-bold mb-10">{products.length}</h3>
                      <p className="text-sm text-danger">
                        <i className="lni lni-arrow-down"></i> 
                        <span className="text-gray">Chi phí nhập vào 60% giá hiện tại</span>
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
                      <h3 className="text-bold mb-10">{users.length}</h3>
                      <p className="text-sm text-danger">
                        <i className="lni lni-arrow-down"></i> 
                        <span className="text-gray">(7 ngày +2 người dùng mới )</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-lg-7">
                  <div className="card-style mb-30">
                    <div className="chart-height">
                      <div className="title d-flex flex-wrap align-items-center justify-content-between">
                        <div className="left">
                          <h6 className="text-medium mb-30">Sales/Revenue</h6>
                        </div>
                        <div className="right">
                          <div className="select-style-1">
                            <div className="select-position select-sm">
                              <select className="light-bg"></select>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Add your chart component here */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="card-style mb-30">
                    <div className="chart-height">
                      <div className="title d-flex flex-wrap align-items-center justify-content-between">
                        <div className="left">
                          <h6 className="text-medium mb-30">Sales/Revenue</h6>
                        </div>
                        <div className="right">
                          <div className="select-style-1">
                            <div className="select-position select-sm">
                              <select className="light-bg"></select>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Add your chart component here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default AdminHome;

{/* <Container>
      <Tab.Container defaultActiveKey="products">
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
      </Tab.Container>
    </Container> */}