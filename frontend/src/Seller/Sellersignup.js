import React, { useState, useEffect } from "react";
// import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { useAuth } from "../contexts/authContext";
import { useNavigate, useParams } from "react-router-dom";
import Otp from "../buyer/Otp";
import swal from "sweetalert";
import { postData } from "../FetchNodeServices";
const Sellersignup = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  console.log(category);
  const initialState = {
    fullName: "",
    email: "",
    phone: "",
    shopName: "",
    shopAddress: "",
    description: "",
    password: "",
    confirmPassword: "",
  };
  //////////////////////////////////////////////////////////////////

  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [formError, setFormError] = useState(true);
  const [nameFormError, setNameFormError] = useState(false);
  const [emailFormError, setEmailFormError] = useState(false);
  const [phoneFormError, setPhoneFormError] = useState(false);
  const [shopnameFormError, setShopnameFormError] = useState(false);
  const [shopaddressFormError, setShopaddressFormError] = useState(false);
  const [passwordFormError, setPasswordFormError] = useState(false);
  const [descriptionFormError, setDescriptionFormError] = useState(false);

  //////////////////////////////////////////////////////////////////
  const [details, setDetails] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { fullName, email, phone, shopName, shopAddress, password, confirmPassword, description } =
    details;
  const { user, SellersignUp, isUserLoggedIn } = useAuth();

  useEffect(() => {
    if (isUserLoggedIn) navigate("/home");
  }, [isUserLoggedIn]);

  useEffect(() => {
    if (!formError) {
      sendApiCall();
    }
  }, [formError]);

  const sendApiCall = async () => {
    if (formError === false) {
      console.log("form valid sending api call ");
      console.log(details);
      navigate("/otp", {
        state: {
          fullName,
          password,
          confirmPassword,
          email,
          phone,
          shopAddress,
          shopName,
          description,
          role: "seller",
          route: "signup",
        },
      });
    } else {
      console.log("form invalid not sending api call ");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (fullName.trim() === "") {
      setFormError(true);
      setNameFormError(true);
      return;
    } else if (!email.includes("@")) {
      setFormError(true);
      setEmailFormError(true);
      return;
    } else if (phone === "") {
      setFormError(true);
      setPhoneFormError(true);
      return;
    } else if (shopName.trim() === "") {
      setFormError(true);
      setShopnameFormError(true);
      return;
    } else if (description.trim() === "") {
      setFormError(true);
      setDescriptionFormError(true);
      return;
    } else if (shopAddress.trim() === "") {
      setFormError(true);
      setShopaddressFormError(true);
      return;
    } else if (password.trim() === "" || confirmPassword.trim() === "") {
      setFormError(true);
      setPasswordFormError(true);
      return;
    } else if (password !== confirmPassword) {
      setFormError(true);
      setPasswordMatchError(true);
      return;
    }

    setFormError(false);

    // console.log(email, password, "to signup");
    // if (password !== confirmPassword) {
    //   setError("Password does not match !");
    // } else {
    //   navigate("/otp", {
    //     state: {
    //       fullName,
    //       password,
    //       confirmPassword,
    //       email,
    //       phone,
    //       shopAddress,
    //       shopName,
    //       role: "seller",
    //       route: "signup",
    //     },
    //   });
    // }

    // SellersignUp(fullName, password, confirmPassword, email, phone, shopAddress, shopName);
    // console.log(fullName,phone,shopName,shopAddress,email,password,confirmPassword)
    //   var body={fullname:fullName,phone:phone,shopName:shopName,shopAddress:shopAddress,email:email,password:password,confirmPassword:confirmPassword};
    //   console.log(body)
    // var result=await postData("sellerAuth/signup",body)
    // console.log("hero",result)
    //   if (result.result) {
    //     swal({
    //       title: "New Buyer Login Successfully",
    //       icon: "success",
    //       dangerMode: true,
    //     });
    //     alert(JSON.stringify(result.token))
    //     localStorage.setItem('kylotoken',result.token)
    //   } else {
    //     swal({
    //       title: "buyer",
    //       text: "Fail to  Buyer Login",
    //       icon: "warning",
    //       dangerMode: true,
    //     });
    //   }
  };

  return (
    <div>
      {error && error}
      {/* {loading && "ho gaya"} */}
      {/* {JSON.stringify(user)} */}

      <form onSubmit={submitHandler} className="signup-form" action="">
        <div>
          <p style={{ fontSize: "1.2rem", fontWeight: "500" }}>Welcome Seller</p>
        </div>
        <div>
          <input
            onChange={(e) => {
              setDetails((state) => ({ ...state, fullName: e.target.value }));
              setNameFormError(false);
            }}
            value={fullName}
            className="signup-form--input"
            placeholder="Full Name"
            type="text"
          />
          <p className="helperText">Enter Your Full Name</p>
          {nameFormError && (
            <p className="helperText" style={{ color: "red" }}>
              Enter valid name
            </p>
          )}
        </div>
        <div>
          <input
            onChange={(e) => {
              setDetails((state) => ({ ...state, email: e.target.value }));
              setEmailFormError(false);
            }}
            value={email}
            className="signup-form--input"
            placeholder="Email"
            type="email"
          />

          <p className="helperText">Enter Your Email</p>
          {emailFormError && (
            <p className="helperText" style={{ color: "red" }}>
              Enter valid email
            </p>
          )}
        </div>
        <div>
          <input
            onChange={(e) => {
              setDetails((state) => ({ ...state, phone: e.target.value }));
              setPhoneFormError(false);
            }}
            value={phone}
            className="signup-form--input"
            placeholder="Phone Nmber"
            type="number"
          />
          <p className="helperText">Enter Your Phone Number</p>
          {phoneFormError && (
            <p className="helperText" style={{ color: "red" }}>
              Enter valid Phone number
            </p>
          )}
        </div>
        <div>
          <input
            onChange={(e) => {
              setDetails((state) => ({ ...state, shopName: e.target.value }));
              setShopnameFormError(false);
            }}
            value={shopName}
            className="signup-form--input"
            placeholder="Shop Name"
            type="text"
          />
          <p className="helperText">Enter Your Shop Name</p>
          {shopnameFormError && (
            <p className="helperText" style={{ color: "red" }}>
              Enter valid shop name
            </p>
          )}
        </div>

        <div>
          <input
            onChange={(e) => {
              setDetails((state) => ({ ...state, description: e.target.value }));
              setDescriptionFormError(false);
            }}
            value={description}
            className="signup-form--input"
            placeholder="Shop Description"
            type="text"
          />
          <p className="helperText">Enter Your Shop Description</p>
          {descriptionFormError && (
            <p className="helperText" style={{ color: "red" }}>
              Enter valid shop description
            </p>
          )}
        </div>

        <div>
          <input
            onChange={(e) => {
              setDetails((state) => ({ ...state, shopAddress: e.target.value }));
              setShopaddressFormError(false);
            }}
            value={shopAddress}
            className="signup-form--input"
            placeholder="Shop Address"
            type="text"
          />
          <p className="helperText">Enter Your Shop Address</p>
          {shopaddressFormError && (
            <p className="helperText" style={{ color: "red" }}>
              Enter valid shop address
            </p>
          )}
        </div>
        <div>
          <input
            onChange={(e) => setDetails((state) => ({ ...state, password: e.target.value }))}
            value={password}
            className="signup-form--input"
            placeholder="Create Password"
            type="password"
          />
          <p className="helperText">CreateYour Password</p>
        </div>
        <div>
          <input
            onChange={(e) => {
              setDetails((state) => ({ ...state, confirmPassword: e.target.value }));
              setPasswordFormError(false);
            }}
            value={confirmPassword}
            className="signup-form--input"
            placeholder="Confirm Password"
            type="password"
          />
          <p className="helperText">Confirm Your Full Password</p>
          {passwordFormError && (
            <p className="helperText" style={{ color: "red" }}>
              Enter valid password
            </p>
          )}
          {passwordMatchError && (
            <p className="helperText" style={{ color: "red" }}>
              password not matching
            </p>
          )}
        </div>
        <Button
          type="submit"
          onSubmit={submitHandler}
          style={{
            color: "white",
            padding: "10px",
            backgroundColor: "var(--primary-color)",
            cursor: "pointer",
          }}
          variant="contained"
          color="primary"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Sellersignup;
