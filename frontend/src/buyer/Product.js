import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/cartContext";
import { Navigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import NumericInput from "react-numeric-input";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import Navigation from "./Navigation";
import { cartActions } from "../store/cart-slice";
import Modal from "../Modal/Modal";
import { async } from "@firebase/util";
import "./product.scss";

const Product = () => {
  const _id = useParams().prodId;
  const reviewInitialState = {
    productId: _id,
    rating: null,
    review: "",
  };
  const [reviewDetails, setReviewDetails] = useState(reviewInitialState);

  const { state } = useLocation();
  const { shopName, phone } = state;
  const { quantity, dispatch } = useCart();
  const [product, setProduct] = useState();
  const [reviews, SetReviews] = useState();
  const [myReview, setMyReview] = useState();
  const [addReview, setAddReview] = useState(false);
  const [updateReview, setUpdateReview] = useState(false);
  const [showCartErr, setShowCartErr] = useState(false);

  const { token } = useAuth();

  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const [getQty, setQty] = useState(1);
  var Reduxdispatch = useDispatch();

  const handelincrement = () => {
    var c = getQty + 1;
    setQty(c);
  };
  const handeDecrement = () => {
    if (getQty >= 2) {
      var c = getQty - 1;
      setQty(c);
    }
  };

  const handleAddToCart = async (item) => {
    const details = {
      productId: product._id,
      quantity: getQty,
    };

    const response = await axios
      .post(`http://localhost:5000/buyer/cart/add`, details, {
        headers: { "x-access-token": token },
      })
      .then(() => {
        alert("item added to cart");
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 300) {
          setShowCartErr(true);
        }
      });

    console.log(response);

    ////////////////////////////////////////////
    product.qtydemand = getQty;
    Reduxdispatch({ type: "ADD_ITEM", payload: [product.id, product] });
    ///////////////////////////////////////////////
    // props.navigation.setParams({x:""})
    // setRefresh(!refresh);
    //   navigate("/product")
  };

  useEffect(() => {
    const getProductData = async () => {
      try {
        console.log(_id);
        const response = await axios.get(
          `http://localhost:5000/buyer/products/idSearch/${_id}`,
          {
            headers: { "x-access-token": token },
          }
        );
        console.log(response.data);
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getProductReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/review/${_id}`, {
          headers: { "x-access-token": token },
        });
        console.log("Reviews", response.data);
        const data = await response.data;
        SetReviews(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getMyProductReview = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/review/myReview/${_id}`, {
          headers: { "x-access-token": token },
        });
        const data = await response.data;
        console.log("myReview", data);
        setMyReview(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProductData();
    getProductReviews();
    getMyProductReview();
  }, [token, _id]);

  // console.log(product);

  const cancelCartErrHandler = () => {
    setShowCartErr(false);
  };

  const confirmDeleteHandler = async () => {
    console.log("deleting whole cart");
    const response = await axios
      .delete(`http://localhost:5000/buyer/cart/remove`, {
        headers: { "x-access-token": token },
      })
      .then(alert("cart deleted"));

    console.log(response);
    setShowCartErr(false);
    window.location.reload();
  };

  const handelReviewSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(reviewDetails);
    try {
      const response = await axios.patch(
        `http://localhost:5000/review/new`,
        reviewDetails,
        {
          headers: { "x-access-token": token },
        }
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReviewHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/review/delete/${_id}`, {
        method: "PATCH",
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navigation />

      <Modal
        show={showCartErr}
        onCancel={cancelCartErrHandler}
        header="Cannot add item"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <button className="popup-button" onClick={cancelCartErrHandler}>
              CANCEL, continue shopping
            </button>
            <button className="popup-button" onClick={confirmDeleteHandler}>
              OK, delete all the items from existing cart
            </button>
          </>
        }
      >
        <p>
          To add items from another seller you need to delete all the items from the existing seller
        </p>
      </Modal>

      <div className="shopName">
        <h2>{shopName}</h2>
        <div className="whatsapp">
          <img src={require("../images/whatsappicon.png").default} alt="" />
          <a style={{ textDecoration: "none" }} href={"tel:" + phone}>
            <span>Call Seller</span>
          </a>
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: "1rem" }}>Overview</h3>

        {product && (
          <div className="product">
            <img
              src={product.img}
              alt="product-img"
              height="300"
              width="300"
              style={{ margin: "auto" }}
            />
            <div className="product-detail">
              <h3> {product.name} </h3>
              <p>Description: {product.description}</p>
              <h3 className="product-price">Price: INR {product.price} </h3>
              <div className="product-detail-quantity">
                <h3>Quantity</h3>
                <div>
                  <button onClick={(event) => handeDecrement(event)}>-</button>
                  {/* <button onClick={()=>dispatch({type:"Decrease",payload:product})}>-</button> */}
                  {getQty}
                  <button onClick={(event) => handelincrement(event)}>+</button>
                </div>
              </div>
              <div className="buttons">
                <button onClick={handleAddToCart}>Add Cart</button>
              </div>
            </div>
          </div>
        )}
        {reviews === "No reviews found!" ? (
          <h3>no reviews</h3>
        ) : (
          <div className="product-detail-review">
            <h3>Review({reviews && reviews[0].reviews.length})</h3>

            <div className="home-cards">
              {reviews &&
                reviews[0].reviews.map((item) => {
                  return (
                    <div key={item.buyerId} className="home-card">
                      <img src="" alt="" />
                      <div className="home-card--content">
                        <h3>
                          {item.buyer}
                          <br />
                          Rating: {item.rating}
                        </h3>
                        <p>Review: {item.review}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        {addReview && (
          <div>
            <hr />
            <form onSubmit={handelReviewSubmitHandler} style={{ padding: "0.5px" }}>
              <div>
                <span>Rate This Product</span>
              </div>
              <input
                type="number"
                min="1"
                max="5"
                onChange={(e) => {
                  setReviewDetails((prev) => ({ ...prev, rating: e.target.value }));
                }}
              />
              <h3 style={{ display: "inline-block" }}>&nbsp;/5</h3>
              <div>
                <span>Review this product</span>
              </div>
              <textarea
                placeholder="Description..."
                id=""
                cols="40"
                rows="8"
                onChange={(e) => {
                  setReviewDetails((prev) => ({ ...prev, review: e.target.value }));
                }}
              ></textarea>
              <br />
              <button
                type="submit"
                style={{
                  backgroundColor: "#40bfff",
                  border: "none",
                  padding: "10px 15px",
                  color: "white",
                  borderRadius: "10px",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        )}
        {updateReview && (
          <div>
            <hr />
            <form onSubmit={handelReviewSubmitHandler}>
              <div>
                <span>Rate This Product</span>
              </div>
              <input
                placeholder={myReview.reviews[0].rating}
                type="number"
                min="1"
                max="5"
                onChange={(e) => {
                  setReviewDetails((prev) => ({ ...prev, rating: e.target.value }));
                }}
              />
              <h3 style={{ display: "inline-block" }}>&nbsp;/5</h3>
              <div>
                <span>Review this product</span>
              </div>
              <textarea
                placeholder={myReview.reviews[0].review}
                id=""
                cols="50"
                rows="8"
                onChange={(e) => {
                  setReviewDetails((prev) => ({ ...prev, review: e.target.value }));
                }}
              ></textarea>
              <br />
              <button
                type="submit"
                style={{
                  backgroundColor: "#40bfff",
                  border: "none",
                  padding: "10px 15px",
                  color: "white",
                  borderRadius: "10px",
                }}
              >
                Submit
              </button>
              <button
                style={{
                  backgroundColor: "#40bfff",
                  border: "none",
                  padding: "10px 15px",
                  color: "white",
                  borderRadius: "10px",
                  // marginRight: "0.5rem",
                }}
                onClick={deleteReviewHandler}
              >
                Delete Review
              </button>
            </form>
          </div>
        )}
        {myReview === "You don't have review for this product!" ? (
          <h4
            style={{
              textAlign: "center",
              margin: "1rem 0",
              fontWeight: "400",
              fontSize: ".9rem",
              cursor: "pointer",
            }}
            onClick={() => {
              setAddReview((prev) => !prev);
            }}
          >
            Add A Review
          </h4>
        ) : (
          <h4
            style={{
              textAlign: "center",
              margin: "1rem 0",
              fontWeight: "400",
              fontSize: ".9rem",
              cursor: "pointer",
            }}
            onClick={() => {
              setUpdateReview((prev) => !prev);
            }}
          >
            Update Review
          </h4>
        )}

        <div className="buttons">
          <button>Need Help</button>
        </div>
      </div>
    </>
  );
};

export default Product;
