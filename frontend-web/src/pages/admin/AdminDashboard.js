import React, { useState } from "react";
import { Container, Nav, Tab, Col, Row, Form } from "react-bootstrap";
import ClientsAdminPage from "./ClientsAdminPage";
import DashboardProducts from "./DashboardProducts";
import OrdersAdminPage from "./OrdersAdminPage";
import AdminHome from "./AdminHome";
import Loading from "../../components/Loading";
import RateAdmin from "./RateAdmin";
// import "./layout/AdminHome.css"
// import  "./layout/AdminDashboard.css";

function AdminDashboard() {
  const [loading, setLoading] = useState(false);

  return (
    <Container fluid>
      {loading ? (
        <Loading /> // Render the loading component when loading is true
      ) : (
        <>
          <div className="mt-3">
            <div
              style={{ backgroundColor: "#f5f5f5", height: "40px" }}
              className="row"
            >
              <div style={{ display: "initial" }} class=" col ">
                <ol
                  class="breadcrumb breadcrumb-arrows"
                  style={{ backgroundColor: "#f5f5f5", padding: "7px 5px 0" }}
                >
                  Trang chủ / Quản Lý
                </ol>
              </div>
            </div>
          </div>
          <Form>
            <Tab.Container defaultActiveKey="orders">
              <Row>
                <Col sm={2} style={{ borderRight: "1px dotted black" }}>
                  <Nav variant="pills" className="flex-column">
                    {/* <Nav.Item>
                      <Nav.Link eventKey="total">Thống kê</Nav.Link>
                    </Nav.Item> */}
                    <Nav.Item>
                      <Nav.Link eventKey="products">Sản phẩm</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="orders">Đặt hàng</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="clients">Khách hàng</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="rates">Đánh giá</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={10}>
                  <Tab.Content>
                    {/* <Tab.Pane eventKey="total">
                      <AdminHome />
                    </Tab.Pane> */}
                    <Tab.Pane eventKey="products">
                      <DashboardProducts />
                    </Tab.Pane>
                    <Tab.Pane eventKey="orders">
                      <OrdersAdminPage />
                    </Tab.Pane>
                    <Tab.Pane eventKey="clients">
                      <ClientsAdminPage />
                    </Tab.Pane>
                    <Tab.Pane eventKey="rates">
                      <RateAdmin />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Form>
        </>
      )}
    </Container>
  );
}

export default AdminDashboard;
