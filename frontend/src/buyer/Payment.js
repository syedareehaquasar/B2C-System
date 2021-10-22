import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navigation from "./Navigation";
import { Avatar } from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: "whitestoke",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Address", "Payment", "Order Placed"];
}

export default function HorizontalLabelPositionBelowStepper() {
  const buyerId = useParams().buyerId;
  const [buyerData, setBuyerData] = useState();
  const { token } = useAuth();

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    const getbuyerData = async () => {
      const response = await axios.get(`http://localhost:5000/seller/buyer/${buyerId}`, {
        headers: { "x-access-token": token },
      });
      console.log(response);
      const data = await response.data;
      console.log(data);

      setBuyerData(response.data);
    };

    getbuyerData();
  }, [token, buyerId]);

  return (
    <div className={classes.root}>
      {/* <button onClick={()=>{console.log(buyerData);}} >vlivk</button> */}
      <Navigation />
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep, buyerData)}
            </Typography>
            <div>
              {/* <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button> */}
              <Button
                style={{
                  position: "fixed",
                  width: "45%",
                  padding: "1rem",

                  marginTop: "1rem",
                  bottom: 0,
                  left: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 370,

                  height: 50,
                  color: "white",
                  background: "aqua",
                }}
                variant="contained"
                color=""
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Deliver Here"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getStepContent(stepIndex, buyerData) {
  switch (stepIndex) {
    case 0:
      return (
        <div>
          {buyerData && (
            <div style={{ background: "#ecf0f1", marginLeft: 150, marginTop: 20, width: 630 }}>
              <font color="red" style={{ color: "red", fontWieght: "bold" }}>
                <b>Delivery Address</b>
              </font>
              {"\n\n"}
              <br></br>
              <div></div>
              <div></div>
              Name:{buyerData.fullname}
              <br></br>
              MobileNo:{buyerData.phone}
              <br></br>
              EmailID:{buyerData.email}
              <br></br>
              Address:{buyerData.shopAddress}
            </div>
          )}
        </div>
      );
    case 1:
      return (
        <div style={{ marginLeft: 150, marginTop: 20, width: 630 }}>
          <h3>Select Payment Method</h3>
          <div style={{ background: "#ecf0f1", marginTop: 20, width: 630 }}>Cart</div>

          <div style={{ marginTop: 20 }}>Credit Debit & ATM Cards</div>
          <div style={{ marginTop: 20 }}>Sodexco Meal Pass</div>
          <div style={{ background: "#ecf0f1", marginTop: 20, width: 630, marginTop: 20 }}>UPI</div>
          <div style={{ marginTop: 20 }}>PhonePay</div>
          <div style={{ marginTop: 20 }}>Google Pay</div>
          <div style={{ background: "#ecf0f1", marginTop: 20, width: 630, marginTop: 20 }}>
            Wallets
          </div>
          <div style={{ marginTop: 20 }}>Paytm</div>
          <div style={{ marginTop: 20 }}>Mobikwik</div>
        </div>
      );
    case 2:
      return (
        <div
          style={{
            background: "#00a8ff",
            marginLeft: 210,
            width: 500,
            height: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ marginLeft: 0, marginTop: 20, color: "white", marginTop: 0, marginTop: 0 }}>
            <div style={{ marginTop: 10 }}>
              <Avatar
                style={{
                  display: "flex",
                  marginTop: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  width: 200,
                  height: 200,
                }}
                src="/2.png"
              ></Avatar>
            </div>

            <h1 style={{ color: "white" }}>Congratulation</h1>
            <div style={{ marginLeft: 40, color: "white" }}>
              <div style={{ color: "white" }}>Your Order Is been</div>
              <div style={{ color: "white" }}>Succesfully Placed</div>
            </div>
            <div
              style={{
                marginTop: 60,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar src="/2.png"></Avatar>
              <font style={{ marginLeft: 20, color: "white", marginTop: 8 }} color="white">
                Hang Tight
              </font>{" "}
            </div>
            <br></br>
            <div style={{ color: "white", marginLeft: 20 }}>We'll soon deliver your order</div>
            <div style={{ color: "white", marginLeft: 100 }}>soon</div>
          </div>
        </div>
      );
    default:
      return "Unknown stepIndex";
  }
}
