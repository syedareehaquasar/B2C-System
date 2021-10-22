import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import Navigation from "./Navigate";
import { Button } from "@material-ui/core";
import { DetailsSharp } from "@material-ui/icons";
import "./SellerDashBoard.scss";
export const SellerDashboard = () => {
  const [shops, setShops] = useState([]);
  const { token } = useAuth();

  const [refresh, setRefresh] = useState(false);
  const [tempList, setTempList] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [seller, setSeller] = useState();

  const searching = (txt) => {
    setSearchTxt(txt);
    var result = tempList.filter((item) => {
      return item.buyer[0].shopName.toLowerCase().includes(txt.toLowerCase());
    });
    setShops(result);
  };

  const handelmyorder = () => {
    navigate("/mystock");
  };

  const Details = (id) => {
    console.log("clicked");
    navigate(`/sellerOrderDetails/${id}`);
  };

  const handelproducts = () => {
    navigate("/home");
  };

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:5000/seller/orders", {
          headers: { "x-access-token": token },
        });
        console.log(response.data);
        setShops(response.data.reverse());
        setTempList(response.data);
      } catch (error) {}
    })();

    const getSellerProfile = async () => {
      const response = await axios.get("http://localhost:5000/seller/profile", {
        headers: { "x-access-token": token },
      });
      const data = await response.data;
      console.log("seller profile", data);
      setSeller(data);
    };

    getSellerProfile();
  }, [token]);

  const [state, setState] = useState("");
  const [sstate, ssetState] = useState("");
  const handleClick1 = (id) => {
    setState({
      button: !state.button,
    });
    navigate("/mystock", id);
  };
  const handleClick2 = () => {
    setState({
      button: !state.button,
    });

    navigate("/home");
  };
  return (
    <>
      <Navigation />

      <div>
        {seller && <h3 className="greeting">Hi, {seller.fullname}</h3>}
        <p className="interacting">Here are your orders </p>
      </div>
      <div>
        <input
          placeholder="search for Buyers Shops"
          onChange={(event) => searching(event.target.value)}
          className="searchBar"
          type="search"
          name=""
          id=""
        />
      </div>
      <div className="home-bottom">
        {/* <div className="buttons"> */}

        {/* <div className="container">
      <button style={{width:400,marginLeft:30,height:20}} className={state.button ? "buttonTrue": "buttonFalse"} onClick={()=>handleClick1()}>Orders</button> 
      <button className={state.button ? "buttonTrue": "buttonFalse"} onClick={()=>handleClick1()}> <i className="far fa-smile"></i>See My Stocks</button>   
    </div> */}

        <button
          style={{ width: "50%", height: 40 }}
          className={state.button ? "buttonFalse" : "buttonTrue"}
          onClick={() => handleClick2()}
        >
          Orders
        </button>
        <button
          style={{ width: "50%", height: 40 }}
          className={state.button ? "buttonTrue" : "buttonFalse"}
          onClick={() => handleClick1()}
        >
          See My Stocks
        </button>

        {/* </div> */}
        <div className="home-cards">
          {shops.map((shop) => {
            return (
              <div key={shop._id} className="home-card">
                <div
                  style={{
                    height: "70px",
                    backgroundColor: "",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "70px",

                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ zIndex: "10" }}>
                      <img src={shop.products[0].img} alt="img" width="50px" height="70px" />
                    </div>
                    <div
                      style={{
                        // marginTop: 40,
                        marginLeft: 4,
                        marginBottom: 0,
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div style={{ marginTop: 3, fontSize: "smaller" }}>
                        <b>Status:</b>
                        <br></br> <b>{shop.status}</b>
                      </div>

                      <div
                        className="whatsapp detailsOver"
                        // style={{
                        //   marginLeft: "40rem",
                        //   cursor: "pointer",
                        //   zIndex: 10,
                        //   width: 92,
                        //   height: 40,
                        // }}
                        onClick={() => {
                          Details(shop._id);
                        }}
                      >
                        {/* <img src={require("../images/whatsappicon.png").default} alt="" />  */}
                        <span className="whatsapp" style={{ color: "white" }}>
                          ViewDetails
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="home-card--content"
                  style={{ marginBottom: "3rem", marginLeft: "1rem" }}
                >
                  {/* <button
                    onClick={() => {
                      console.log(shop.orderDetails.orderId);
                    }}
                  >
                    click
                  </button> */}
                  <p>#{shop.orderDetails[0].OrderId}</p>
                  <h2>Order By: {shop.buyer[0].shopName} </h2>
                  <h3>Bill: INR {shop.bill} </h3>
                  <h3>Payment Mode: {shop.orderDetails[0]["Payment Mode"]}</h3>
                  Items: {shop.products.length} &nbsp; Quantity:{shop.quantity}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;
