import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row ,Image} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCreateUserMutation } from "../../services/appApi";
import Loading from "../../components/Loading";
import "./layout/CreateUser.css";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [createUser, { isError, error, isLoading, isSuccess }] =
  useCreateUserMutation();
// 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
// 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return alert("Bạn phải thêm tất cả các danh mục");
    }
    createUser({ name, email, password, isAdmin });
  };

  return (
    <Container fluid >
      <div className="mt-3">
        <div
          style={{ backgroundColor: "#f5f5f5", height: "40px" }}
          className="row"
        >
          <div style={{ display: "initial" }} class="col">
            <ol
              class="breadcrumb breadcrumb-arrows"
              style={{ backgroundColor: "#f5f5f5", padding: "7px 5px 0" }}
            >
              Trang chủ / Thêm tài khoản mới
            </ol>
          </div>
        </div>
      </div>
          <Form className="bg-light form_adduser" onSubmit={handleSubmit}>
              <h5 class="  text-uppercase mb-3">
            <span class="bg-white pr-3">THÊM TÀI KHOẢN MỚI</span></h5>

            {isSuccess && <Alert variant="success">Thêm người dùng mới thành công</Alert>}
            {isError && <Alert variant="danger">{error.data}</Alert>}

            <div class="field-set1">
              <span class="input-item1">
                {/* name */}
            <i class="fa fa-user-circle"></i>
              </span>
              <input style={{width:"80%"}}  class="form-input"  type="text"
                placeholder="Tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <br />
                {/* email */}
              <span class="input-item1">
                <i aria-hidden="true" class="fa fa-envelope"></i>
              </span>
              <input
              style={{width:"80%"}} 
                class="form-input"
                type="email"
                placeholder="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
            {/* password */}
              <span class="input-item1">
                <i class="fa fa-key"></i>
                </span>
              <input
              style={{width:"80%"}} 
                class="form-input"
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                id="pwd"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span>
                <i
                  className="fa fa-eye aaa"
                  aria-hidden="true"
                  type="button"
                  onClick={togglePasswordVisibility}
                ></i>
              </span>
              <br />
                {/* repeat your password */}
              {/* <span class="input-item1">
                <i class="fa fa-key"></i>
                </span>
              <input
                class="form-input"
                type={showPassword ? "text" : "password"}
                placeholder="Repeat your password"
                id="pwd"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span>
                <i
                  className="fa fa-eye aaa"
                  aria-hidden="true"
                  type="button"
                  onClick={togglePasswordVisibility}
                ></i>
              </span> */}
            </div>
{/* is admin */}
            <div className="mb-3 mt-3">
              {/* <Form.Check inline label="Yes"  name="group1" type="radio"  id="inline-radio-1"  
              checked={isAdmin === true} onChange={() => setIsAdmin(true)}
              />
              <Form.Check
                inline
                label="No"
                name="group1"
                type="radio"
                id="inline-radio-2"
                checked={isAdmin === false}
                onChange={() => setIsAdmin(false)}
              />
              IsAdmin */}
            </div>
            <div className="mt-4">
            <Link to="/admin">
              <Button className="button_back1">TRỞ VỀ</Button>
            </Link>
            <Button type="submit" className="button_add1" disabled={isLoading || isSuccess}>
              THÊM TÀI KHOẢN
            </Button>
            </div>
          </Form>
    
    </Container>
  );
}

export default CreateUser;
