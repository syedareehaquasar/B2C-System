import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate, useParams } from "react-router-dom";
import Navigate from "./Navigate";

const UpdateStock = () => {
  const navigate = useNavigate();
  const stockId = useParams().stockId;
  const { token } = useAuth();
  const [stockData, setStockData] = useState({});

  const initialState = {
    price: "",
    description: "",
    quantity: 0,
  };
  const [details, setDetails] = useState(initialState);

  //Get the product info and store in stockData
  useEffect(() => {
    const getStockData = async () => {
      const response = await axios.get(
        `http://localhost:5000/seller/products/${stockId}`,
        {
          headers: { "x-access-token": token },
        }
      );

      const data = await response.data;
      setStockData(data.product);

      //updates the quantity in details
      setDetails((prevVal) => ({
        ...prevVal,
        quantity: data.product.quantity,
        description: data.product.description,
        price: data.product.price,
      }));

      console.log(data.product);
    };

    getStockData();
  }, [stockId, token]);

  //form onsubmit update function
  const updateProducts = async (event) => {
    event.preventDefault();
    console.log(details);

    try {
      const response = await axios.patch(
        `http://localhost:5000/seller/products/update/${stockId}`,
        details,
        { headers: { "x-access-token": token } }
      );
      console.log(response);
      navigate("/mystock");
    } catch (error) {
      console.log("update failed", error);
    }
  };

  return (
    <>
      <Navigate />
      <div>
        <h2
          style={{
            textAlign: "center",
            fontWeight: "500",
            color: "black",
            padding: "0 0 1rem 0",
            fontSize: "1rem",
          }}
        >
          Update Stock
        </h2>
        <form
          onSubmit={updateProducts}
          style={{ height: "80vh" }}
          className="signup-form"
          action=""
        >
          <input
            // value={details.price}
            onChange={(e) => setDetails((state) => ({ ...state, price: e.target.value }))}
            className="signup-form--input"
            placeholder={stockData.price}
            type="number"
          />
          <div
            style={{ flexDirection: "column", justifyContent: "flex-start" }}
            className="product-detail-quantity"
          >
            <h3 style={{ color: "lightgray", fontWeight: "500" }}>Add Quantity</h3>
            <div style={{ marginTop: "20px" }}>
              <button
                type="button"
                disabled={details.quantity === 0}
                onClick={() => setDetails((state) => ({ ...state, quantity: state.quantity - 1 }))}
                style={{ marginLeft: "0" }}
              >
                -
              </button>
              {details.quantity}
              <button
                type="button"
                onClick={() => setDetails((state) => ({ ...state, quantity: state.quantity + 1 }))}
              >
                +
              </button>
            </div>
          </div>
          <textarea
            // value={details.description}
            onChange={(e) => setDetails((state) => ({ ...state, description: e.target.value }))}
            className="signup-form--input"
            placeholder={stockData.description}
            name=""
            id=""
            cols="30"
            rows="8"
          ></textarea>
          <div style={{ margin: "2rem 0" }} className="buttons">
            <button
              type="submit"
              onClick={updateProducts}
              style={{
                cursor: "pointer",
                fontSize: "1.2rem",
                fontWeight: "600",
                letterSpacing: "1px",
                borderRadius: "5px",
                padding: "1.2rem",
              }}
            >
              Update Product In Stock
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateStock;
