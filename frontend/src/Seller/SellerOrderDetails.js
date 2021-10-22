import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/cartContext";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import NumericInput from "react-numeric-input";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "react-bootstrap/Dropdown";
import Navigate from "./Navigate";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { auto } from "@popperjs/core";
import "./SellerOrderDetails.scss";

const SellerOrderDetails = () => {
  const orderId = useParams().id;

  const { quantity, dispatch } = useCart();
  const [product, setProduct] = useState([]);

  const { token } = useAuth();

  const [staff, setStaff] = useState();
  const [shop, setShop] = useState();
  const [seller, setSeller] = useState();
  const [totalItem, setTotalItem] = useState(0);

  const [refresh, setRefresh] = useState(false);

  const [getQty, setQty] = useState(1);
  var Reduxdispatch = useDispatch();

  const handelincrement = () => {
    var c = getQty + 1;
    setQty(c);
  };
  const handeDecrement = () => {
    if (getQty >= 2) {
      var c = getQty - 1;
      setQty(c);
    }
  };

  const handleAddToCart = (item) => {

    // setQty(getQty);
    product.qtydemand = getQty;
    Reduxdispatch({ type: "ADD_ITEM", payload: [product.id, product] });
    // props.navigation.setParams({x:""})
    setRefresh(!refresh);
  };

  useEffect(() => {
    const getStaffData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/seller/deliverers ", {
          headers: { "x-access-token": token },
        });
        const data = await response.data;
        console.log("staff data", data);
        if (response.status === 200) {
          setStaff(data);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const getOrderData = async () => {
      const response = await axios.get(`http://localhost:5000/seller/order/${orderId}`, {
        headers: { "x-access-token": token },
      });

      const data = await response.data;
      console.log("order data", data);
      setShop(data);
      setTotalItem(data.order.quantity);
    };

    const getSellerProfile = async () => {
      const response = await axios.get("http://localhost:5000/seller/profile", {
        headers: { "x-access-token": token },
      });
      const data = await response.data;
      console.log("seller profile", data);
      setSeller(data);
    };

    getOrderData();
    getStaffData();
    getSellerProfile();
  }, [token, orderId]);

  const staffAssign = async (delivererId, orderId) => {
    console.log(delivererId, orderId);
    const details = {
      orderId: orderId,
      delivererId: delivererId,
    };
    const response = await axios
      .patch("http://localhost:5000/seller/assignOrder", details, {
        headers: { "x-access-token": token },
      })
      .then(alert("staff assigned"));
    console.log(response);
  };

  return (
    <div className="main-div">
      <Navigate />
      <div
        style={{
          position: "relative",
          alignSelf: "center",
          fontSize: 22,
          marginLeft: auto,
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Order Details
      </div>

      <div className="shopName">
        {seller && <h2>{seller.shopName}</h2>}
        <div className="whatsapp">
          <img src={require("../images/whatsappicon.png").default} alt="" />
          <span>Call Seller</span>
        </div>
      </div>
      <div>
        {/* <h3 style={{ fontSize: "1rem", marginTop: 20, marginLeft: 10 }}>Update Status</h3>
        <div style={{ marginTop: 5, padding: 5 }}>
          <Button style={{ background: "#ecf0f1", width: 200 }}>Packed</Button>
          <Button style={{ background: "#25CCF7", color: "white", width: 200, marginLeft: 10 }}>
            Dispatched
          </Button>
          <Button style={{ background: "#ecf0f1", width: 200, marginLeft: 10 }}>Packed</Button>
        </div> */}

        <div className="assign">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Assign Staff
            </Dropdown.Toggle>
            {staff && (
              <Dropdown.Menu>
                {staff.map((item) => (
                  <Dropdown.Item
                    href="#/action-1"
                    key={item._id}
                    onClick={() => {
                      staffAssign(item._id, shop.order._id);
                    }}
                  >
                    {item.fullname}
                  </Dropdown.Item>
                ))}

                {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
              </Dropdown.Menu>
            )}
          </Dropdown>
        </div>

        <div className="detailsOverride">
          <font color="" style={{ color: "", marginLeft: 20 }}>
            Total {totalItem && totalItem} Items
          </font>{" "}
          <br />
          {shop && <b className="bill">BILL : INR {shop.order.bill}</b>}
          <br></br>
          <ul>
            {shop &&
              shop.order.products.map((item) => (
                <li key={item._id}>
                  {item.name} , Quantity:{item.quantity}{" "}
                </li>
              ))}
          </ul>
        </div>

        {shop && (
          <div style={{ marginTop: 30 }}>
            Order Id: {shop.order.orderDetails[0].OrderId}
            <b className="date">Date: {shop.order.date}</b>
            <div className="img-container">
              {shop &&
                shop.order.products.map((img) => (
                  <img src={img.img} alt="prod-img" height="200" width="200" />
                ))}
              {/* <img
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                src="/2.png"
              ></img> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerOrderDetails;
