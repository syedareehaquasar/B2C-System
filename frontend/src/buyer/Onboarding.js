import React from "react";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./Onboarding.scss";
const Onboarding = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* 
className="onboarding-middle big-center" */}
      <div className="main">
        <div
          className="onbording1"
          // style={{
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "center",
          //   flexDirection: "column",
          // }}
        >
          <div
            className="logo"
            // style={{
            //   width: "70px",
            //   height: "70px",
            //   backgroundColor: "black",
            //   marginBottom: "1rem",
            //   borderRadius: "50%",
            // }}
          ></div>
          <div
            className="svg-logo"
            // style={{
            //   width: "40%",
            //   height: "60%",
            //   display: "flex",
            //   alignItems: "center",
            //   justifyContent: "center",
            // }}
          >
            <img className="banner-image" src={require("../images/amico.svg").default} alt="" />
          </div>
        </div>
        <div className="onboarding-bottom">
          <div className="onboarding-bottom-first">
            <div
              style={{
                backgroundColor: "var(--primary-color)",
                padding: ".5em",
                borderRadius: "50%",
              }}
            >
              <img src={require("../images/welcome.svg").default} alt="" />
            </div>

            <h1>Welcome</h1>
          </div>
          <div className="onboarding-bottom-second">
            <p className="para-bold">Welcome to B2C Website</p>

            <p className="para-bold" style={{ marginLeft: "20px" }}>
              shopping platform
            </p>
          </div>
          <p className="para-light">Leading B2B E-commerce platform</p>
          <Button
            onClick={() => navigate("/category")}
            style={{ padding: "10px", width: "400px", backgroundColor: "var(--primary-color)" }}
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <div className="onboarding-bottom-third">
            <p className="para-semiBold">Already have an account?</p>
            <p className="linkText">
              <Button
                className="linkStyle"
                onClick={() => navigate("/categories")}
                style={{ color: "aqua" }}
              >
                <b style={{ color: "#00a8ff" }}> Login Here</b>
              </Button>
              <br />
            </p>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Onboarding;
