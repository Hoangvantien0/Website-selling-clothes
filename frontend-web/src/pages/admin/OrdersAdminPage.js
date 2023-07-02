// import React, { useEffect, useState } from "react";
// import { Badge, Button, Modal, Table ,Container,Row,Col,Nav,Form} from "react-bootstrap";
// import { useSelector } from "react-redux";
// import axios from "../../axios";
// import Loading from "../../components/Loading";
// import Pagination from "../../components/Pagination";
// import "./layout/OrdersAdminPage.css";
// import { useUpdateOrderMutation } from "../../services/appApi";
// import { useNavigate, useParams,Link } from "react-router-dom";
// function OrdersAdminPage() {
//   const { id } = useParams();
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const products = useSelector((state) => state.products);
//     const [orderToShow, setOrderToShow] = useState([]);
//     const [show, setShow] = useState(false);
//     const [status, setStatus] = useState("");
//     const [filteredOrders, setFilteredOrders] = useState([]);
//     const [updateOrder, { isLoading, isSuccess }] = useUpdateOrderMutation();
//     const handleClose = () => setShow(false);

//     function markShipped(orderId, ownerId) {
//         axios
//             .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
//             .then(({ data }) => setOrders(data))
//             .catch((e) => console.log(e));
//     }
//     useEffect(() => {
//       setLoading(true);
//       axios
//           .get("/orders")
//           .then(({ data }) => {
//               setLoading(false);
//               setOrders(data);
//           })
//           .catch((e) => {
//               setLoading(false);
//           });
//   }, []);
// //hiển thị chi tiết sản phẩm 
//     function showOrder(productsObj) {
//         let productsToShow = products.filter((product) => productsObj[product._id]);
//         productsToShow = productsToShow.map((product) => {
//             const productCopy = { ...product };
//             productCopy.count = productsObj[product._id];
//             delete productCopy.description;
//             return productCopy;
//         });
//         console.log(productsToShow);
//         setShow(true);
//         setOrderToShow(productsToShow);
//     }
// //  cập nhật trạng thái đơn hàng
//     const updateOrderStatus = async  (id) => {
//     try {
//       setLoading(true); // Start loading
//       const { data } = await updateOrder(id);
//       setStatus(data.status);
//       setOrders(data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//     if (loading) {
//         return <Loading />;
//     }


//     if (orders.length === 0) {
//         return (
//             <Container>
//             <Row  style={{backgroundColor: 'white', height: '70vh'}} >
                    
//                     <Col sm={7} >
//                         <Link  >
//                         <h5 style={{textAlign:"end",marginTop:"20%"}}>Không có đơn hàng nào !!!</h5>
//                         </Link>
                        
//                     </Col>
//                 </Row>
//                 </Container>
//         )
//     }            
//     function TableRow({ _id, count, owner, date,total,username, status, products, detail,ward,district ,phone,city}) {
//         return ( 
         
//             <tr>
//                 <td>{username}</td>
//                 <td>{count}</td>
//                 <td>{date}</td>
//                 <td>{detail},{ward},{district},{city}</td>
//                 <td>{phone}</td>
//                 <td>{total}đ</td>
//                 <td>
//                 <Badge
//                     className="w-100"
//                     bg={
//                       status === "ChoXacNhan"
//                         ? "dark"
//                         : status === "ChoLayHang"
//                         ? "info"
//                         : status === "HoanTat"
//                         ? "warning"
//                         : status === "HuyDon"    
//                     }>
//                     {status}
//                   </Badge>
//                 </td>
//                 <td>
//                  {status === "ChoLayHang" &&  (
//                     <Button variant="warning" onClick={() => updateOrderStatus(_id)} disabled={isLoading }>
//                       Update
//                     </Button>
//                   )}
//                   {status === "ChoXacNhan" &&  (
//                     <Button   variant="warning" onClick={() => updateOrderStatus(_id)} disabled={isLoading }>
//                       Update
//                     </Button>
//                   )}
//                 </td>
//                 <td style={{width:"70px"}}>
//                     <span style={{ cursor: "pointer"}} onClick={() => showOrder(products)}>
//                         XEM ĐƠN <i className="fa fa-eye"></i>
//                     </span>
//                 </td>
//             </tr>
          
        
//         );

//     }

//     return (
//         <Container  style={{backgroundColor: 'white', height: '70vh'}} >
//         <> 
        
//             <Table className="table1 mt-4" responsive striped bordered hover>
//                 <thead>
//                     <tr style={{backgroundColor:"#4bb6fa",color:"white"}}>
//                         <th>Khách hàng</th>
//                         <th>Số đơn</th>
//                         <th>Thời gian</th>
//                         <th>Địa chỉ</th>
//                         <th>Số điện thoại</th>
//                         <th>Tổng</th>
//                         <th></th>
//                         <th></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <Pagination data={orders} RenderComponent={TableRow} pageLimit={1} dataLimit={10} tablePagination={true} />
//                 </tbody>
//             </Table>
//                 {/* xem đơn hàng */}
//             <Modal  className="modal1" show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Chỉ tiết đơn hàng</Modal.Title>
//                 </Modal.Header>

