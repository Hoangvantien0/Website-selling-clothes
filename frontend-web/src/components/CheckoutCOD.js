import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, {useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { cityItem } from "../address"
import axios from "../axios";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";
import "../components/layoutcss/CheckoutForm.css";
import  { instanceApiGHN } from "../axio/axios";
let addressTemp = [];
function CheckoutCOD() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [detail, setDetail] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  // const [shippingAmount, setShippingAmount] = useState(0);
  const [addressId, setAddressId] = useState("");
  const [addresses, setAddress] = useState("");
  const [orders, setOrders] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [products, setProducts] = useState("");

  const [createOrder, { isLoading, isError, isSuccess }] = useCreateOrderMutation();

useEffect(() => {
  instanceApiGHN.get("/master-data/province").then(({ data }) => {
    setCity(data.data);
  });
}, []);
// //lấy ra tp
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
      // console.log(data);
      setDistrict(data.data);
    });
 
};
// //lấy ra qh
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
      // console.log(data);
      setWard(data.data);
    });
  }
//   //lấy ra px
  const handleOnChangeWard = (e) => {
    const selectedWard = ward.filter(
      (item) => item.WardName === e.target.value
    );
    addressTemp[2] = selectedWard[0];
  };

// tạo đơn hàng
const handleAddOrder = (e) => {
  const orderData = {
    userId: user._id,
    cart: user.cart,
    username,
    phone,
    detail,
    ward: addressTemp[2].WardName,
    district: addressTemp[1].DistrictName,
    city: addressTemp[0].ProvinceName,
    districtId: addressTemp[1].DistrictID,
    wardId: addressTemp[2].WardCode,
  };

  createOrder(orderData)
    .then((data) => {
      if (data) {
        setTimeout(() => {
          navigate("/orders");
        }, 3000);
      }
    })
    .catch((error) => {
      // Handle error if necessary
    });
};

//



  return (
    <Col>
      <h5 class="section-title position-relative text-uppercase mb-3">
        <span class="bg-white pr-3">Thông tin giao hàng</span>
      </h5>
        <Form  >
        <div class="bg-light p-25 mb-5">
          <div class="row">
            <div class="col-md-6 form-group">
              <label>Tên khách hàng</label>
              <input
                class="form-control"
                type="text"
                placeholder="Họ tên"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div class="col-md-6 form-group">
              <label>Số điện thoại</label>
              <input
                class="form-control"
                type="number"
                placeholder="+84 123 456 789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
                <label>Địa chỉ </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Số nhà 123"
                  onChange={(e) => setDetail(e.target.value)}
                />
              </div>
            <div className="col-md-6 form-group">
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
            <div className="col-md-6 form-group">
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

            <div className="col-md-6 form-group">
        <label>TỈnh, Thành Phố</label>
        <Form.Select
          className="custom-select"
          onChange={handleGetDistrict}
          defaultValue={""}
        >
          <option defaultValue={""}>--Chọn Tỉnh, Thành phố--</option>
          {city &&
            city.map((province) => (
              <option key={province.ProvinceName}>
                {province.ProvinceName}
              </option>
            ))}
        </Form.Select>
      </div>

          
          </div>
          <Form.Group className="mb-2" style={{ border: "1px solid #ccc" }}>
            <label  style={{ marginLeft: "42%" }}>GIAO HÀNG COD</label>
            <div className="d-flex justify-content-between pt-3 pb-2mb-3">
              <Link to="/cart" id="checkout" class="button_pay dark" name="checkout">
                Giỏ hàng
              </Link>
              <button class="button_pay dark" type="submit" disabled={isLoading || isSuccess} onClick={() => handleAddOrder()}>
              XÁC NHẬN THANH TOÁN
              </button>
            </div>
          </Form.Group>
        </div>
      </Form>
    </Col>
  );
}

export default CheckoutCOD;

