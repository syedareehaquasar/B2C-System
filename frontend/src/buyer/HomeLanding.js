import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import Navigation from "./Navigation";
import { getData } from "../FetchNodeServices";
import "./HomeLanding.scss";

export const HomeLanding = () => {
  const [shops, setShops] = useState([]);
  const [buyer, SetBuyer] = useState();
  const { token } = useAuth();

  const [refresh, setRefresh] = useState(false);
  const [tempList, setTempList] = useState();
  const [searchTxt, setSearchTxt] = useState();
  const [errTxt, setErrTxt] = useState();

  // const searching = (txt) => {
  //   setSearchTxt(txt);
  //   var result = tempList.filter((item) => {
  //     return item.shopName.includes(txt);
  //   });
  //   setShops(result);
  // };

  const handelmyorder = () => {
    navigate("/myorder/*");
  };

  // useEffect(function(){
  //     allproduct()
  // },[])

  const navigate = useNavigate();
  useEffect(() => {
    const getShop = async () => {
      try {
        const response = await axios.get("http://localhost:5000/buyer/sellers", {
          headers: { "x-access-token": token },
        });

        console.log("shopData", response.data);
        setShops(response.data);
        setTempList(response.data);
      } catch (error) {}
    };

    const getBuyerProfile = async () => {
      const response = await axios.get(`http://localhost:5000/buyer/profile`, {
        headers: { "x-access-token": token },
      });
      const data = await response.data;

      SetBuyer(data);
    };
    getShop();
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

  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/buyer/search/${searchTxt}`;
    console.log(url);

    try {
      const response = await axios.get(url, {
        headers: { "x-access-token": token },
      });
      const data = await response.data;
      console.log(data);
      if (!data.message) {
        if (data) {
          setShops(data);
        } else {
          setShops(tempList);
        }

        setErrTxt(null);
      } else {
        setErrTxt(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navigation />
      <div>
        {buyer && <h3 className="greeting">Hi {buyer.fullname}</h3>}
        <p className="interacting">What are you looking for today ?</p>
      </div>
      <div>
        <form className="search" onSubmit={searchSubmitHandler}>
          <input
            // style={{ width: "90%" }}
            placeholder="search for Company products"
            onChange={(event) => setSearchTxt(event.target.value)}
            className="searchBar"
            type="search"
            name=""
            id=""
          />
          <button
          // style={{
          //   marginLeft: "1rem",
          //   background: "#40bfff",
          //   border: "none",
          //   borderRadius: "7px",
          //   padding: "0.4rem",
          //   width: "7%",
          //   color: "white",
          // }}
          >
            search
          </button>
        </form>
      </div>
      <div className="home-bottom">
        <button
          style={{ width: "50%", height: 40 }}
          className={state.button ? "buttonFalse" : "buttonTrue"}
          onClick={() => handleClick2()}
        >
          Sellers
        </button>
        <button
          style={{ width: "50%", height: 40 }}
          className={state.button ? "buttonTrue" : "buttonFalse"}
          onClick={() => handleClick1()}
        >
          My Orders
        </button>

        {/* <div className="buttons">
                    <button>Products</button>
                    <button onClick={()=>handelmyorder()}>My Orders</button>
                </div> */}
        <div className="home-cards">
          {errTxt && <h2>{errTxt}</h2>}
          {shops.map((shop) => {
            return (
              <div key={shop._id} className="home-card">
                <div style={{ width: "50px", height: "60px", backgroundColor: "red" }}></div>
                <div className="home-card--content">
                  <h2> {shop.shopName} </h2>
                  <h3>
                    {" "}
                    {shop.description} | {shop.shopAddress}{" "}
                  </h3>
                  <div className="buttons">
                    <button onClick={() => navigate("/home/shop/" + shop._id, { state: shop })}>
                      view Products
                    </button>
                    {/* <button>Call</button> */}
                    <a className="call" href={"tel:" + shop.phone}>
                      <span>Call</span>
                    </a>
                  </div>
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
