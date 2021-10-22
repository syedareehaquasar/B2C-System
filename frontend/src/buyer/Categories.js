import React from "react";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
import "./Categories.scss";
const UserCategory = () => {
  const navigate = useNavigate();
  return (
    <div style={{ height: "90vh" }} className="onboarding">
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "black",
          marginBottom: "1rem",
          alignSelf: "center",
          borderRadius: "50%",
        }}
      ></div>
      <div className="onboarding-bottom category-bottom">
        <div className="onboarding-bottom-first">
          <div
            style={{
              backgroundColor: "var(--primary-color)",
              padding: ".5rem",
              borderRadius: "50%",
              marginRight: ".8rem",
            }}
          >
            <img src={require("../images/welcome.svg").default} alt="" />
          </div>

          <h1>Welcome</h1>
        </div>
        <div style={{ marginTop: 15 }}>
          <p className="para-bold">Please select an option</p>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button
            className="button"
            onClick={() => navigate("/login")}
            style={{ padding: "10px", backgroundColor: "var(--primary-color)" }}
            variant="contained"
            color="primary"
          >
            <b style={{ color: "white" }}> I am a Buyer</b>
          </Button>

          <div style={{ display: "flex", flexDirection: "row", padding: "10px", marginTop: 10 }}>
            <hr
              style={{ padding: "px", width: "255px", marginTop: 10, marginRight: 6 }}
              size="3"
              color="black"
            ></hr>
            <b style={{}}>Or</b>
            <hr
              style={{ padding: "px", width: "255px", marginTop: 10, marginLeft: 6 }}
              size="3"
              color="black"
            ></hr>
          </div>

          <Button
            className="button"
            onClick={() => navigate("/sellerlogin")}
            style={{
              padding: "10px",
              marginTop: 10,

              color: "white",
              backgroundColor: "var(--primary-color)",
            }}
            variant="contained"
            color="primary"
          >
            <b style={{ color: "white" }}> I am a Seller</b>
          </Button>

          <div style={{ display: "flex", flexDirection: "row", padding: "10px", marginTop: 10 }}>
            <hr
              style={{ padding: "px", width: "255px", marginTop: 10, marginRight: 6 }}
              size="3"
              color="black"
            ></hr>
            <b style={{}}>Or</b>
            <hr
              style={{ padding: "px", width: "255px", marginTop: 10, marginLeft: 6 }}
              size="3"
              color="black"
            ></hr>
          </div>
          <Button
            className="button"
            onClick={() => navigate("/logindelivery/delivery")}
            style={{ padding: "10px", marginTop: 10, backgroundColor: "#a4b0be" }}
            variant="contained"
            color="primary"
          >
            <b style={{ color: "white" }}> I am a Delivery Agent </b>
          </Button>
        </div>

        {/* <Button onClick={()=>navigate("/login")} className="big" style={{padding:"10px",backgroundColor:"var(--primary-color)"}} variant="contained" color="primary">
                I am a Buyer

            </Button>
            {/* <div style={{display:'flex',flexDirection:'row'}}>
            <hr style={{padding:"px",width:300}} size="3" color='black' ></hr>
<b>Or</b>
</div> */}

        {/* <Button style={{marginTop:25}} onClick={()=>navigate("/sellerlogin")} className="big" style={{padding:"10px",backgroundColor:"var(--primary-color)"}} variant="contained" color="primary">
                I am a Seller
            </Button>
            <b>Or</b>
            <Button  style={{marginTop:25}}  onClick={()=>navigate("/logindelivery/delivery")} className="big" style={{padding:"10px",backgroundColor:"var(--primary-color)"}} variant="contained" color="primary">
                I am a Delivery agent
            </Button>  */}

        <div className="onboarding-bottom-third">
          <p className="para-semiBold">Don't have an account?</p>
          <p className="linkText">
            <Link className="linkStyle" to="/category">
              SignUp Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCategory;
