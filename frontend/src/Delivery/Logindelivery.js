import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
const Login = () => {
  const initialState = {
    Phone: "",
    fullname: "",
  };
  const [details, setDetails] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { fullname, Phone } = details;
  const { user, signIn, isUserLoggedIn, role, delivererSignIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isUserLoggedIn) navigate("/home");
  }, [isUserLoggedIn]);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(details);

    delivererSignIn(details.Phone, details.fullname);
    navigate("/deliverydashboard");
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
              onChange={(e) => setDetails((state) => ({ ...state, fullname: e.target.value }))}
              value={fullname}
              className="signup-form--input"
              placeholder="Enter Your Registered Name"
              type="text"
            />
            <p className="helperText">Enter Your Registered Name</p>
          </div>
          <div>
            <input
              onChange={(e) => setDetails((state) => ({ ...state, Phone: e.target.value }))}
              value={Phone}
              className="signup-form--input"
              placeholder="Enter Your Registered Mobile Number"
              type="number"
            />
            <p className="helperText">Enter Your Registered Mobile Numbur</p>
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
      {/* <div>
        <p style={{ marginBottom: ".5rem" }}>
          Don't have an account ?{" "}
          <span className="linkText">
            {" "}
            <Link className="linkStyle" to="/category">
              sign up
            </Link>{" "}
          </span>
        </p>
        <p style={{ fontSize: ".8rem" }} className="linkText-light">
          Forgot your password?
        </p>
      </div> */}
    </div>
  );
};

export default Login;
