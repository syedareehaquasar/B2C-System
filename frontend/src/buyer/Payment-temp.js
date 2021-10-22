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
import { useNavigate, Link } from "react-router-dom";
import "./Payment.scss";
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

///////////////////////////////////////////

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const _DEV_ = document.domain === "localhost";

export default function HorizontalLabelPositionBelowStepper() {
  const navigate = useNavigate();
  const buyerId = useParams().buyerId;
  const [buyerData, setBuyerData] = useState();
  const { token } = useAuth();
  const [finalMessage, setFinalMessage] = useState(false);

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

  //////////////////////////////////////////////////////////////////////////

  const displayRazorPay = async () => {
    console.log(token);
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("razorpay sdk failed to load. are u online");
      return;
    }

    // const data = await fetch("http://localhost:5000/buyer/checkout", {
    //   method: "POST",
    // }).then((t) => t.json());

    // const data = await axios.post(`http://localhost:5000/buyer/checkout`, {
    //   headers: { "x-access-token": token },
    // });

    const data = await fetch(`http://localhost:5000/buyer/checkout`, {
      method: "POST",
      headers: {
        "x-access-token": token,
      },
    }).then((t) => t.json());

    console.log(data);

    var options = {
      key: _DEV_ ? "rzp_test_5AmHwMVymTPMzT" : "PRODUCTION_KEY", // Enter the Key ID generated from the Dashboard
      amount: data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "Payment",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function async(response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);

        const sendVerify = async (response) => {
          console.log(response);

          const details = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          const res = await axios
            .post(`http://localhost:5000/buyer/payment/verify`, details, {
              headers: {
                "x-access-token": token,
              },
            })
            .then(setFinalMessage(true));

          console.log(res);
        };

        sendVerify(response);
      },
      prefill: {
        name: "Ankur",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
    };
    var paymentObject = new window.Razorpay(options);

    // document.getElementById("rzp-button1").onclick = function (e) {
    //   rzp1.open();
    //   e.preventDefault();
    // };
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
  };

  /////////////////////////////////////////////////////////////////////

  const CODhandler = async () => {
    const response = await axios.get(`http://localhost:5000/buyer/COD`, {
      headers: {
        "x-access-token": token,
      },
    });
    // .then(alert("checkout complete please close this window"));
    setFinalMessage(true);
    console.log(response);
  };

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
            <div className="containerOverride">
              {/* <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button> */}
              {/* <Button
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
              </Button> */}
              <button
                // style={{
                //   // position: "fixed",
                //   border: "none",
                //   width: "20%",
                //   padding: "1rem",

                //   marginTop: "1rem",

                //   display: "flex",
                //   alignItems: "center",
                //   justifyContent: "center",
                //   marginLeft: 370,

                //   height: 50,
                //   color: "grey",
                //   background: "aqua",
                // }}
                onClick={displayRazorPay}
              >
                click for online payment
              </button>
              <button
                // style={{
                //   border: "none",
                //   width: "20%",
                //   padding: "1rem",

                //   marginTop: "1rem",

                //   display: "flex",
                //   alignItems: "center",
                //   justifyContent: "center",
                //   marginLeft: 370,

                //   height: 50,
                //   color: "grey",
                //   background: "aqua",
                // }}
                onClick={CODhandler}
              >
                click for cash on delivery payment
              </button>
            </div>
          </div>
        )}
      </div>

      {finalMessage && (
        <Link to={`/home`}>Payment Successful, click here to continue shopping </Link>
      )}
    </div>
  );
}

function getStepContent(stepIndex, buyerData) {
  switch (stepIndex) {
    case 0:
      return (
        <div>
          {buyerData && (
            <div style={{ background: "#ecf0f1", margin: "auto", width: 630 }}>
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
