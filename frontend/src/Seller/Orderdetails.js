import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/cartContext";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import NumericInput from "react-numeric-input";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "react-bootstrap/Dropdown";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { auto } from "@popperjs/core";

const Product = () => {
  const { quantity, dispatch } = useCart();
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const { token } = useAuth();

  const [staff, setStaff] = useState();
  const [shop, setShop] = useState();
  const [seller, setSeller] = useState();

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
      const response = await axios.get("http://localhost:5000/seller/orders", {
        headers: { "x-access-token": token },
      });

      const data = await response.data;
      console.log("order data", data);
      setShop(data);
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
  }, [token]);

  return (
    <>
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
        <h3 style={{ fontSize: "1rem", marginTop: 20, marginLeft: 10 }}>Update Status</h3>
        <div style={{ marginTop: 5, padding: 5 }}>
          <Button style={{ background: "#ecf0f1", width: 200 }}>Packed</Button>
          <Button style={{ background: "#25CCF7", color: "white", width: 200, marginLeft: 10 }}>
            Dispatched
          </Button>
          <Button style={{ background: "#ecf0f1", width: 200, marginLeft: 10 }}>Packed</Button>
        </div>

        {/* <div
          style={{
            background: "#ecf0f1",
            marginTop: 20,
            width: "900px",
            height: "40px",
            marginTop: 20,
          }}
        >
          <div style={{ marginLeft: 20, marginTop: 30, fontSize: 22 }}>Assign Staff Member</div>
        </div> */}
        <div style={{ display: "block", width: 900, padding: 30, margin: 20 }}>
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
                      console.log("clicked");
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

        <div style={{ background: "#9AECDB", marginTop: 30, width: 900 }}>
          <font color="" style={{ color: "", marginLeft: 20 }}>
            total 2 Items
          </font>{" "}
          <b style={{ marginLeft: 800 }}>INR 1400</b>
          <br></br>A product description is the marketing copy that explains what a product is and
          why it's worth purchasing. The purpose of a product description is to supply customers
          with important information about the features and benefits of the product so they're
          compelled to buy.
        </div>
        <div style={{ marginTop: 30 }}>
          Order:#1234567890 <b style={{ marginLeft: 800 }}>12/04/2021</b>
          <div
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 900,
            }}
          >
            <img
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              src="/2.png"
            ></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
