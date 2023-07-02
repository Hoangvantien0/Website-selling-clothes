import React, { useEffect, useState } from "react";
import { useCreateAddressMutation } from "../services/appApi";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "../components/Loading";
import { Alert, Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./admin/layout/EditUser.css";
import { instanceApiGHN } from "../axio/axios";

let addressTemp = [];

const UserEdit = () => {
  
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [createAddress, { isError, error, isLoading, isSuccess }] = useCreateAddressMutation();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAdmin, setIsAdmin } = useState(false);
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [detail, setDetail] = useState("");
  const [ward, setWard] = useState("");
  const [avatar, setAvatar] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [addressId, setAddressId] = useState("");
  const [orders, setOrders] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [address, setAddress] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
// 

// useEffect(() => {
//   axios
//       .get("/address/" + id)
//       .then(({ data }) => {
//           const address = data.address;
//           setDetail(address.detail);
//           setDistrict(address.district);
//           setWard(address.ward);
//           setPhone(address.phone);
//           setCity(address.city);
          
//       })
//       .catch((e) => console.log(e));
// }, [id]);
  // 
  useEffect(() => {
    instanceApiGHN.get("/master-data/province").then(({ data }) => {
      setCity(data.data);
    });
  }, []);

  const handleGetDistrict = (e) => {
    const selectedCity = city.filter(
      (item) => item.ProvinceName === e.target.value
    );
    addressTemp = [];
    addressTemp[0] = selectedCity[0];
    instanceApiGHN
      .post("/master-data/district", {
        province_id: selectedCity[0].ProvinceID,
      })
      .then(({ data }) => {
        setDistrict(data.data);
      });
  };

  const handleGetWard = (e) => {
    const selectedDistrict = district.filter(
      (item) => item.DistrictName === e.target.value
    );
    addressTemp[2] = {};
    addressTemp[1] = selectedDistrict[0];
    instanceApiGHN
      .post("/master-data/ward", {
        district_id: selectedDistrict[0].DistrictID,
      })
      .then(({ data }) => {
        setWard(data.data);
      });
  };

  const handleOnChangeWard = (e) => {
    const selectedWard = ward.filter(
      (item) => item.WardName === e.target.value
    );
    addressTemp[2] = selectedWard[0];
  };

  const handleAddress = (e) => {
    const addressData = {
      owner: user._id,
      avatar,
      detail,
      phone,
      ward: addressTemp[2].WardName,
      district: addressTemp[1].DistrictName,
      city: addressTemp[0].ProvinceName,
      districtId: addressTemp[1].DistrictID,
      wardId: addressTemp[2].WardCode,
    };
    createAddress(addressData)
      .then((data) => {
        if (data) {
          setTimeout(() => {
            navigate("/edit");
          }, 3000);
        }
      })
      .catch((error) => {
        // Handle error if necessary
      });
  };


  


  if (loading) return <Loading />;
  return (
    <Container fluid>
      <div className="container-fluid mt-3">
        <div
          style={{ backgroundColor: "#f5f5f5", height: "40px" }}
          className="row"
        >
          <div style={{ display: "initial" }} class="col">
            <ol
              class="breadcrumb breadcrumb-arrows"
              style={{ backgroundColor: "#f5f5f5", padding: "8px 5px 0" }}
            >
              Trang chủ / Chỉnh sửa sản phẩm{" "}
            </ol>
          </div>
        </div>
      </div>
      <Link
        style={{ display: "table-cell", borderRadius: "0" }}
        to="/admin"
        class="btn submits frgt-pass"
      >
        TRỞ VỀ
      </Link>
      <Row className="row_user">
        <Form className="from-new-user-container bg-light p-25 mb-5">
          <h5 class="text-uppercase mb-3">
            <span class="bg-white pr-3">Xem thông tin tài khoản</span>
          </h5>
          <div>
      
        </div>
          {isSuccess && <Alert variant="success">Tài khoản đã được cập nhật</Alert>}
          {isError && <Alert variant="danger">{error.data}</Alert>}
          <Form.Group className="mb-3">
            <div className="col-12 col-sm-auto mb-3">
              <div
                className="d-flex justify-content-center align-items-center rounded"
                style={{
                  height: "140px",
                  width: "140px",
                  backgroundColor: "rgb(233, 236, 239)",
                }}
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                ) : (
                  <span>140x140</span>
                )}
              </div>
              <input
                className="input_file mt-2"
                type="file"
                id="avatar"
                onChange={handleImageChange}
              />
            </div>
           
          </Form.Group>
          <div class="row">
            <div class="col-md-6 form-group">
              <label>Tên người dùng</label>
              <input
                style={{ width: "60%", marginLeft: "106px" }}
                value={user.name}
                class="form-control"
                type="text"
              />
            </div>
            <div class="col-md-6 form-group">
              <label>Email</label>
              <input
                style={{ width: "60%", marginLeft: "30px" }}
                value={user.email}
                class="form-control"
                type="text"
              />
            </div>
          </div>
          <div class="col form-group form_group">
            <label>Số điện thoại</label>
            <input
              class="form-control"
              type="number"
              placeholder="+84 123 456 789"
              value={phone} required
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="col form-group form_group">
            <label>Địa chỉ </label>
            <input
              className="form-control"
              type="text"
              placeholder="Số nhà 123"
              value={detail} required
              onChange={(e) => setDetail(e.target.value)}
            />
          </div>
          <div className="col form-group form_group">
            <label>Phường, Xã</label>
            <Form.Select
              className="custom-select"
             
              onChange={handleOnChangeWard}
              defaultValue={""}
            >
              <option defaultValue={""}>--Chọn Phường, Xã--</option>
              {ward &&
                ward.map((wards) => (
                  <option key={wards.WardName}>{wards.WardName}</option>
                ))}
            </Form.Select>
          </div>
          <div className="col form-group form_group">
            <label>Quận, Huyện</label>
            <Form.Select
              className="custom-select"
              
              onChange={handleGetWard}
              defaultValue={""}
            >
              <option defaultValue={""}>--Chọn Quận, Huyện--</option>
              {district &&
                district.map((districts) => (
                  <option key={districts.DistrictName}>
                    {districts.DistrictName}
                  </option>
                ))}
            </Form.Select>
          </div>
          <div className="col form-group form_group">
            <label>TỈnh, Thành Phố</label>
            <Form.Select
              className="custom-select"
              // value={city}
              onChange={handleGetDistrict}
              defaultValue={""}
            >
              <option defaultValue={""}></option>
              {city &&
                city.map((province) => (
                  <option key={province.ProvinceName}>
                    {province.ProvinceName}
                  </option>
                ))}
            </Form.Select>
          </div>
          

          <div class="col d-flex justify-content-end mt-3">
            <button
              class="btn btn-primary"
              type="submit"
              disabled={isLoading || isSuccess}
              onClick={handleAddress}
            >
              LƯU LẠI
            </button>
          </div>
        </Form>
      </Row>
    </Container>
  );
};

export default UserEdit;
