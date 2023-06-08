import React, { useEffect, useState } from "react";
import { Badge, Container, Table ,Row,Col,Form,Image,Modal,Button,Label} from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import "./layoutcss/OrdersPage.css";
import { useCreateRateMutation } from "../services/appApi";

function OrdersPage() {
    const { id } = useParams();
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [product, setProduct] = useState("");
    const [content, setContent] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [status, setStatus] = useState("all");
    // const [deleteOrder ,{ isLoading, isSuccess }] = useDeleteOrderMutation();
    const [createRate ,{ isLoading, isSuccess } ] = useCreateRateMutation();
    const [rate, setRate] = useState([]);
    const [show, setShow] = useState(false);
    const [score, setScore] = useState(0);
    const [review, setReview] = useState('');
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
        
        // function handleDeleteOrder(id)  {
        //     if (window.confirm("Bạn chắc chắn huỷ đơn?")) {
        //     deleteOrder(id)
        //         // .unwrap()
        //         .then(() => {
        //         // Update the orders list after deleting an order
        //         console.log(`Order ${id} deleted successfully`);
        //         setOrders(orders.filter((order) => order.id !== id));
        //         })
        //         .catch((error) => {
        //             console.error(`Error deleting order with  ${id}: ${error.message}`);
        //         });
        //     }
        // };
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
// chức năng tạo rate
// const handleCreateRate = () => {
//     createRate({
//       productId: product._id, // Modified: Use `productId` instead of `product`
//       user: user._id,
//       score: score, // Pass the selected score
//       content: content,
//     })
//       .then((response) => {
//         // Thông báo tạo thành công
//         console.log("Tạo đánh giá thành công!");
//         handleClose();
//       })
//       .catch((error) => {
//         // Thông báo tạo thất bại
//         console.error("Đã xảy ra lỗi khi tạo đánh giá:", error);
//       });
//   };
//
const handleCreateRate = () => {
    axios
    .post(`/rates/${product._id}`,{
        product: product._id,
        user: user._id,
        content: content,
        rate: rate,
    })
    .then(({ data }) => {
        setRate(data.data);
      });
    handleClose();
}
//
  const handleRating = (value) => {
    setScore(value);
  };

//   const handleReviewChange = (event) => {
//     setReview(event.target.value);
//   };

//   const handleSaveChanges = () => {
//     handleClose();
//   };
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
                                <button onClick={handleShow}class="custom-button" >ĐÁNH GIÁ</button>
                             )} 
                            </td>
                               
                        </tr>
                ))}
                </tbody>
                </Table>
                {/*  */}
  
            
    <Modal show={show} >
        <Modal.Header closeButton > 
        <h4 style={{fontWeight:"normal"}} > ĐÁNH GIÁ CỦA BẠN</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="text-primary text-center ">
            <Rating style={{fontSize:"25px"}}
              initialRating={score}
              emptySymbol={<FontAwesomeIcon icon={farStar} />}
              fullSymbol={<FontAwesomeIcon icon={fasStar} />}
              onClick={handleRating}
            />
          </div>
          <Form.Group>
            <Form.Label>Nội dung</Form.Label>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick= {() => handleCreateRate()}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
                </Col>
                
            </Row>
            
        
        </Container>
    );
}

export default OrdersPage;




  