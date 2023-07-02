import React, { useEffect, useState } from "react";
import { Badge, Container, Table ,Row,Col,Form,Image,Modal,Button} from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDeleteOrderMutation } from "../services/appApi";
import "./layoutcss/OrdersPage.css";
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import ModalReview from "../components/ModalReview";
import rateApi from "../axio/rateApi";

function OrdersPage() {
    // const { id } = useParams();
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [status, setStatus] = useState("all");
    const [deleteOrder, { isLoading, isSuccess }] = useDeleteOrderMutation();

    //showOrders
    const products = useSelector((state) => state.products);
    const [orderToShow, setOrderToShow] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    // const handleClose = () => setShow(false);
    const handleCloseRating = () => setShowRating(false);
    const [orderToShowRating, setOrderToShowRating] = useState([]);
    const [showrating, setShowRating] = useState(false);
    // đánh giá
        const [score, setScore] = useState(0);
        const [content ,setContent] = useState("");
        const [product, setProduct] = useState("");
        // const [rates ,setRates] = useState("");
//huỷ đơn hàng 
const handleDeleteOrder = async (id) => {
    try {
      const confirmed = window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?");
      if (!confirmed) {
        return; 
      }
      setLoading(true); 
        const response = await axios.delete(`/orders/${id}`);
  
      if (response.data.message === 'Order deleted successfully') {
        console.log("Đơn hàng đã được xóa thành công");
      } else {
        console.error("Lỗi xóa đơn hàng");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
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
// lấy ra đơn hàng của người dùng
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
// hiểm thị chi tiết đơn
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
//hiện thị sản phẩm hoàn tất
function showOrderRating(productsObj) {
    let productsToShowRa = products.filter((product) => productsObj[product._id]);
    productsToShowRa = productsToShowRa.map((product) => {
      const productCopy = { ...product };
      productCopy.count = productsObj[product._id];
      delete productCopy.description;
      return productCopy;
    });
    setShowRating(true);
    setOrderToShowRating(productsToShowRa);
  }
//thêm đánh giá khi đơn hàng hoàn tất
const handleCreateRate = async (e, body) => {
    e.preventDefault();
    try {
      if (!body.content) {
        console.error("Vui lòng nhập nội dung"); 
        return;
      }
  
      const { data } = await axios.post(`/rates/create`, body); 
      if (data.success) {
        console.log("Thêm Đánh giá thành công"); 
        setScore(0);
        setContent("");
      } else {
        console.error(data.message); 
      }
    } catch (error) {
      console.error(error); 
    }
  };
const handleRating = (value) => {
  setScore(value);
};




//loadOrders
    if (loading) {
        return <Loading />;
    }
//đơn hàng bằng 0
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
        <Container fluid >
             <div  className=" mt-3">
            <div  style={{backgroundColor:"#f5f5f5" ,height:"40px"}}className="row">
              <div style={{display:"initial"}} class=" col ">
              <ol class="breadcrumb breadcrumb-arrows" style={{backgroundColor:"#f5f5f5" ,padding:"7px 5px 0"}}>Trang chủ / Thông tin cá nhân / Đơn hàng</ol> 
              </div>
              </div>
            </div>
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
                <a  class="button dark button_order mt-3" href="/category/all" title="Tiếp tục mua "><i class="fa fa-reply"></i>Tiếp tục mua </a>
            </Col>
                <Col  className="mt-3">
                <p>Lịch sử mua hàng </p>
                <Form.Select style={{width:"10%"}} className="mb-3" value={status} onChange={handleFilter}>
                    <option value="all">Tất cả</option>
                    <option value="ChoXacNhan">Chờ xác nhận</option>
                    <option value="ChoLayHang">Chờ lấy hàng</option>
                    <option value="HoanTat">Hoàn tất</option>
                    <option value="HuyDon">Huỷ đơn</option>
                </Form.Select>
                <Table responsive striped bordered hover style={{fontSize:"12px"}}>
                <thead>
                    <tr  style={{backgroundColor:"#4bb6fa",color:"white"}}>
                        <th>Tên khách hàng </th>
                        <th>Số lượng</th>
                        <th>Thời gian đặt</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Trạng thái</th>
                        <th>Tổng đơn</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
                        <tr>
                            <td>{order.username}</td>
                            <td>{order.count}</td>
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
                <td style={{width:"70px" ,textAlign:"left"}}>
                    <span style={{ cursor: "pointer" }} onClick={() => showOrder(order.products)}>
                    XEM ĐƠN <i className="fa fa-eye"></i>
                  </span>
                </td>          
               <td>
            {order.status === "HoanTat" ? (
                <button class="review_button" onClick={() => showOrderRating(order.products)}>
                ĐÁNH GIÁ
                </button>
            ) : order.status === "ChoXacNhan" ? (
                <button class="review_button"style={{backgroundColor:"red" }} onClick={() => handleDeleteOrder(order._id)}>
                HUỶ ĐƠN
                {isLoading && <span>Loading...</span>}
                </button>
            ) : null}
            </td>
                
        </tr>
                ))}
                </tbody>
                </Table>
                {/* hiển thi chi tiết sản phẩm */}
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
                            Tổng:&nbsp;{Number(order.price) * order.count}₫
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

                {/* đánh giá sản phẩm */}
                <Modal  className="modal1" onHide={handleCloseRating} show={showrating}>
                 <Modal.Header closeButton>
                     <Modal.Title>ĐÁNH GIÁ SẢN PHẨM</Modal.Title>
                 </Modal.Header>
                {orderToShowRating.map((product) => (
                <Container fluid key={product.id}  onSubmit={(e) =>
                  handleCreateRate(e, {
                    product: product._id,
                    content: content,
                    score: score,
                  })}>
                        <Row className="mt-2">
                            <Col className="detail-order" sm={3}>
                            <img src={product.pictures[0].url} style={{ maxWidth: 60, height: 60, objectFit: "cover" }} />
                            </Col >
                            <Col className="detail-order" sm={5}>
                               ({product.count})&nbsp; đơn {product.name} 
                            </Col>
                            <Col className="detail-order" sm={4}>
                            Tổng:&nbsp;{Number(product.price) * product.count}₫
                            </Col>
                            
                        </Row>
                        <br/>
                        <Row> 
                      <Form>
                    <Form.Group controlId="rating">
                        <Form.Label>Chất lượng sản phẩm</Form.Label>&nbsp;&nbsp;
                        <Rating
                        initialRating={score}
                        emptySymbol={<FontAwesomeIcon icon={farStar} />}
                        fullSymbol={<FontAwesomeIcon icon={fasStar} />}
                        onChange={handleRating}
                        />
                    </Form.Group>
                    <Form.Group controlId="review" 
                    >
                        <Form.Control
                        placeholder="Hãy chia sẻ nhận xét của bạn"
                        as="textarea"
                        rows={3}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>
                    
                    </Form>
                        </Row>
                        
                        <Button
                        variant="primary"
                        className="mt-2 button_review"
                        onClick={(e) => {
                            if (!content) {
                            e.preventDefault();
                            window.alert('Vui lòng nhập nội dung đánh giá!');
                            return;
                            }
                            handleCreateRate(e, { product: product._id, content: content, score: score });
                            window.alert('Đã thêm đánh giá thành công!');
                        }}
                        >
                        Gửi
                        </Button>        
                  </Container> 
                  ))}
                  

                <Modal.Footer>
                    <Button className="button_review" variant="primary" onClick={handleCloseRating}>
                        Đóng
                    </Button>
                    
                   
                </Modal.Footer>
                </Modal>
                
                </Col>
                
            </Row>
            
        </Container>
    );
}

export default OrdersPage;
