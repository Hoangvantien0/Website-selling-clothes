import React, { useEffect, useState } from "react";
import { Table, Button,Col,Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../../services/appApi";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import axios from "../../axios";
import { AiOutlineEdit ,AiFillDelete ,AiOutlinePlus } from 'react-icons/ai';
import { useParams } from "react-router-dom";
import "./layout/DashboardProducts.css";

function DashboardProducts() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const user = useSelector((state) => state.user);
    // const [status, setStatus] = useState("All");

    // removing the product
    const [deletProduct, { isLoading, isSuccess }] = useDeleteProductMutation();

      function handleDeleteProduct(id) {
      if (window.confirm("Bạn chắc chắn xoá?")) {
        deletProduct({ product_id: id, user_id: user._id })
          .then(() => {
            // Handle success
            console.log(`User with id ${id} deleted successfully`);
            setProducts(products.filter((product) => product._id !== id));
          })
          .catch((error) => {
            // Handle error
            console.error(`Error deleting user with id ${id}: ${error.message}`);
          });
      }
    }

    // 
    useEffect(() => {
        setLoading(true);
        axios
          .get("/products")
          .then(({ data }) => {
            setLoading(false);
            setProducts(data);
          })
          .catch((e) => {
            setLoading(false);
            console.log(e);
          });
      }, []);

    if (loading) {
        <Loading />;
    }
    return (
  <Container>
      <p>Có ({products.length}) sản phẩm</p>
    <Table striped bordered hover style={{fontSize:"12px"}}>
      <thead>
        <tr  style={{backgroundColor:"#4bb6fa",color:"white"}}>
          <th></th>
          <th>Mã sản phẩm</th>
          <th>Tên sản phẩm</th>
          <th>giá</th>
          <th></th>
        </tr>
      </thead>

      <tbody >
        {products.map((product) => 
        <tr key={product._id}>
          <td><img src={product.pictures[0].url} style={{ width: 70, height: 70, objectFit: "cover" }} />
          </td>
          <td>{product._id}</td>
          <td>{product.name}</td>
          <td>{product.price}₫</td>
         
          <td > 
            <div>
            <Button className="button_delete" style={{backgroundColor:"red" }} onClick={() => handleDeleteProduct(product._id, user._id)} disabled={isLoading}><AiFillDelete />XOÁ</Button>
                     
            <Link to={`/product/${product._id}/edit`}>
              <Button className="button_delete" style={{backgroundColor:"blue"}}  ><AiOutlineEdit />SỬA</Button>
            </Link>
            </div>
            </td>
        </tr>
        )}
         {/* <Pagination data={products} RenderComponent={Table} pageLimit={3} dataLimit={6} tablePagination={true} /> */}

      </tbody>
    </Table>
    </Container>
  );
}

export default DashboardProducts;