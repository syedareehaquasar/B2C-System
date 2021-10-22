import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../config/firebase";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const {
    isUserLogIn,
    token: savedToken,
    role: Role,
  } = JSON.parse(localStorage?.getItem("login")) || { isUserLogIn: false, token: null, role: "" };
  const [isUserLoggedIn, setUserLoggedIn] = useState(isUserLogIn);
  const [token, setToken] = useState(savedToken);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(Role);

  useEffect(() => {
    (async () => {
      if (token && role === "buyer") {
        try {
          const buyerResp = await axios.get(
            "https://tranquil-escarpment-64779.herokuapp.com/buyer",
            { headers: { "x-access-token": token } }
          );
          const re = await axios.get(
            "https://tranquil-escarpment-64779.herokuapp.com/cart/products",
            { headers: { "x-access-token": token } }
          );
          console.log(buyerResp);
          const user = { ...buyerResp.data, cartItems: re.data };
          console.log(re);
          setUser(user);
        } catch (error) {
          console.log(error);
        }
      } else {
        setUser("seller");
      }
    })();
  }, [token, role]);

  const SellersignUp = async (
    fullname,
    password,
    confirmPassword,
    email,
    phone,
    shopAddress,
    shopName,
    description
  ) => {
    console.log(
      fullname,
      password,
      confirmPassword,
      email,
      phone,
      shopAddress,
      shopName,
      description
    );

    try {
      const response = await axios.post(`http://localhost:5000/sellerAuth/signup`, {
        fullname,
        password,
        confirmPassword,
        email,
        phone,
        shopAddress,
        shopName,
        description,
      });
      console.log(response);
      if (response.status === 200) {
        localStorage?.setItem(
          "login",
          JSON.stringify({ isUserLogIn: true, token: response.data.token })
        );
        setUserLoggedIn(true);
        setToken(response.data.token);
        setRole(response.data.result.role);
      }
    } catch (error) {
      console.log(error.response.data.message, "singup error");
      alert(error.response.data.message);
    }
  };

  const signUp = async (
    fullname,
    password,
    confirmPassword,
    email,
    phone,
    shopAddress,
    shopName
  ) => {
    try {
      const response = await axios.post(`http://localhost:5000/buyerAuth/signup `, {
        fullname,
        password,
        confirmPassword,
        email,
        phone,
        shopAddress,
        shopName,
      });
      console.log(response);
      if (response.status === 200) {
        localStorage?.setItem(
          "login",
          JSON.stringify({ isUserLogIn: true, token: response.data.token })
        );
        setUserLoggedIn(true);
        setToken(response.data.token);
        setRole(response.data.result.role);
      }
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const signIn = async (phone, password) => {
    try {
      const response = await axios.post("http://localhost:5000/buyerAuth/signin ", {
        phone,
        password,
      });
      console.log(response);
      alert(JSON.stringify(response.data.token));
      if (response.status === 200) {
        localStorage?.setItem(
          "login",
          JSON.stringify({
            isUserLogIn: true,
            token: response.data.token,
            role: response.data.result.role,
          })
        );
        setUserLoggedIn(true);
        setToken(response.data.token);
        setRole(response.data.result.role);
      }
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
      window.location.reload();
    }
  };

  const sellersignIn = async (phone, password) => {
    try {
      const response = await axios.post("http://localhost:5000/sellerAuth/signin", {
        phone,
        password,
      });

      alert(JSON.stringify(response.data.token));
      if (response.status === 200) {
        localStorage?.setItem(
          "login",
          JSON.stringify({
            isUserLogIn: true,
            token: response.data.token,
            role: response.data.result.role,
          })
        );
        setUserLoggedIn(true);
        setToken(response.data.token);
        setRole(response.data.result.role);
      }
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
      window.location.reload();
    }
  };

  const delivererSignIn = async (phone, fullname) => {
    try {
      const response = await axios.post("http://localhost:5000/deliveryAuth/signin", {
        phone,
        fullname,
      });

      alert(JSON.stringify(response.data.token));
      if (response.status === 200) {
        localStorage?.setItem(
          "login",
          JSON.stringify({
            isUserLogIn: true,
            token: response.data.token,
            role: response.data.result.role,
          })
        );
        setUserLoggedIn(true);
        setToken(response.data.token);
        setRole(response.data.result.role);
      }
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const signOut = () => {
    localStorage?.removeItem("login");
    setUserLoggedIn(false);
    setToken(null);
    setUser({});
    setRole("");
  };
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unSubscribe;
  }, []);
  const value = {
    user,
    signUp,
    signIn,
    signOut,
    isUserLoggedIn,
    token,
    role,
    sellersignIn,
    SellersignUp,
    delivererSignIn,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
