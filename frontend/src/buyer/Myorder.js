import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import Navigation from "./Navigation";
export const HomeLanding = () => {
  const [shops, setShops] = useState([]);
  const [buyer, setBuyer] = useState();
  const { token } = useAuth();

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
    return <div></div>;
  };

  const handelproducts = () => {
    navigate("/home");
  };

  const navigate = useNavigate();
  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const response = await axios.get(
  //           "https://tranquil-escarpment-64779.herokuapp.com/sellers",
  //           { headers: { "x-access-token": token } }
  //         );

  //         setShops(response.data);
  //         setTempList(response.data);
  //       } catch (error) {}
  //     })();
  //   }, [token]);

  const [state, setState] = useState("");
  const [sstate, ssetState] = useState("");
  const handleClick1 = () => {
    setState({
      button: !state.button,
    });
    navigate("/myorder/*");
  };
  const handleClick2 = () => {
    setState({
      button: !state.button,
    });

    navigate("/home");
  };

  return (
    <>
      <div>
        <Navigation />
        <h3 className="greeting">Hi Prakash</h3>
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
          style={{ width: 450, height: 40 }}
          className={state.button ? "buttonTrue" : "buttonFalse"}
          onClick={() => handleClick2()}
        >
          Products
        </button>
        <button
          style={{ width: 450, height: 40, marginLeft: 12 }}
          className={state.button ? "buttonFalse" : "buttonTrue"}
          onClick={() => handleClick1()}
        >
          My Orders
        </button>

        {/* <div className="buttons">
                    <button onClick={()=>handelproducts()}>Products</button>
                    <button onClick={()=>handelmyorder()}>My Orders</button>
                </div> */}
        <div className="home-cards">
          {shops.map((shop) => {
            return (
              <div key={shop.id} className="home-card">
                <div
                  style={{
                    width: "50px",
                    height: "110px",
                    backgroundColor: "",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "70px",
                      backgroundColor: "red",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        marginTop: 70,
                        marginLeft: 4,
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div style={{ marginTop: 3 }}>
                        <b>Status:</b>
                        <br></br> Dispatched
                      </div>
                      <div style={{ marginLeft: "700px" }} className="whatsapp">
                        <img src={require("../images/whatsappicon.png").default} alt="" />
                        <span>Call</span>
                      </div>
                    </div>
                  </div>{" "}
                </div>

                <div className="home-card--content">
                  <h2> {shop.shopName} </h2>
                  <h3> Rs.579.00 </h3>
                  Quantity : 5
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
