import React, { useState } from "react";
import axios from "axios";

import { useLocation, useNavigate } from "react-router-dom";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase";
import { useAuth } from "../contexts/authContext";

const Otp = () => {
  const { state } = useLocation();
  const {
    fullName,
    password,
    confirmPassword,
    email,
    phone,
    shopAddress,
    shopName,
    description,
    role,
    route,
  } = state;
  const [phoneNo, setPhoneNo] = useState({ mobile: phone });
  const [otp, setOtp] = useState();
  const [RenderPasswordResetForm, setRenderPasswordResetForm] = useState(false);
  const { signUp, SellersignUp } = useAuth();
  const [details, setDetails] = useState();
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const navigate = useNavigate();

  const handelChangePhone = (e) => {
    const { name, value } = e.target;
    setPhoneNo({
      [name]: value,
    });

    if (route === "passwordReset") {
      setDetails((state) => ({ ...state, phone: value }));
    }
  };

  const handelChangeOtp = (e) => {
    const { name, value } = e.target;
    setOtp({
      [name]: value,
    });
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "+91" + phoneNo.mobile;
    console.log(phoneNumber);
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    console.log(fullName, password, confirmPassword, email, phoneNo.mobile, shopAddress, shopName);
    if (role === "buyer" && route === "signup") {
      signUp(fullName, password, confirmPassword, email, phoneNo.mobile, shopAddress, shopName);
      navigate("/home");
    }
    if (role === "seller" && route === "signup") {
      SellersignUp(
        fullName,
        password,
        confirmPassword,
        email,
        phone,
        shopAddress,
        shopName,
        description
      );
      navigate("/home");
    }
    setRenderPasswordResetForm(true);
  };

  const passwordResetSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(details);
    if (details.password !== details.confirmPassword) {
      console.log("Password does not match !");
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
      if (role === "buyer" && route === "passwordReset") {
        try {
          const response = await axios.patch(
            `http://localhost:5000/passwordReset`,
            details
          );
          console.log(response);
          alert("password reset");
          navigate("/login");
        } catch (error) {
          console.log(error);
        }
      }

      if (role === "seller" && route === "passwordReset") {
        try {
          const response = await axios.patch(
            `http://localhost:5000/passwordReset/seller`,
            details
          );
          console.log(response);
          alert("password reset");
          navigate("/sellerlogin");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      {!RenderPasswordResetForm && (
        <div className="App">
          <h2>Confirm Your phone number and press submit to recieve and OTP </h2>
          <form onSubmit={onSignInSubmit}>
            <div id="sign-in-button"></div>
            <input
              type="number"
              name="mobile"
              placeholder={phone}
              value={phone}
              required
              onChange={handelChangePhone}
            />
            <button type="submit">submit</button>
          </form>

          <h2>Enter OTP </h2>
          <form onSubmit={onSubmitOtp}>
            <input
              type="number"
              name="OTP"
              placeholder="OTP number"
              required
              onChange={handelChangeOtp}
            />
            <button type="submit">submit</button>
          </form>
        </div>
      )}
      {RenderPasswordResetForm && (
        <div>
          <form onSubmit={passwordResetSubmitHandler}>
            <h2>New Password</h2>
            <input
              type="password"
              name=""
              id=""
              onChange={(e) => setDetails((state) => ({ ...state, password: e.target.value }))}
            />
            <br />
            <h2>Confirm New Password</h2>
            <input
              type="password"
              name=""
              id=""
              onChange={(e) =>
                setDetails((state) => ({ ...state, confirmPassword: e.target.value }))
              }
            />
            <br />
            <button type="submit">Submit</button>
            {passwordMatchError && <h2>Password Does not match Please try again</h2>}
          </form>
        </div>
      )}
    </>
  );
};

export default Otp;
