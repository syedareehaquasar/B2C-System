import "./App.css";
import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Signup from "./buyer/Signup";
import Home from "./buyer/Home";
import Login from "./buyer/Login";
import Onboarding from "./buyer/Onboarding";
import PrivateRoute from "./buyer/PrivateRoute";
import UserCategory from "./buyer/UserCategory";
import Logout from "./buyer/Logout";
import Sellersignup from "./Seller/Sellersignup";
// import Myorder from "./buyer/Myorder(not using)";
import Mystock from "./Seller/Mystock";
// import Payment from "./buyer/Payment";
import Payment from "./buyer/Payment-temp";
import AddStock from "./Seller/AddStock";
import UpdateStock from "./Seller/UpdateStock";
import Orderdetails from "./Seller/Orderdetails";
import Staff from "./Seller/Staff";
import StaffRegister from "./Seller/StaffRegister";
import StaffAssigned from "./Seller/StaffAssigned";
import LoginDelivery from "./Delivery/Logindelivery";
import DeliveryDashboard from "./Delivery/Deliverydashboard";
import Productdetails from "./Seller/productrdetails";
import Orderstatus from "./Seller/orderstatus";
import Categories from "./buyer/Categories";
import Product from "./buyer/Product";
import Task from "./Task";
import SellerOrderDetails from "./Seller/SellerOrderDetails";
import MyOrders from "./buyer/MyOrders";
import Otp from "./buyer/Otp";
import Sellerlogin from "./Seller/Sellerlogin";
import HomeLanding from "./buyer/HomeLanding";
import Shop from "./buyer/Shop";

import { useAuth } from "./contexts/authContext";
function App(props) {
  const { token } = useAuth();
  console.log("token value", token);

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/">
          <Route path="/" element={<Onboarding />}></Route>
          <Route path="/category" element={<UserCategory />} />
        </Route>
        <Route path="/signup/:category" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/sellersignup" element={<Sellersignup />} />
        {/* <Route path="/myorder/*" element={<Myorder />} /> */}
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/mystock" element={<Mystock />} />
        <Route path="/home/product/:prodId" element={<Product />} />
        <Route path="/payment/:buyerId" element={<Payment />} />
        <Route path="/addstock" element={<AddStock />} />
        <Route path="/updatestock/:stockId" element={<UpdateStock />} />
        <Route path="/orderdetails" element={<Orderdetails />} />
        <Route path="/sellerOrderDetails/:id" element={<SellerOrderDetails />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/addstaff" element={<StaffRegister />} />
        <Route path="/staffdetails" element={<StaffAssigned />} />
        <Route path="/logindelivery/:category" element={<LoginDelivery />} />
        <Route path="/deliverydashboard" element={<DeliveryDashboard />} />
        <Route path="/productdetails/:orderId" element={<Productdetails />} />
        <Route path="/orderstatus" element={<Orderstatus />} />
        <Route path="/header" element={<Task />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/sellerlogin" element={<Sellerlogin />} />
        <Route path="/otp" element={<Otp />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/">
          <Route path="/" element={<Onboarding />}></Route>
          <Route path="/category" element={<UserCategory />} />
        </Route>
        {/* <Route path="/home/*" element={<Home />} /> */}
        <Route path="/signup/:category" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/sellersignup" element={<Sellersignup />} />
        {/* <Route path="/myorder/*" element={<Myorder />} /> */}
        <Route path="/logindelivery/:category" element={<LoginDelivery />} />
        <Route path="/header" element={<Task />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/sellerlogin" element={<Sellerlogin />} />
        <Route path="/otp" element={<Otp />} />
        <Navigate to="/ " />
      </Routes>
    );
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}> {routes}</Suspense>
    </>
  );
}

export default App;
