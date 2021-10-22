import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/cartContext";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import NumericInput from "react-numeric-input";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigate";
import "./Staff.scss";
const Product = () => {
  const { quantity, dispatch } = useCart();
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const { token } = useAuth();

  const [refresh, setRefresh] = useState(false);

  const [getQty, setQty] = useState(1);
  var Reduxdispatch = useDispatch();
  var navigate = useNavigate();

  const handelincrement = () => {
    var c = getQty + 1;
    setQty(c);
  };

  const seedetails = () => {
    navigate("/staffdetails");
  };
  const handleClick = () => {
    navigate("/addstaff");
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
    const getStaff = async () => {
      try {
        const response = await axios.get("http://localhost:5000/seller/deliverers ", {
          headers: { "x-access-token": token },
        });
        const data = await response.data;
        console.log(data);
        if (response.status === 200) {
          setProduct(data);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    getStaff();
  }, [token]);

  return (
    <>
      <Navigation />
      {/* <div
        style={{
          position: "fixed",
          alignSelf: "center",
          fontSize: 22,
          marginLeft: 350,
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        My Staff
      </div> */}

      <div className="shopName">
        <h2 style={{ marginTop: 50, fontWeight: "bold", marginLeft: 40, fontSize: 22 }}>
          My Staff
        </h2>
      </div>

      {product.map((item) => (
        <div
          key={item._id}
          className="shopName"
          style={{ marginTop: 0, fontWeight: "bold", marginLeft: 40 }}
        >
          <span style={{ width: 150 }} onClick={() => seedetails()}>
            {item.fullname}
          </span>
          <div className="whatsapp">
            <img src={require("../images/whatsappicon.png").default} alt="" />

            <a style={{ textDecoration: "none" }} href={"tel:+" + item.phone}>
              <span>Call &nbsp; </span>
            </a>
          </div>
        </div>
      ))}

      <Avatar
        onClick={() => handleClick()}
        className="add"
        style={{
          position: "fixed",

          padding: "1rem",

          marginTop: "1rem",
          bottom: 0,
          left: 0,
          display: "flex",
          alignSelf: "flex-end",

          color: "white",

          background: "green",
          fontSize: 19,
          width: 100,
          height: 60,
        }}
      >
        Add +
      </Avatar>
    </>
  );
};

export default Product;
