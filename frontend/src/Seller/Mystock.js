import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import Navigate from "./Navigate";
import { Avatar, Button } from "@material-ui/core";
import "./Mystock.scss";
export const HomeLanding = () => {
  const [shops, setShops] = useState([]);
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
      return item.name.toLowerCase().includes(txt.toLowerCase());
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
    (async () => {
      try {
        const response = await axios.get("http://localhost:5000/seller/products", {
          headers: { "x-access-token": token },
        });

        const sellerData = await axios.get("http://localhost:5000/seller/profile", {
          headers: { "x-access-token": token },
        });
        console.log(response.data);
        setSellerName(sellerData.data.fullname);

        setShops(response.data);

        setTempList(response.data);
      } catch (error) {}
    })();
  }, [token]);

  const [state, setState] = useState("");
  const [sstate, ssetState] = useState("");
  const handleClick1 = () => {
    setState({
      button: !state.button,
    });
    navigate("/mystock");
  };
  const handleClick2 = () => {
    setState({
      button: !state.button,
    });

    navigate("/home");
  };

  const deleteHandler = async (e) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/seller/products/delete/${e.target.id}`,
        {
          headers: { "x-access-token": token },
        }
      );
      console.log(response);
    } catch (error) {
      console.log("failed");
    }
    window.location.reload();
  };

  return (
    <>
      <Navigate />
      <div>
        <h3 className="greeting">Hi, {sellerName}</h3>
        <p className="interacting">What are you looking for today ?</p>
      </div>
      <div>
        <input
          placeholder="search for Company products"
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
          Orders
        </button>
        <button
          style={{ width: "50%", height: 40 }}
          className={state.button ? "buttonFalse" : "buttonTrue"}
          onClick={() => handleClick1()}
        >
          See My Stocks
        </button>

        {/* <div className="buttons">
                    <button onClick={()=>handelproducts()}>Orders</button>
                    <button onClick={()=>handelmyorder()}>See My Stocks</button>
                </div> */}
        <div className="home-cards">
          {shops.map((shop) => {
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
                      // backgroundColor: "red",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ zIndex: "10" }}>
                      <img src={shop.img} alt="img" width="50px" height="70px" />
                    </div>
                    <div
                      style={{
                        marginTop: 40,
                        marginLeft: 4,
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div>
                        <br></br>{" "}
                        <span>
                          <Link to={`/updatestock/${shop._id}`}>Update </Link>{" "}
                        </span>
                      </div>

                      <div
                        onClick={deleteHandler}
                        id={shop._id}
                        className="whatsapp remove"
                        // style={{
                        //   marginLeft: "40rem",
                        //   background: "red",
                        //   cursor: "pointer",
                        //   zIndex: "10",
                        //   width: 92,
                        //   height: 40,
                        // }}
                      >
                        {/* <img src={require("../images/whatsappicon.png").default} alt="" />  */}
                        <span id={shop._id}>Remove</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="home-card--content" style={{ marginBottom: 50 }}>
                  <h2> Name: {shop.name} </h2>
                  <h3> Price: {shop.price} </h3>
                  <h3>Description: {shop.description}</h3>
                  Quantity : {shop.quantity}
                </div>
              </div>
            );
          })}

          <Avatar
            onClick={() => handleClick()}
            className="Add"
            style={{
              position: "fixed",

              padding: "1rem",
              cursor: "pointer",

              marginTop: "1rem",
              bottom: "1rem",

              // display: "flex",
              // alignSelf: "flex-end",

              color: "white",

              background: "green",
              fontSize: 45,
              width: 70,
              height: 70,
            }}
          >
            +
          </Avatar>
        </div>
      </div>
    </>
  );
};

export default HomeLanding;
