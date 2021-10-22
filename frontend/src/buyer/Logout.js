import React,{useEffect} from 'react'
import { useAuth } from '../contexts/authContext'
import { useNavigate } from "react-router-dom"
import HomeLanding from './HomeLanding';
import Navigation from './Navigation';
import {Routes,Route} from "react-router-dom"
import Shop from "./Shop"
import Product from "./Product"
import Cart from "./Cart"
import SellerDashBoard from "../Seller/SellerDashBoard"
const Home = () => {
const {signOut,role} = useAuth();
const navigate = useNavigate();



async function clickHandler(){

    try{
        await signOut();
        navigate("/")

    }catch{
        console.log("not logout")
    }
    

}

useEffect(function(){
clickHandler()
},[])

    return (
        <div>
            <Navigation/>
            <Routes>
                {role==="buyer" && <Route path="/" element={<HomeLanding/>} />}
                {role==="seller" && <Route path="/*" element={<SellerDashBoard/>} />}
                <Route path="/shop/:id" element={<Shop/>} />
                <Route path="/product/:id" element={<Product/>} />
                <Route path="/cart" element={<Cart/>} />
            </Routes> 
            {/* Home */}
            {/* <button onClick={clickHandler}>Sign out</button> */}
        </div>
    )
}

export  default Home