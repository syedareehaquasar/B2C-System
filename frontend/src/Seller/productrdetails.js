import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/cartContext";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import NumericInput from "react-numeric-input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Navigation from "../Delivery/DeliveryNavigation";
import "./productdetails.scss";

const Product = () => {
  const { quantity, dispatch } = useCart();
  const [product, setProduct] = useState([]);
  const id = useParams().orderId;
  const { token } = useAuth();

  ///////////////////////////////////////////////////////////////////////
  const [orderData, setOrderData] = useState();
  const [status, setStatus] = useState();

  ///////////////////////////////////////////////////////////////////////

  const [refresh, setRefresh] = useState(false);

  const [getQty, setQty] = useState(1);
  var Reduxdispatch = useDispatch();
  var navigate = useNavigate();

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

  const Details = () => {
    navigate("/orderstatus");
  };

  useEffect(() => {
    const getOrderData = async () => {
      const response = await axios.get(`http://localhost:5000/delivery/order/${id}`, {
        headers: { "x-access-token": token },
      });
      const data = await response.data;
      console.log(data);
      setOrderData(data.order);
    };

    getOrderData();
  }, [token, id]);

  const updateStatus = async (orderId, e) => {
    const { id } = e.target;

    var status = "";
    if (id === "shipped") {
      status = "shipped for delivery";
    } else {
      status = "Delivered";
    }
    const details = {
      orderId: orderId,
      status,
    };
    console.log(details);

    try {
      const response = await axios.patch(
        `http://localhost:5000/delivery/orderStatus`,
        details,
        {
          headers: { "x-access-token": token },
        }
      );
      const data = await response.data;
      console.log(data);
      setStatus(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <button
        onClick={() => {
          console.log(orderData.orderDetails[0].OrderId);
        }}
      >
        clivk
      </button> */}
      <Navigation />
      <div
        className="title"
        style={{
          alignSelf: "center",
          fontSize: 22,

          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Order Details
      </div>

      <div className="shopName">
        {orderData && <h2>{orderData.shopName}</h2>}
        <div className="whatsapp">
          <img src={require("../images/whatsappicon.png").default} alt="" />
          <span>Call Seller</span>
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: "1rem", marginTop: 20, marginLeft: 10 }}>Status Update</h3>
        <div style={{ marginTop: 5, padding: 5, color: "white" }}>
          <Button variant="contained" color="primary">
            <b
              id="shipped"
              style={{ color: "white" }}
              onClick={(e) => updateStatus(orderData._id, e)}
            >
              {" "}
              Shipped
            </b>
          </Button>
          <Button
            id="delivered"
            style={{ marginLeft: 20, color: "white" }}
            variant="contained"
            color="secondary"
          >
            <b
              id="delivered"
              style={{ color: "white" }}
              onClick={(e) => updateStatus(orderData._id, e)}
            >
              {" "}
              Delivered
            </b>
          </Button>
        </div>
        {orderData && <p>Status:{status ? status : orderData.status}</p>}

        <div className="info" style={{ background: "#9AECDB", marginTop: 30 }}>
          <font color="" style={{ color: "", marginLeft: 20 }}>
            total Items {orderData && orderData.quantity}
          </font>{" "}
          <br />
          <b style={{ marginLeft: "20px" }}>INR {orderData && orderData.bill}</b>
          <ul>
            {orderData &&
              orderData.products.map((item) => (
                <li key={item._id}>
                  {item.name} , Quantity:{item.quantity}{" "}
                </li>
              ))}
          </ul>
          {/* <br></br>A product description is the marketing copy that explains what a product is and
          why it's worth purchasing. The purpose of a product description is to supply customers
          with important information about the features and benefits of the product so they're
          compelled to buy. */}
        </div>
        <div style={{ marginTop: 30 }}>
          Order:#{orderData && orderData.orderDetails[0].OrderId} <br />
          <b>Date: {orderData && orderData.date}</b>
          <div
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 900,
            }}
          >
            {/* <img
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              src="/2.png"
            ></img> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
