import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { postData } from "../FetchNodeServices";
import swal from "sweetalert";
const Login = () => {
  const initialState = {
    phone: "",
    password: "",
    email: "",
  };

  ///////////////////////////////////////////

  const [phoneFormError, setPhoneFormError] = useState(false);
  const [passwordFormError, setPasswordFormError] = useState(false);
  const [formError, setFormError] = useState(true);

  ////////////////////////////////////////////
  const [details, setDetails] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { email, phone, password } = details;
  const { user, signIn, isUserLoggedIn, role } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isUserLoggedIn) navigate("/home");
  }, [isUserLoggedIn]);

  useEffect(() => {
    if (!formError) {
      console.log("form valid calling api");
      signIn(details.phone, details.password);
    } else {
      console.log("invalid form");
    }
  }, [formError]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (details.phone === "") {
      setFormError(true);
      setPhoneFormError(true);
      return;
    } else if (details.password === "") {
      setFormError(true);
      setPasswordFormError(true);
      return;
    }

    setFormError(false);

    console.log(details);
  };

  return (
    <div style={{ height: "95vh" }} className="flex-column">
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "black",
          marginBottom: "1rem",
          alignSelf: "center",
          borderRadius: "50%",
        }}
      >
        {error && error}
      </div>
      <div className="flex-column login-middle">
        <h2 className="para-bold">Welcome</h2>
        <p className="para-semiBold">Log in</p>
        <form onSubmit={submitHandler} action="">
          {/* <div>
                <input onChange={(e)=>setDetails(state=>({...state,phone:e.target.value}))} value={phone} className="signup-form--input" placeholder="Phone Nmber" type="text" />
                <p className="helperText">Enter Your Phone Number</p>
                </div>  */}
          <div>
            <input
              onChange={(e) => {
                setDetails((state) => ({ ...state, phone: e.target.value }));
                setPhoneFormError(false);
              }}
              value={phone}
              className="signup-form--input"
              placeholder="Enter Phone Number"
              type="text"
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
                setDetails((state) => ({ ...state, password: e.target.value }));
                setPasswordFormError(false);
              }}
              value={password}
              className="signup-form--input"
              placeholder="Password"
              type="password"
            />
            <p className="helperText">Enter Your Full Password</p>
            {passwordFormError && (
              <p className="helperText" style={{ color: "red" }}>
                Enter valid password
              </p>
            )}
          </div>
        </form>
        <Button
          type="submit"
          onClick={submitHandler}
          style={{ padding: "10px", backgroundColor: "var(--primary-color)" }}
          variant="contained"
          color="primary"
        >
          Log in
        </Button>
      </div>
      <div>
        <p style={{ marginBottom: ".5rem" }}>
          Don't have an account ?{" "}
          <span className="linkText">
            {" "}
            <Link className="linkStyle" to="/category">
              sign up
            </Link>{" "}
          </span>
        </p>
        <Button
          className="linkStyle"
          onClick={() =>
            navigate("/otp", {
              state: {
                route: "passwordReset",
                role: "buyer",
              },
            })
          }
          style={{ color: "aqua" }}
        >
          <b style={{ color: "#00a8ff" }}> Forgot Password</b>
        </Button>
      </div>
    </div>
  );
};

export default Login;
