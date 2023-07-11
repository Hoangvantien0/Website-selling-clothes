import React, {useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row ,Container} from "react-bootstrap";
import axios from "../axios";
import { useSelector } from "react-redux";
import { useNavigate, Link  } from "react-router-dom";
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
  const [addressId, setAddressId] = useState("");
  const [addresses, setAddress] = useState("");
  const [orders, setOrders] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const [shippingAmount, setShippingAmount] = useState(0);
  const [createOrder, { isLoading, isError, isSuccess }] = useCreateOrderMutation();
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);  
  //
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
      // setWard(data.data);
      setWard(data.data);
      handleCalculatorFee();
    });
  }
//   //lấy ra px
  const handleOnChangeWard = (e) => {
    const selectedWard = ward.filter(
      (item) => item.WardName === e.target.value
    );
    // addressTemp[2] = selectedWard[0];
    addressTemp[2] = selectedWard[0];
  handleCalculatorFee();
  };

// tạo đơn hàng
const handleAddOrder = (e) => {
  const orderData = {
    userId: user._id,
    cart: user.cart,
    shippingAmount :shippingAmount,
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
//tính phí ship
const handleCalculatorFee = async (e) => {
  try {
    const selectedDistrict = district.find(
      (item) => item.DistrictName === addressTemp[1].DistrictName
    );
    const selectedWard = ward.find(
      (item) => item.WardName === addressTemp[2].WardName
    );

    const { data: availableServices } = await instanceApiGHN.post(
      "/v2/shipping-order/available-services",
      {
        shop_id: 123943,
        from_district: 3695,
        to_district: selectedDistrict.DistrictID,
      }
    );

    const serviceId = availableServices.data[0].service_id;

    const { data: feeData } = await instanceApiGHN.post(
      "/v2/shipping-order/fee",
      {
        from_district_id: 3695,
        service_id: serviceId,
        to_district_id: selectedDistrict.DistrictID,
        to_ward_code: selectedWard.WardCode,
        weight: 2000,
        insurance_value: 1000000,
        coupon: null,
      },
      {
        headers: {
          ShopId: 123943,
        },
      }
    );
     const shippingAmount = feeData.data.total;
     setShippingAmount(shippingAmount);
  } catch (error) {
    // Handle error if necessary
  }
};

  return (
    <Container fluid >
    <Row className="mt-3">
    <Col >
      <h5 class="section-title position-relative text-uppercase mb-3">
        <span class="bg-white pr-3">Thông tin giao hàng</span>
        <div>
    </div>

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
                 <button
                className="button_pay dark"
                type="submit"
                disabled={isLoading || isSuccess}
                onClick={handleAddOrder}
              >
                {isLoading ? 'Đang xử lý...' : 'XÁC NHẬN THANH TOÁN '}
              </button>
            </div>
          </Form.Group>
        </div>
      </Form>
    </Col>
    <Col sm={4}>
            <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-white pr-3">Tổng đơn hàng</span></h5>
            <div class="bg-light p-30 mb-5">
              <h6 class="mb-3">Sản phẩm</h6>
              {cart.map((item) => (
                <div class="border-bottom mt-2">
                  <div class="d-flex justify-content-between">
                    <img className="me-4 " src={item.pictures[0].url} style={{ width: "40px" }} />
                    <p>{item.price}₫</p>
                    
                  </div>
                </div>
              ))}
              <div class="border-bottom pt-3 pb-2">
                <div class="d-flex justify-content-between mb-3">
                  <h6>Tạm Tính</h6>
                  <h6>{(user.cart.total).toLocaleString('vi-VN')}₫</h6>
                </div>
                <div class="d-flex justify-content-between">
                  <h6 class="font-weight-medium">Phí Vận Chuyển</h6>
                  <h6 class="font-weight-medium">{shippingAmount.toLocaleString('vi-VN')}₫</h6>
                </div>
              </div>
              <div class="pt-2">
                <div class="d-flex justify-content-between mt-2">
                  <h5>Tổng đơn</h5>
                  <h5>{(user.cart.total + parseInt(shippingAmount)).toLocaleString('vi-VN')}₫</h5>
                </div>
              </div>
            </div>
    </Col>   
    </Row>
    </Container>
  );
}

export default CheckoutCOD;

