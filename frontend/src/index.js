import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./contexts/authContext";
import CartProvider from "./contexts/cartContext";
import { createStore } from "redux";
import { Provider } from "react-redux";
import RootReducer from "./RootReducer";
const store = createStore(RootReducer);
// import store from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <App />
          </Router>
        </CartProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
