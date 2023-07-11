import React, { useEffect, useState } from "react";
import {Container,Row, Button ,Table ,Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../axios";
import Loading from "../../components/Loading";
import { AiOutlineEdit ,AiFillDelete ,AiOutlinePlus } from 'react-icons/ai';
import { useDeleteUserMutation } from "../../services/appApi";
import './layout/ClientsAdminPage.css'

function ClientsAdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteUser, { isLoading, isSuccess }] = useDeleteUserMutation();

  function handleDeleteUser(id) {
    if (window.confirm("Bạn chắc chắn xoá?")) {
      deleteUser(id)
        .then(() => {
          // Handle success
          console.log(`User with id ${id} deleted successfully`);
          setUsers(users.filter((user) => user._id !== id));
        })
        .catch((error) => {
          // Handle error
          console.error(`Error deleting user with id ${id}: ${error.message}`);
        });
    }
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  if (loading) return <Loading />;
  if (users?.length === 0)

    return (
            <Container >
              <Link  to="/admin" >
                <Button className="button_b mt-3  ">BACK</Button>
              </Link>
              <Link to="/create-user">
                <Button className="button_a " >THÊM TÀI KHOẢN <AiOutlinePlus /></Button>
              </Link>

            <Row  style={{backgroundColor: 'white', height: '70vh'}} >
                    
                    <Col sm={7} >
                        <Link  >
                        <h5 style={{textAlign:"end",marginTop:"20%"}}>Không có khách hàng nào !!!</h5>
                        </Link>
                        
                    </Col>
                </Row>
                </Container>
        )
  return (
    
    <Container style={{ backgroundColor: "white", height: "70vh" }}>
      <Link  to="/create-user">
        <Button className="button_a1 " >THÊM KHÁCH HÀNG <AiOutlinePlus /></Button>
      </Link>
      <p>Có ({users.length}) người dùng</p>
      <Table className=" " responsive striped bordered hover style={{fontSize:"12px"}}>
        <thead>
          <tr  style={{backgroundColor:"#4bb6fa",color:"white"}}>
            <th>Mã khách hàng</th>
            <th>Tên khách hàng</th>
            <th>Email</th>
            <th>Admin</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? <div className ='paid'>YES</div> : <div className = 'notpaid'>NO</div>}</td>
              <td>
              <div class="stack">
                <Link to ={ `/users/${user._id}/edituser`}>
                <Button className="button_edit" style={{backgroundColor:"blue"}}  ><AiOutlineEdit />SỬA</Button>
                 </Link>
                <Button className="button_edit" style={{backgroundColor:"red" }} onClick={() => handleDeleteUser(user._id)} ><AiFillDelete  />XOÁ</Button>
              </div>
                </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ClientsAdminPage;
