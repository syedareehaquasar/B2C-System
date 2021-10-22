import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from "@material-ui/core";
import Navigation from "./Navigation";
import { useLocation } from "react-router-dom";
const Shop = () => {
  const [shopProducts, setShopProducts] = useState([]);
  const { id } = useParams();
  console.log("ddddd", id);
  let location = useLocation();
  // alert(location.state) ;
  console.log(location.state);

  var shop = location.state;
  const [refresh, setRefresh] = useState(false);
  const [tempList, setTempList] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");

  const searching = (txt) => {
    setSearchTxt(txt);
    var result = tempList.filter((item) => {
      return item.name.toLowerCase().includes(txt.toLowerCase());
    });
    setShopProducts(result);
  };

  const navigate = useNavigate();
  const { token } = useAuth();
  console.log(token);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/buyer/seller/products/${id}`,
          { headers: { "x-access-token": token } }
        );
        if (response.status === 200) setShopProducts(response.data);
        setTempList(response.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    })();
  }, [id, token]);
  return (
    <>
      <Navigation />
      <div className="shopName">
        <h1>{shop.shopName}</h1>
        <div className="whatsapp">
          <img src={require("../images/whatsappicon.png").default} alt="" />
          <a style={{ textDecoration: "none" }} href={"tel:" + shop.phone}>
            <span>Call Seller</span>
          </a>
        </div>
      </div>

      <div style={{ marginTop: 0, display: "flex", flexDirection: "row" }}>
        <div style={{ marginTop: 3, background: "blue", color: "white" }}>
          <SearchIcon />
        </div>
        <TextField
          style={{ padding: 0, width: "100%" }}
          onChange={(event) => searching(event.target.value)}
          placeholder="Search product Here..."
          placeholderTextColor="#000"
          underlineColor="#000"
        />
      </div>
      {/* <div>
              
              
                <input placeholder="search for products" className="searchBar" type="search" name="" id="" />
        </div> */}
      <div className="home-bottom">
        <div className="home-cards">
          {shopProducts.map((product) => {
            return (
              <div key={product._id} className="home-card">
                <img src={product.img} alt="img" height="60" width="50" />
                {/* <div style={{ width: "50px", height: "60px", backgroundColor: "red" }}></div> */}
                <div className="home-card--content">
                  <h2>{product.name}</h2>
                  <h3>Description: {product.description}</h3>
                  <h3>INR: {product.price} </h3>
                  <div className="buttons">
                    <button
                      onClick={() =>
                        navigate(`/home/product/${product._id}`, {
                          state: { shopName: shop.shopName, phone: shop.phone },
                        })
                      }
                    >
                      view{" "}
                    </button>
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

export default Shop;
