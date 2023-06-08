import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./layoutcss/Login.css";
import { useSignupMutation,useCreateUserMutation } from "../services/appApi";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [createUser, { error, isLoading, isError,isSuccess }] = useCreateUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  
  // Show password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return alert("Bạn phải thêm tất cả các danh mục");
    }
    createUser({ name, email, password });
  };
  // 
  return (
    <div class="overlay body1">
      <form class="form1" onSubmit={handleSignup}>
        <div class="con">
          <header class="head-form ">
            <h2 style={{ color: "white" }}>Đăng Ký</h2>
            <p style={{ color: "white" }}>Đăng ký tại đây bằng email và mật khẩu của bạn</p>
          </header>
          <br />
          <div class="field-set">
          {isSuccess && <Alert variant="success">Thêm người dùng mới thành công</Alert>}
            {isError && <Alert variant="danger">{error.data}</Alert>}

            <span class="input-item">
              <i class="fa fa-user-circle"></i>
            </span>
            <input  class="form-input"  type="text"
                placeholder="Tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            <br />
            <span class="input-item">
              <i aria-hidden="true" class="fa fa-envelope"></i>
            </span>
            <input
                class="form-input"
                type="email"
                placeholder="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            <br />
            <span class="input-item">
              <i class="fa fa-key"></i>
            </span>
            <input
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
              <i className="fa fa-eye" aria-hidden="true" type="button" id="eye" onClick={togglePasswordVisibility}></i>
            </span>
            <br />
            <button type="submit" class="log-in" disabled={isLoading || isSuccess}>
              Đăng ký
            </button>
          </div>
          <Link class="btn submits frgt-pass">Google</Link>
          <Link to="/login" class="btn submits sign-up">
            Đăng nhập
            <i class="fa fa-user-plus" aria-hidden="true"></i>
          </Link>
        </div>
      </form>
    </div>
  );
}
export default Signup;
