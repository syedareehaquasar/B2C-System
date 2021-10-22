import React, { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import CloseIcon from "@material-ui/icons/Close";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import { Link } from "react-router-dom";
import { SideBarData } from "../utils/SideBarData";
import { useSelector } from "react-redux";
import { Badge } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import axios from "axios";

import HomeLanding from "./HomeLanding";

import { Routes, Route } from "react-router-dom";
import Shop from "./Shop";
import Product from "./Product";
import Cart from "./Cart";
import SellerDashBoard from "../Seller/SellerDashBoard";
const Navigation = (props) => {
  const [cartItems, setCartItems] = useState();
  const [sideBar, setSideBar] = useState(false);
  const showSideBar = () => setSideBar(!sideBar);

  const { token } = useAuth();

  var cart = useSelector((state) => state.cart);
  var keys = Object.keys(cart);
  var values = Object.values(cart);

  // useEffect(function(){
  // fetch()
  // },[])

  const navigate = useNavigate();

  useEffect(() => {
    const getCartData = async () => {
      const response = await axios.get(`http://localhost:5000/buyer/cart`, {
        headers: { "x-access-token": token },
      });
      const data = await response.data;
      if (data !== "Cart is Empty!") {
        setCartItems(data.products.length);
      } else {
        setCartItems(0);
      }
    };

    getCartData();
  }, [token, cartItems]);
  console.log(cartItems);

  return (
    <>
      <div className="header">
        <div>
          <MenuOutlinedIcon onClick={showSideBar} />
        </div>
        <div
          style={{ width: "30px", height: "30px", backgroundColor: "black", borderRadius: "500%" }}
        ></div>

        <div>
          <Badge
            badgeContent={cartItems && cartItems}
            onClick={() => navigate("/home/cart")}
            color="secondary"
          >
            <ShoppingCartOutlinedIcon onClick={() => navigate("/home/cart")} />
          </Badge>

          {/* <ShoppingCartOutlinedIcon onClick={()=>navigate("/home/cart")} /> */}
        </div>
      </div>
      <nav className={sideBar ? "nav-menu active" : "nav-menu"} style={{ zIndex: "100" }}>
        <ul onClick={showSideBar} className="nav-menu-items">
          <li className="navbar-toggle">
            {/* className="menu-bars" */}
            <CloseIcon style={{ color: "red" }} />
          </li>
          {SideBarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
