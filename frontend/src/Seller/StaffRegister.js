import React from "react";
import { useState } from "react";

import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "./Navigate";

const StaffRegister = () => {
  const [fullname, setname] = useState("");
  const [phoneed, setmobile] = useState("");

  const { token } = useAuth();

  var navigate = useNavigate();

  const handlesubmit = async () => {
    let phone = parseInt(phoneed);
    console.log(fullname, parseInt(phoneed));
    var body = { fullname, phone };
    console.log(token);
    console.log(body);

    try {
      const response = await axios.post(
        `http://localhost:5000/deliveryAuth/signup`,
        body,
        { headers: { "x-access-token": token } }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    navigate("/staff");
  };

  return (
    <>
      <Navigation />
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
          My Staff
        </h2>
        {/* <form onSubmit={handlesubmit} style={{height:"35vh"}} className="signup-form"> */}
        <h2
          style={{ fontWeight: "500", color: "black", padding: "0 0 1rem 0", fontSize: "1.2rem" }}
        >
          Staff Register
        </h2>
        <input
          className="signup-form--input"
          onChange={(event) => setname(event.target.value)}
          placeholder="Enter Staff Name"
          type="text"
        />
        <input
          style={{ marginTop: 30 }}
          onChange={(event) => setmobile(event.target.value)}
          className="signup-form--input"
          placeholder="Enter Staff Register Mobile Number"
          type="string"
        />

        <div style={{ margin: ".5rem 0", marginTop: 30 }} className="buttons">
          <button
            onClick={handlesubmit}
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
              letterSpacing: "1px",
              borderRadius: "5px",
              padding: "1.2rem",
            }}
          >
            Staff Register
          </button>
        </div>

        {/* </form> */}
      </div>
    </>
  );
};

export default StaffRegister;
