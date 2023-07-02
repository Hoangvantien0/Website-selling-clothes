import React, { useEffect, useState } from "react";
import { Badge, Container, Table ,Row,Col,Form,Image,Modal,Button} from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDeleteOrderMutation,useCreateRateMutation } from "../services/appApi";
import "./layoutcss/OrdersPage.css";
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import ModalReview from "../components/ModalReview";
import rateApi from "../axio/rateApi";

function Comment() {
    // const { id } = useParams();
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [status, setStatus] = useState("all");
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
        const [createRate] = useCreateRateMutation();
        const [product, setProduct] = useState("");
        // const [rates ,setRates] = useState("");

//huỷ đơn
    // const [deleteOrder, { isLoading, isSuccess }] = useDeleteOrderMutation();
    //     function handleDeleteOrder(id)  {
    //         if (window.confirm("Bạn chắc chắn huỷ đơn?")) {
    //         deleteOrder(id)
    //             // .unwrap()
    //             .then(() => {
    //             // Update the orders list after deleting an order
    //             console.log(`Order ${id} deleted successfully`);
    //             setOrders(orders.filter((order) => order.id !== id));
    //             })
    //             .catch((error) => {
    //                 console.error(`Error deleting order with  ${id}: ${error.message}`);
    //             });
    //         }
    //     };
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
//
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
//thêm đánh giá

// const handleCreateRate = () => {
//   axios
//     .post(`/rates/create`, {
//       product: product._id,
//       content: content,
//       score: score,
//     })
//     .then(({ data }) => {
//       // Thực hiện các hành động khác sau khi tạo rate thành công (nếu cần)
//     })
//     .catch(error => {
//       console.error(error); // Xử lý lỗi nếu gửi yêu cầu không thành công
//     });
// };
//thêm đánh giá khi đơn hàng hoàn tất
const handleCreateRate = async (e, body) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(`/rates/create`, body); 
    if (data.success) {
      console.log("Add Rate Successful"); 
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
        <Container fluid>
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
                <Table responsive striped bordered hover style={{fontSize:"13px"}}>
                <thead>
                    <tr  style={{backgroundColor:"#4bb6fa",color:"white"}}>
                        <th>Tên khách hàng </th>
                        <th>Số đơn</th>
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
                <td style={{width:"70px"}}>
                    <span style={{ cursor: "pointer"}} onClick={() => showOrder(order.products)}>
                    XEM ĐƠN <i className="fa fa-eye"></i>
                  </span>
                </td>          
                <td>
                    {order.status === "HoanTat" &&(
                   <button class="custom-button" 
                   onClick={() => showOrderRating(order.products)}
                   >
                    ĐÁNH GIÁ
                   </button>
                 )}  
                 
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
                            Tổng:&nbsp;{Number(order.price) * order.count}₫
                            </Col>
                            xxxxxxxx
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
                <Modal  className="modal1" show={showrating}  
                
                 >
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
                        <Row >
                            <Col className="detail-order" sm={3}>
                            <img src={product.pictures[0].url} style={{ maxWidth: 60, height: 60, objectFit: "cover" }} />
                            </Col >
                            <Col className="detail-order" sm={5}>
                               ({product.count})&nbsp; đơn {product._id} 
                            </Col>
                            <Col className="detail-order" sm={4}>
                            Tổng:&nbsp;{Number(product.price) * product.count}₫
                            </Col>
                            
                        </Row>
                        <Row> 
                        <Form>
                    <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Rating
                        initialRating={score}
                        emptySymbol={<FontAwesomeIcon icon={farStar} />}
                        fullSymbol={<FontAwesomeIcon icon={fasStar} />}
                        onChange={handleRating}
                        />
                    </Form.Group>
                    <Form.Group controlId="review" 
                     
                    >
                        <Form.Label>Review</Form.Label>
                        <Form.Control
                        as="textarea"
                        rows={3}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>
                    
                    </Form>
                        </Row>
                        <Button variant="primary"
                    onClick={(e) =>
                      handleCreateRate(e, {
                        product: product._id,
                        content: content,
                        score: score,
                      })
                    }
                    //  onClick={handleCreateRate}
                    >
                        Submit
                    </Button>    
                  </Container> 
                  ))}
{/* <Container fluid>
  <Form>
    {orderToShowRating.map((product) => (
      <div key={product.id}>
        <Row>
          <Col className="detail-order" sm={3}>
            <img src={product.pictures[0].url} style={{ maxWidth: 60, height: 60, objectFit: "cover" }} />
          </Col>
          <Col className="detail-order" sm={5}>
            ({product.count}) đơn {product._id}
          </Col>
          <Col className="detail-order" sm={4}>
            Tổng: {Number(product.price) * product.count}₫
          </Col>
        </Row>
        <Row>
          <Form.Group >
            <Form.Label>Rating</Form.Label>
            <Rating
              initialRating={score} // Thay score bằng giá trị đánh giá tương ứng với sản phẩm này
              emptySymbol={<FontAwesomeIcon icon={farStar} />}
              fullSymbol={<FontAwesomeIcon icon={fasStar} />}
              onChange={(value) => handleRating(product._id, value)} // Truyền productId và giá trị đánh giá cho handleRating
            />
          </Form.Group>
          <Form.Group >
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content} // Thay content bằng giá trị đánh giá tương ứng với sản phẩm này
              onChange={(e) => setContent(e.target.value)} // Xử lý thay đổi giá trị đánh giá cho sản phẩm này
            />
          </Form.Group>
        </Row>
        <Button variant="primary" onClick={(e) => handleCreateRate(e, product._id, content, score)}>
          Submit
        </Button>
      </div>
    ))}
  </Form>
</Container> */}


                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRating}>
                        Đóng
                    </Button>
                   
                </Modal.Footer>
                </Modal>
                
                </Col>
                
            </Row>
            
        </Container>
    );
}

export default Comment
