import React, { useEffect, useState } from "react";
import { Table, Button,Col,Container ,Badge} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import axios from "../../axios";
import { AiOutlineEdit ,AiFillDelete ,AiOutlinePlus } from 'react-icons/ai';
import { useParams } from "react-router-dom";
import "./layout/DashboardProducts.css";

function RateAdmin() {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const user = useSelector((state) => state.user);
    const [rates, setRates] = useState([]);
    const [status, setStatus] = useState([]);
    const { id } = useParams();

    // const product = useSelector((state) => state.product);


    // removing the product
    // const [deletProduct, { isLoading, isSuccess }] = useDeleteProductMutation();

    //   function handleDeleteProduct(id) {
    //   if (window.confirm("Bạn chắc chắn xoá?")) {
    //     deletProduct({ product_id: id, user_id: user._id })
    //       .then(() => {
    //         // Handle success
    //         console.log(`User with id ${id} deleted successfully`);
    //         setProducts(products.filter((product) => product._id !== id));
    //       })
    //       .catch((error) => {
    //         // Handle error
    //         console.error(`Error deleting user with id ${id}: ${error.message}`);
    //       });
    //   }
    // }

const handleUpdateRate = async (id) => {
  try {
    setLoading(true); // Start loading
    const response = await axios.patch(`http://localhost:8080/rates/update/${id}`);
    const { data } = response.data;
    setStatus(data.status);
    setRates(data);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false); // Stop loading
  }
};

    // 
    useEffect(() => {
        setLoading(true);
        axios
          .get("/rates")
          .then(({ data }) => {
            setLoading(false);
            setRates(data);
          })
          .catch((e) => {
            setLoading(false);
            console.log(e);
          });
      }, []);


//
const getBadgeColor = (status) => {
  if (status === "ChuaDuyet") {
    return "info";
  } else if (status === "DaDuyet") {
    return "warning";
  } else {
    return "primary";
  }
};


if (loading) {
  return <Loading />;
}

    return (
  <Container>
      <p>Có ({rates.length}) đánh giá</p>
    <Table striped bordered hover style={{fontSize:"12px"}}>
      <thead>
        <tr  style={{backgroundColor:"#4bb6fa",color:"white"}}>
          <th></th>
          <th>Sản phẩm</th>
          <th>Đánh giá</th>
          <th>Nội dung</th>
          <th>Trạng Thái</th>
          <th></th>
        </tr>
      </thead>

      <tbody >
        {rates.map((rate) => 
        <tr key={rate._id}>
          <td>
        <img src={rate.product.pictures[0].url} style={{ width: 70, height: 70, objectFit: "cover" }} />
          </td>
          <td>{rate.product.name}</td>
          <td>{rate.score} sao</td>
          <td>{rate.content}</td>
          <td>
          <Badge className="w-100" bg={getBadgeColor(rate.status)}>
        {rate.status}
        </Badge>

          </td>
          <td > 
            {rate.status === "ChuaDuyet" && (
            <Button style={{backgroundColor:"#0d6efd",borderRadius:"0" }}
            onClick={() => handleUpdateRate(rate._id)}
            >
             DUYỆT</Button>     
            )}
            </td>
        </tr>
         )} 
      </tbody>
    </Table>
    </Container>
  );
}

export default RateAdmin;