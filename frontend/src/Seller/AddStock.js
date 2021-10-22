import axios from "axios";
import React, { useState } from "react";
import { storage, ref, getDownloadURL, uploadBytesResumable } from "../firebase";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import FileUpload from "./ImageUpload";
import Navigation from "./Navigate";

const AddStock = () => {
  const initialState = {
    name: "",
    price: "",
    description: "",
    quantity: 0,
    img: "",
  };
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState();
  const [progress, setProgress] = useState();
  const [details, setDetails] = useState(initialState);
  const navigate = useNavigate();

  const { token } = useAuth();
  const addProduct = async (e) => {
    e.preventDefault();
    console.log(details);
    console.log(details, token);
    console.log(token);
    // try {
    //     const response = await fetch(`http://localhost:5000/seller/products/add`, {
    //       method: "POST",
    //       mode: "cors",
    //       headers: {"x-access-token":token

    //       },
    //       details: JSON.stringify(details),
    //     });
    //     const result = await response.json();
    //     console.log("tata",result)
    //     return result;
    //   } catch (e) {
    //     return null;
    //   }

    try {
      const response = await axios.post(
        "http://localhost:5000/seller/products/add",
        details,
        { headers: { "x-access-token": token } }
      );
      navigate("/home");
      console.log(response);
    } catch (error) {
      console.log("dfgggg", error);
    }
  };

  const handelChangeImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handelUpload = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, "images/" + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress("Upload is " + progress + "% done");
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
          setDetails((state) => ({ ...state, img: downloadURL }));
        });
      }
    );
  };

  return (
    <div>
      <Navigation />
      <h2
        style={{
          textAlign: "center",
          fontWeight: "500",
          color: "black",
          padding: "0 0 1rem 0",
          fontSize: "1rem",
        }}
      >
        Add Stock
      </h2>
      <form onSubmit={addProduct} style={{ height: "80vh" }} className="signup-form" action="">
        <input
          value={details.name}
          onChange={(e) => setDetails((state) => ({ ...state, name: e.target.value }))}
          className="signup-form--input"
          placeholder="Product Name"
          type="text"
        />
        <input
          value={details.price}
          onChange={(e) => setDetails((state) => ({ ...state, price: e.target.value }))}
          className="signup-form--input"
          placeholder="Add Selling Price"
          type="number"
        />

        {/* <input
          value={details.description}
          onChange={(e) => setDetails((state) => ({ ...state, description: e.target.value }))}
          className="signup-form--input"
          placeholder="Product Description"
          type="textarea"
        /> */}

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
          value={details.description}
          onChange={(e) => setDetails((state) => ({ ...state, description: e.target.value }))}
          className="signup-form--input"
          placeholder="Description"
          name=""
          id=""
          cols="30"
          rows="8"
        ></textarea>
        <br />
        <div>
          <input type="file" name="" id="" onChange={handelChangeImage} />
          <br />
          <button onClick={handelUpload} style={{ marginTop: "20px" }}>
            Upload
          </button>
          <h4>{progress}</h4>
          <img src={url} alt="img" width="200" height="200" />
        </div>

        <div style={{ margin: "2rem 0" }} className="buttons">
          <button
            type="submit"
            onClick={addProduct}
            style={{
              cursor: "pointer",
              fontSize: "1.2rem",
              fontWeight: "600",
              letterSpacing: "1px",
              borderRadius: "5px",
              padding: "1.2rem",
            }}
          >
            Add Product In Stock
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStock;
