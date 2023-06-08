import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate, useParams,Link } from "react-router-dom";
import { useUpdateProductMutation } from "../../services/appApi";
import axios from "../../axios";

import "./layout/NewProduct.css";

function EditProduct() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [updateProduct, { isError, error, isLoading, isSuccess }] = useUpdateProductMutation();
    
    useEffect(() => {
        axios
            .get("/products/" + id)
            .then(({ data }) => {
                const product = data.product;
                setName(product.name);
                setDesc(product.desc);
                setPrice(product.price);
                setCategory(product.category);
                setSize(product.size)
                setColor(product.color);
                setImages(product.pictures);
            })
            .catch((e) => console.log(e));
    }, [id]);

    // function handleRemoveImg(imgObj) {
    //     setImgToRemove(imgObj.public_id);
    //     axios
    //         .delete(`/images/${imgObj.public_id}/`)
    //         .then((res) => {
    //             setImgToRemove(null);
    //             setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
    //         })
    //         .catch((e) => console.log(e));
    // }
    function handleRemoveImg(imgObj) {
        if (window.confirm("Bạn có chắc muốn xóa hình ảnh này?")) {
            setImgToRemove(imgObj.public_id);
            axios
                .delete(`/images/${imgObj.public_id}/`)
                .then((res) => {
                    setImgToRemove(null);
                    setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
                    alert("Xóa hình ảnh thành công!");
                })
                .catch((e) => {
                    setImgToRemove(null);
                    alert(`Xóa hình ảnh không thành công: ${e.message}`);
                });
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !desc || !price || !category || !size ||!color || !images.length) {
            return alert("Vui lòng điền tất cả thông tin");
        }
        updateProduct({ id, name, desc, price, category,size,color, images })
        .then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }

    function showWidget() {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "your-cloudname",
                uploadPreset: "your-preset",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }

    return (
        <Container fluid>
         <div  className="container-fluid mt-3">
            <div  style={{backgroundColor:"#f5f5f5" ,height:"40px"}}className="row">
              <div style={{display:"initial"}} class=" col ">
              <ol class="breadcrumb breadcrumb-arrows" style={{backgroundColor:"#f5f5f5" ,padding:"8px 5px 0"}}>Trang chủ / Chỉnh sửa sản phẩm </ol> 
              </div>
              </div>
            </div>
            <Link style={{display:"table-cell",borderRadius:"0"}} to="/category/all" class="btn submits frgt-pass">TRỞ VỀ</Link>
        <Row  >     
            <Col >
                <Form  className="from-new-product-container bg-light p-25 mb-5"  onSubmit={handleSubmit}  >
                <h5 class="  text-uppercase mb-3">
                  <span class="bg-white pr-3">Chỉnh sửa thông tin sản phẩm</span></h5>
                    {isSuccess && <Alert variant="success">Sản phẩm đã được cập nhật</Alert>}
                         {isError && <Alert variant="danger">{error.data}</Alert>}

                    <Container>

                        <Row>
                            {/*  */}
                            <Col>
                                <Form.Group className="mb-3  " >
                                    <Form.Label>Tên sản phẩm</Form.Label>
                                    <Form.Control type="text" placeholder="Nhập tên sản phẩm" value={name} required onChange={(e) => setName(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Giá sản phẩm</Form.Label>
                                    <Form.Control type="number" min="1" placeholder="Nhập giá" value={price} required onChange={(e) => setPrice(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Kích thước</Form.Label>
                                    <Form.Control type="text" placeholder="Nhập khích thước"  value={size} required onChange={(e) => setSize(e.target.value.split(","))} />
                                </Form.Group>

                    
                        
                                <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
                                    <Form.Label>Loại</Form.Label>
                                    <Form.Select value={category}>
                                    <option disabled selected>
                                        -- Loại Sản Phẩm --
                                    </option>                                                  
                                    <option value="polo">Polo</option>
                                    <option value="short">Short</option>
                                    <option value="t-shirt">T-Shirt</option>
                                    </Form.Select>

                                </Form.Group>
                            {/*  */}
                                <Form.Group className="mb-3">
                                <Button style={{borderRadius:"0",width:"50%"}} type="button" onClick={showWidget}>
                                Thêm ảnh
                                </Button>
                                {/* load image */}
                            <div className="images-preview-container">
                            {images.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} />
                                        {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>
                        
                        </Col>
                        {/*  */}
                        <Col>
                        <Form.Group className="mb-3">
                                    <Form.Label>Màu</Form.Label>
                                    <Form.Control type="text"  placeholder="Nhập màu áo"  value={color} required onChange={(e) => setColor(e.target.value.split(","))} />
                                </Form.Group>
                        <Form.Group className="mb-3 ">
                            <Form.Label>Mô Tả Sản Phẩm</Form.Label>
                                <Form.Control as="textarea" placeholder="Mô Tả Về Sản Phẩm" style={{ height: "210px" }} value={desc} required onChange={(e) => setDesc(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group>
                                    <Button style={{borderRadius:"0",width:"50%"}} type="submit" disabled={isLoading || isSuccess}>Xác Nhận</Button>
                        </Form.Group>
                        </Col>
                        {/*  */}
                        </Row>
                    </Container>
                </Form>    
             </Col>                
        </Row>
    </Container>
       
    );
}

export default EditProduct;