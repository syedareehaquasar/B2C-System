import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/cartContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DeleteOutlined, Clear } from "@material-ui/icons";
import { Button, Grid } from "@material-ui/core";
import { useNavigate } from "react-router";
import { Divider } from "@material-ui/core";
import { FormLabel } from "@material-ui/core";
import Navigation from "./Navigation";
import { useAuth } from "../contexts/authContext";
import "./Cart.scss";

import axios from "axios";
const Cart = () => {
  const { token } = useAuth();
  var Reduxdispatch = useDispatch();
  var cart = useSelector((state) => state.cart);
  const data = useSelector((state) => state.cart);
  const [refresh, setRefresh] = useState(false);
  const [buyerId, setBuyerId] = useState();

  const [cartData, setCartData] = useState();

  var keys = Object.keys(cart);
  var values = Object.values(cart);
  var totalamt = values.reduce(calculate, 0);
  var totalsaving = values.reduce(totaloffer, 0);
  var navigate = useNavigate();

  const handlepayment = () => {
    navigate(`/payment/${buyerId}`);
  };

  const [getQty, setQty] = useState(1);
  var Reduxdispatch = useDispatch();

  const handelincrement = async (id) => {
    const details = {
      productId: id,
      quantity: 1,
    };

    console.log(details);

    const response = await axios.post(`http://localhost:5000/buyer/cart/add`, details, {
      headers: { "x-access-token": token },
    });
    console.log(response);
    window.location.reload();
  };
  const handeDecrement = async (id, quantity) => {
    if (quantity === 1) {
      deleteCartHandler(id);
    }

    const details = {
      productId: id,
      quantity: -1,
    };

    console.log(details);

    const response = await axios.post(`http://localhost:5000/buyer/cart/add`, details, {
      headers: { "x-access-token": token },
    });
    console.log(response);
    window.location.reload();
  };

  function calculate(prev, item) {
    var price = item.offer == 0 ? item.price : item.price * item.qtydemand;
    return prev + price;
  }

  function totaloffer(prev, item) {
    var price = item.price > 0 ? item.offer * item.qtydemand : item.offer;
    return prev + price;
  }

  var netamount = totalamt - totalsaving;

  //////////////////////////DRAWER//////////////////
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handledeletelaptop = (item) => {
    Reduxdispatch({ type: "REMOVE_ITEM", payload: item });
    setRefresh(!refresh);
  };

  useEffect(() => {
    const getCartData = async () => {
      const response = await axios.get(`http://localhost:5000/buyer/cart`, {
        headers: { "x-access-token": token },
      });
      const data = await response.data;
      console.log(data);
      setBuyerId(data.buyerId);
      setCartData(data.products);
    };

    getCartData();
  }, [token]);

  const deleteCartHandler = async (id) => {
    console.log(id);
    const response = await axios.delete(`http://localhost:5000/buyer/cart/remove/${id}`, {
      headers: { "x-access-token": token },
    });
    console.log(response);
    window.location.reload();
    console.log("deleted");
  };

  const list = () => {
    return (
      <div>
        <div style={{ padding: 5 }}>
          <Grid container spacing={1}>
            <Grid item xs={6} style={{ padding: 3 }}>
              Total Amount:
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  const showFoodCart = () => {
    return (
      <div
        style={{
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          margin: 10,
        }}
      >
        <h2>Shopping Cart</h2>
        {/* <button
          onClick={() => {
            console.log(cartData);
            console.log(getQty);
          }}
        >
          click
        </button> */}
        {!cartData && (
          <div className="home-bottom">
            <div className="home-cards">
              <h2>Cart Empty</h2>
            </div>
          </div>
        )}

        {cartData && (
          <div className="home-bottom">
            <div className="home-cards">
              {cartData.map((cartItem) => {
                return (
                  <div key={cartItem._id} className="home-card">
                    <div style={{ width: "50px", height: "60px", backgroundColor: "blue" }}>
                      <img
                        src={cartItem.img}
                        alt="prod-img"
                        height="60"
                        width="50"
                        style={{ zIndex: "10" }}
                      />
                      <div
                        className="deleteDiv"
                        // onClick={(cartItem) => handledeletelaptop(cartItem)}
                        // style={{
                        //   display: "flex",
                        //   alignContent: "flex-end",
                        //   marginLeft: "1000%",
                        //   alignSelf: "flex-end",
                        // }}
                      >
                        <Button>
                          <DeleteOutlined
                            onClick={() => {
                              deleteCartHandler(cartItem.productId);
                            }}
                          />
                        </Button>
                      </div>
                    </div>
                    <div className="home-card--content">
                      <h2> {cartItem.name} </h2>
                      <h3> INR {cartItem.price} </h3>

                      <div className="product-detail-quantity">
                        <div>
                          <button
                            onClick={() => handeDecrement(cartItem.productId, cartItem.quantity)}
                          >
                            -
                          </button>

                          {cartItem.quantity}
                          <button onClick={() => handelincrement(cartItem.productId)}>+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 

<div style={{ padding: 5,position:'fixed',
    padding:'12',
    width:'100%',
    height:70,
    marginTop:'12',
    bottom:0,
    left:0,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    // width:'70%',
    // marginLeft:200
    flexDirection:'row',
    width:'100%', }}>
        <Grid container spacing={1}>
          <Grid item xs={6} style={{ padding: 3 }}>
            Total Amount:
          </Grid>


        </Grid>
      </div> 

<br></br>
<br></br><br></br>
<br></br> */}
        <div
          className="container"
          style={{
            // position: "fixed",
            marginTop: "5rem",
            padding: "1rem",
            width: "100%",
            height: 70,

            // bottom: 0,
            // left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="buttons checkout"
            style={{
              width: "50%",
              height: "5rem",
              fontWeight: "bold",
            }}
          >
            <button onClick={() => handlepayment()} style={{ borderRadius: "25px" }}>
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    );
  };

  // const {itemsInCart,dispatch} = useCart();
  // console.log(itemsInCart,"cart items")
  return (
    <div>
      <Navigation />

      {showFoodCart()}
    </div>
  );
};

export default Cart;