//                 {orderToShow.map((order) => (
//                     <Container fluid>
//                         <Row >
//                             <Col className="detail-order" sm={3}>
//                             <img src={order.pictures[0].url} style={{ maxWidth: 100, height: 100, objectFit: "cover" }} />
//                             </Col >
//                             <Col className="detail-order" sm={5}>
//                                ({order.count})&nbsp; đơn {order.name}
//                             </Col>
//                             <Col className="detail-order" sm={4}>
//                             Tổng:&nbsp;{Number(order.price) * order.count}đ
//                             </Col>
//                         </Row>
//                         </Container>
//                     ))}
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Đóng
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//         </Container>
//     );
// }
// export default OrdersAdminPage;



import React, { useEffect, useState } from "react";
import { Badge, Button, Modal, Table, Container, Form,Col,Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../axios";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useUpdateOrderMutation } from "../../services/appApi";
import "./layout/OrdersAdminPage.css";

function OrdersAdminPage() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [updateOrder, { isLoading, isSuccess }] = useUpdateOrderMutation();

  const handleClose = () => setShow(false);

  function markShipped(orderId, ownerId) {
    axios
      .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
      .then(({ data }) => setOrders(data))
      .catch((e) => console.log(e));
  }

  function showOrder(productsObj) {
    let productsToShow = products.filter((product) => productsObj[product._id]);
    productsToShow = productsToShow.map((product) => {
      const productCopy = { ...product };
      productCopy.count = productsObj[product._id];
      delete productCopy.description;
      return productCopy;
    });
    setShow(true);
    setOrderToShow(productsToShow);
  }

  const handleFilter = (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);
    if (selectedStatus === "all") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === selectedStatus);
      setFilteredOrders(filtered);
    }
  };
  const updateOrderStatus = async  (id) => {
    try {
      setLoading(true); // Start loading
      const { data } = await updateOrder(id);
      setStatus(data.status);
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get("/orders")
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
        setStatus(data.status);
        setFilteredOrders(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);


 


  if (loading) {
    return <Loading />;
  }

  return (
    <Container >
      <Form.Select style={{width:"10%"}} className="mb-3" value={status} onChange={handleFilter}>
        <option value="all">Tất cả</option>
        <option value="ChoXacNhan">Chờ xác nhận</option>
        <option value="ChoLayHang">Chờ lấy hàng</option>
        <option value="HoanTat">Hoàn tất</option>
        <option value="HuyDon">Huỷ đơn</option>
      </Form.Select>

      <div className="card-style-order">
        <Table responsive bordered style={{fontSize:"12px"}}>
          <thead>
            <tr style={{backgroundColor:"#4bb6fa",color:"white"}}>
              <th>Khách Hàng</th>
              <th>Số lượng</th>
              <th>Thời gian</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Tổng</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((item) => (
              <tr key={item._id}>
                <td>{item.username}</td>
                <td>{item.count}</td>
                <td>{item.date}</td>
                <td>
                  {item.detail}, {item.ward}, {item.district}, {item.city}
                </td>
                <td>{item.phone}</td>
                <td>{item.total}đ</td>
                <td>
                  <Badge
                    className="w-100"
                    bg={
                      item.status === "ChoXacNhan"
                        ? "dark"
                        : item.status === "ChoLayHang"
                        ? "info"
                        : item.status === "HoanTat"
                        ? "warning"
                        : item.status === "HuyDon"
                        
                    }
                  >
                    {item.status}
                  </Badge>
                </td>
                <td style={{width:"50px"}}>
                  {item.status === "ChoLayHang" &&  (
                    <Button variant="warning" 
                    onClick={() => updateOrderStatus(item._id)}
                    style={{fontSize:"10px"}}
                     disabled={isLoading }>
                      CẬP NHẬT
                    </Button>
                  )}
                  {item.status === "ChoXacNhan" &&  (
                    <Button style={{fontSize:"10px"}} variant="warning"
                     onClick={() => updateOrderStatus(item._id)} disabled={isLoading }>
                     CẬP NHẬT
                    </Button>
                  )}
                </td>
                <td style={{width:"70px"}}>
                     <span style={{ cursor: "pointer"}} onClick={() => showOrder(item.products)}>
                         XEM ĐƠN <i className="fa fa-eye"></i>
                     </span>
                 </td>
              </tr>
            ))}
          </tbody>
          
        </Table>
        <Modal  className="modal1" show={show} onHide={handleClose}>
                 <Modal.Header closeButton>
                     <Modal.Title>Chỉ tiết đơn hàng</Modal.Title>
                 </Modal.Header>

                 {orderToShow.map((order) => (
                    <Container fluid>
                        <Row >
                            <Col className="detail-order" sm={3}>
                            <img src={order.pictures[0].url} style={{ maxWidth: 100, height: 100, objectFit: "cover" }} />
                            </Col >
                            <Col className="detail-order" sm={5}>
                               ({order.count})&nbsp; đơn {order.name}
                            </Col>
                            <Col className="detail-order" sm={4}>
                            Tổng:&nbsp;{Number(order.price) * order.count}đ
                            </Col>
                        </Row>
                        </Container>
                    ))}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
      </div>
    </Container>
  );
}

export default OrdersAdminPage;

