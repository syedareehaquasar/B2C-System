import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import Navigation from "./DeliveryNavigation";
import { Button } from "@material-ui/core";
import { DetailsSharp } from "@material-ui/icons";
import "./Deliverydashboard.scss";
export const HomeLanding = () => {
  const [shops, setShops] = useState([]);
  const { token } = useAuth();

  ///////////////////////////////////////////////////////////////////
  const [delivererData, setDelivererData] = useState();
  const [orderData, setOrderData] = useState();
  const [products, setProducts] = useState();
  const [buyerData, setBuyerData] = useState();

  ///////////////////////////////////////////////////////////////////

  const [refresh, setRefresh] = useState(false);
  const [tempList, setTempList] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");

  const searching = (txt) => {
    setSearchTxt(txt);
    var result = tempList.filter((item) => {
      return item.shopName.includes(txt);
    });
    setShops(result);
  };

  const handelmyorder = () => {
    navigate("/mystock");
  };

  const Details = (id) => {
    navigate(`/productdetails/${id}`);
  };

  const handelproducts = () => {
    navigate("/home");
  };

  const navigate = useNavigate();
  useEffect(() => {
    const getOrderData = async () => {
      const response = await axios.get(`http://localhost:5000/delivery/orders`, {
        headers: { "x-access-token": token },
      });

      const data = await response.data;
      console.log("order data", data);
      setOrderData(data.orders);
      setProducts(data.orders[0].products);
    };

    const getDelivererData = async () => {
      const response = await axios.get(`http://localhost:5000/delivery/profile`, {
        headers: { "x-access-token": token },
      });
      const data = await response.data;
      console.log("deliverer profile", data);
      setDelivererData(data);
    };

    getOrderData();
    getDelivererData();
  }, [token]);
  return (
    <>
      <Navigation />
      <div>
        {delivererData && <h3 className="greeting">Hi, {delivererData.profile.fullname}</h3>}
        <p className="interacting">Here are your delivery orders</p>
      </div>

      <div className="home-bottom">
        <div className="buttons">
          {/* <button onClick={() => handelproducts()}>Assigned orders</button> */}
          <button
            onClick={() => {
              console.log(products);
            }}
          >
            Assigned orders
          </button>
          {/* <button onClick={()=>handelmyorder()}>See My Stocks</button> */}
        </div>
        {orderData &&
          orderData.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                backgroundColor: "white",
                padding: "rem",
                borderRadius: "5px",
                marginBottom: "1rem",
                marginTop: 40,
              }}
            >
              <div>
                <div>
                  <div style={{ display: "flex", flexDirection: "row", marginTop: 0 }}>
                    <div style={{ fontWeight: "bold", marginLeft: "40px", marginTop: 5 }}>
                      Order#{item.orderDetails[0].OrderId}
                    </div>
                    <div style={{ fontWeight: 200, marginLeft: 500, marginTop: 5 }}>
                      {item.date}
                    </div>
                    <br></br>
                  </div>
                  <div style={{ display: "flex", flexDirection: "", padding: 5, marginTop: 5 }}>
                    <img src={item.products[0].img} alt="prod-img" width="60" height="90" />
                    {/* <div style={{ width: "60px", height: "90px", backgroundColor: "red" }}></div> */}

                    <div
                      style={{
                        display: "flex",
                        fontWeight: 480,
                        flexDirection: "column",
                        marginLeft: "1rem",
                        marginTop: 7,
                      }}
                    >
                      <p style={{ margin: 0 }}> Buyer Shop Name: {item.buyer[0].shopName}</p>{" "}
                      <p>Buyer Name: {item.buyer[0].fullname}</p>
                      <b style={{ marginTop: 2, fontWeight: 500 }}>Bill: INR {item.bill}</b>
                      <b style={{ marginTop: 0, fontWeight: 350 }}>
                        {/* Door handle of 2*2 in red color of window <br></br>in reight handelproducts */}
                        Total Items: {item.quantity}
                      </b>
                      <b style={{ marginTop: 0, fontWeight: 500 }}>
                        Payment Mode: {item.orderDetails[0]["Payment Mode"]}
                      </b>
                      <b style={{ marginTop: 0, fontWeight: 350 }}>Status: {item.status}</b>
                    </div>
                  </div>
                  <b>Address:</b>{" "}
                  <b className="details">
                    <span onClick={() => Details(item._id)}>ViewDetails</span>
                  </b>
                  <div>
                    {/* Gole ka mandir Gwalior<br></br> Pragati vihar colony B25 mela ground */}
                    {item.buyer[0].shopAddress}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default HomeLanding;
