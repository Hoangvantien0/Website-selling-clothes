import React, { useEffect, useState } from "react";
import { Badge, Container, Table ,Row,Col,Form,Image,Modal,Button} from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDeleteOrderMutation } from "../services/appApi";
import "./layoutcss/OrdersPage.css";

function OrdersPage() {
    // const { id } = useParams();
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderToShow, setOrderToShow] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [status, setStatus] = useState("all");

    const [deleteOrder, { isLoading, isSuccess }] = useDeleteOrderMutation();
    
        function handleDeleteOrder(id)  {
            if (window.confirm("Bạn chắc chắn xoá?")) {
            deleteOrder(id)
                // .unwrap()
                .then(() => {
                // Update the orders list after deleting an order
                console.log(`Order ${id} deleted successfully`);
                setOrders(orders.filter((order) => order.id !== id));
                })
                .catch((error) => {
                    console.error(`Error deleting order with  ${id}: ${error.message}`);
                });
            }
        };
//lọc đơn
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

// 
    useEffect(() => {
        setLoading(true);
        axios
            .get(`/users/${user._id}/orders`)
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
// 

    const [showReviewForm, setShowReviewForm] = useState(false);
  
    const handleReviewClick = () => {
      setShowReviewForm(true);
    };
    const ReviewForm = () => {
        // TODO: Xử lý logic và giao diện form đánh giá
        return <form>Đây là form đánh giá</form>;
    }
    if (loading) {
        return <Loading />;
    }

    if (orders.length === 0) {
        return (
            <Container fluid  >
                <div  className=" mt-3">
                    <div  style={{backgroundColor:"#f5f5f5" ,height:"40px"}}className="row">
                    <div style={{display:"initial"}} class=" col ">
                    <ol class="breadcrumb breadcrumb-arrows" style={{backgroundColor:"#f5f5f5" ,padding:"7px 5px 0"}}>Trang chủ / Thông tin cá nhân / Đơn hàng</ol> 
                    </div>
              </div>
            </div>
            {/*  */}
                <Row  style={{backgroundColor: 'white', height: '70vh'}} >
                    <Col sm={2} style={{borderRight:"1px dotted black"}}>

                    </Col>
                    <Col sm={7} >
                        <Link  to="/category/all">
                        <h5 style={{textAlign:"end",marginTop:"20%"}}>Không có đơn hàng nào ! hãy mua hàng đi nào!!</h5>
                        </Link>
                        
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
       
            
        <Container fluid>
             <div  className=" mt-3">
            <div  style={{backgroundColor:"#f5f5f5" ,height:"40px"}}className="row">
              <div style={{display:"initial"}} class=" col ">
              <ol class="breadcrumb breadcrumb-arrows" style={{backgroundColor:"#f5f5f5" ,padding:"7px 5px 0"}}>Trang chủ / Thông tin cá nhân / Đơn hàng</ol> 
              </div>
              </div>
            </div>
            {/*  */}
            
            <Row  style={{backgroundColor: 'white', height: '70vh'}}>
            <Col sm={3} style={{borderRight:"1px dotted black"}}>
                          
                 Khách hàng
                <Form.Group style={{width:"80%",marginLeft:"10%",textAlign:"center"}}>    
                <Image style={{height:"50%",width:"50%"}} src="https://static.vecteezy.com/system/resources/previews/007/407/996/original/user-icon-person-icon-client-symbol-login-head-sign-icon-design-vector.jpg"/>
                <br/>
                <Form.Label >Tên Người Dùng</Form.Label>
                <Form.Control type="text" value={user.name} disabled/> 
                <Form.Label >Email </Form.Label>         
                <Form.Control  type="text" value={user.email} disabled/>               
                </Form.Group>
                <a  class="button dark button_order mt-3" href="/category/all" title="Tiếp tục mua hàng"><i class="fa fa-reply"></i>Tiếp tục mua hàng</a>
               

            </Col>
                <Col  className="mt-4">
                <p>Lịch sử mua hàng </p>
                <Form.Select style={{width:"10%"}} className="mb-3" value={status} onChange={handleFilter}>
                    <option value="all">Tất cả</option>
                    <option value="ChoXacNhan">Chờ xác nhận</option>
                    <option value="ChoLayHang">Chờ lấy hàng</option>
                    <option value="HoanTat">Hoàn tất</option>
                    <option value="HuyDon">Huỷ đơn</option>
                </Form.Select>
                <Table responsive striped bordered hover style={{fontSize:"13px"}}>
                <thead>
                    <tr  style={{backgroundColor:"#4bb6fa",color:"white"}}>
                        <th>Tên khách hàng </th>
                        <th>Thời gian đặt</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Trạng thái</th>
                        <th>Tổng đơn</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
                        <tr>
                            <td>{order.username}</td>
                            <td>{order.date}</td>
                            <td>{order.detail}, {order.ward}, {order.district}, {order.city}</td>
                            <td>{order.phone}</td>
                            <td>
                            {/* {order.status} */}
                            <Badge
                                    className="w-100"
                                    bg={
                                        order.status === "ChoXacNhan"
                                        ? "dark"
                                        : order.status === "ChoLayHang"
                                        ? "info"
                                        : order.status === "HoanTat"
                                        ? "warning"
                                        : order.status === "HuyDon"
                                        
                                    }
                                >
                    {order.status}
                  </Badge>
                            </td>
                            <td>{order.total}đ</td>
                            <td>
                            {order.status === "HoanTat" &&(
                                <button class="custom-button" >ĐÁNH GIÁ</button>
                             )}  
                            </td>
                                       
                        </tr>
                ))}
                </tbody>
                </Table>
                </Col>
                
            </Row>
            
        </Container>
    );
}

export default OrdersPage;
