import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import Navigate from "./Navigation";
import { Avatar, Button } from "@material-ui/core";
export const HomeLanding = () => {
  const [shops, setShops] = useState([]);
  const [buyer, setBuyer] = useState();
  const { token } = useAuth();

  const handleClick = () => {
    navigate("/addstock");
  };

  const [refresh, setRefresh] = useState(false);
  const [sellerName, setSellerName] = useState();
  const [tempList, setTempList] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");

  const searching = (txt) => {
    setSearchTxt(txt);
    var result = tempList.filter((item) => {
      return item.shopName.toLowerCase().includes(txt.toLowerCase());
    });
    setShops(result);
  };

  const handelmyorder = () => {
    navigate("/mystock");
  };

  const handelproducts = () => {
    navigate("/home");
  };

  const navigate = useNavigate();
  useEffect(() => {
    const getBuyerOrders = async () => {
      const response = await axios.get(`http://localhost:5000/buyer/order`, {
        headers: { "x-access-token": token },
      });

      const data = await response.data;
      console.log(data);
      setShops(data.orders);
      setTempList(data.orders);
    };

    const getBuyerProfile = async () => {
      const response = await axios.get(`http://localhost:5000/buyer/profile`, {
        headers: { "x-access-token": token },
      });
      const data = await response.data;
      console.log("buyer data", data);
      setBuyer(data);
    };

    getBuyerOrders();
    getBuyerProfile();
  }, [token]);

  const [state, setState] = useState("");
  const [sstate, ssetState] = useState("");
  const handleClick1 = () => {
    setState({
      button: !state.button,
    });
    navigate("/myorders");
  };
  const handleClick2 = () => {
    setState({
      button: !state.button,
    });

    navigate("/home");
  };

  //   const deleteHandler = async (event) => {
  //     // not working
  //     try {
  //       const response = await axios.delete(
  //         `http://localhost:5000/seller/products/delete/${event.target.id}`,
  //         {
  //           headers: { "x-access-token": token },
  //         }
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       console.log("failed");
  //     }
  //     window.location.reload();
  //   };

  return (
    <>
      <Navigate />
      <div>
        {buyer && <h3 className="greeting">Hi, {buyer.fullname}</h3>}
        <p className="interacting">Here are your Orders</p>
      </div>
      <div>
        <input
          placeholder="search for Shop Name"
          onChange={(event) => searching(event.target.value)}
          className="searchBar"
          type="search"
          name=""
          id=""
        />
      </div>
      <div className="home-bottom">
        <button
          style={{ width: "50%", height: 40 }}
          className={state.button ? "buttonTrue" : "buttonFalse"}
          onClick={() => handleClick2()}
        >
          Sellers
        </button>
        <button
          style={{ width: "50%", height: 40 }}
          className={state.button ? "buttonFalse" : "buttonTrue"}
          onClick={() => handleClick1()}
        >
          My Orders
        </button>

        {/* <div className="buttons">
                    <button onClick={()=>handelproducts()}>Orders</button>
                    <button onClick={()=>handelmyorder()}>See My Stocks</button>
                </div> */}
        <div className="home-cards">
          {shops &&
            shops.map((shop) => {
              return (
                <div key={shop._id} className="home-card">
                  <div
                    style={{
                      height: "120px",
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
                          marginTop: 40,
                          marginLeft: 4,
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        {/* <div>
                        <br></br>{" "}
                        <span>
                          <Link to={`/updatestock/${shop._id}`}>Update </Link>{" "}
                        </span>
                      </div> */}
                      </div>
                    </div>
                  </div>

                  <div className="home-card--content" style={{ marginBottom: 50 }}>
                    <h2>Bought from : {shop.shopName} </h2>
                    <h3>Bill:INR {shop.bill}/- </h3>
                    <ul>
                      {shop.products.map((item) => (
                        <li key={item._id}>
                          {item.name} , Quantity:{item.quantity}{" "}
                        </li>
                      ))}
                    </ul>
                    Total Items : {shop.quantity}
                    <h3>Status : {shop.status}</h3>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default HomeLanding;
