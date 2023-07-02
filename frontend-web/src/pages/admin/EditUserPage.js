import React, { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../services/appApi";
import axios from "../../axios";
import Loading from "../../components/Loading";
import { Alert ,Button,Container,Row,Col} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./layout/EditUser.css"

const EditUserPage = () => {
  // const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateUser, { isError, error, isLoading, isSuccess }] = useUpdateUserMutation();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAdmin,setIsAdmin } = useState(false)
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  // show password
      const togglePasswordVisibility = () => {
          setShowPassword(!showPassword);
        };
        // 
  useEffect(() => {
    axios
      .get(`/users/`+ id)
      .then(({ data }) => {
        const user = data.user;
       
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
        // setIsAdmin(user.isAdmin);
      })
      .catch((e) => console.log(e));
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password ) {
      return alert("Vui lòng điền tất cả thông tin");
    }
    updateUser({id,name, email, password })
    .then(({data}) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate("/");
          },500);
        }
    });
  }    



  
  if (loading) return <Loading />;
  return (
    <Container fluid>
    <div  className=" mt-3">
            <div  style={{backgroundColor:"#f5f5f5" ,height:"40px"}}className="row">
              <div style={{display:"initial"}} class=" col ">
              <ol class="breadcrumb breadcrumb-arrows" style={{backgroundColor:"#f5f5f5" ,padding:"8px 5px 0"}}>Trang chủ / Chỉnh sửa tài khoản </ol>
              </div>
              </div>
            </div>
     {/* <div class="overlay body2"> */}

    <form class="form2  bg-light " onSubmit={handleSubmit} >
    <h5 class="  text-uppercase mb-3">
    <span class="bg-white pr-3">CHỈNH SỬA TÀI KHOẢN</span></h5>
    <br/>
    
    <div class="field-set">   
    {isSuccess && <Alert variant="success">Tài khoản được cập nhật</Alert>}
    {isError && <Alert variant="danger">{error.data}</Alert>}
    
        <span class="input-item">
        <i class="fa fa-user-circle"></i>
        </span>

        <input  class="form-input3"  type="text" placeholder="Tên" 
          value={name} required onChange={(e) => setName(e.target.value)} />
        
        <br/>
        <span class="input-item">
        <i aria-hidden="true" class="fa fa-envelope"></i>
        </span>
        <input class="form-input3" type="email" placeholder="email"   name="email"
         value={email} required onChange={(e) => setEmail(e.target.value)}/>
        
        <br/>
        <span class="input-item">
        <i class="fa fa-key"></i>
        </span>
        <input class="form-input3" type={showPassword ? "text" : "password"} placeholder="Mật khẩu" id="pwd" 
         name="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
        <span>
        <i className="fa fa-eye" aria-hidden="true" type="button" id="eye1"onClick={togglePasswordVisibility} ></i>
        </span>
{/*  */}
{/* 
              <div class="form-check">
        <input style={{marginLeft:"25%"}} class="form-check-input" type="checkbox" id="flexCheckDefault"
          isChecked={isAdmin} onChange = {(e)=>{setIsAdmin(e.target.checked) ; console.log(isAdmin)}} />
        <label class="form-check-label" for="flexCheckDefault" style={{color:"black"}}> isAdmin  </label>
      </div> */}
        {/* đăng ký */}
        <br/>
        <button  type="submit"  class="log-in"  disabled={isLoading || isSuccess}>CẬP NHẬT</button>
    </div>
    
        <Link to="/admin" class="btn submits frgt-pass">TRỞ VỀ</Link>

        <Link to="/" class="btn submits sign-up">TRANG CHỦ</Link>
        

    </form>
    
   
    </Container>
  );
};

export default EditUserPage;
