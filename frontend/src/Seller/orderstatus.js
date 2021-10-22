import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useCart } from '../contexts/cartContext'
import {useParams} from "react-router-dom"
import { useAuth } from '../contexts/authContext'
import NumericInput from 'react-numeric-input';

import {useDispatch,useSelector} from "react-redux"
import Button  from '@material-ui/core/Button'

const Product = () => {
    const {quantity,dispatch} = useCart()
    const [product,setProduct] = useState([])
    const {id} = useParams()
    const {token} = useAuth()

    const [refresh,setRefresh]=useState(false)

    const [getQty,setQty]=useState(1)
    var Reduxdispatch=useDispatch()

    console.log("nanaji",getQty)

const handelincrement=()=>{
   var c= getQty+1
   setQty(c)
}
const handeDecrement=()=>{
    if (getQty >= 2) {
    var c= getQty-1
    setQty(c)
    }
 }
 

    const handleAddToCart=(item)=>{

console.log("lila",product)

        // setQty(getQty);
        product.qtydemand=getQty;
        Reduxdispatch({type:'ADD_ITEM',payload:[product.id,product]})
      // props.navigation.setParams({x:""})
        setRefresh(!refresh)
      
      }
      


    useEffect(async() => {

        
        try
        {
            const response = await axios.get("https://tranquil-escarpment-64779.herokuapp.com/product/"+id,{headers:{"x-access-token":token}})
         
            if(response.status===200)
            {
                setProduct(response.data)
            }

        }catch(error)
        {
            console.log(error.response.data.message)
        }
       
    }, [id])



    return (
        <>


        <div style={{position:'fixed',alignSelf:'center',fontSize:22,marginLeft:350,fontWeight:'bold',display:'flex',justifyContent:'center',alignItems:'center'}}>Order Details</div>
         

        <div className="shopName" >
          <h2>
            R.N Enterprises Pvt Ltd
          </h2>
          <div className="whatsapp">
          <img src={require("../images/whatsappicon.png").default} alt="" /> 
          <span>Call Seller</span>
          </div>
      </div>
      <div>
          <h3 style={{fontSize:"1rem",marginTop:20,marginLeft:10}}>Update order Status</h3>
          <div style={{marginTop:5,padding:5,color:'white'}}>
          
          <Button variant="contained" color="primary">
          <b style={{color:'white'}}>Dispatched</b>
</Button>

          </div>
         



          <div style={{ background: "#9AECDB",marginTop:30,width:900}}>
<font color='' style={{color:'',marginLeft:20}}>total 2 Items</font> <b style={{marginLeft:800}}>INR 1400</b>
<br></br>
A product description is the marketing copy that explains what a product is and why it's worth purchasing. The purpose of a product description is to supply customers with important information about the features and benefits of the product so they're compelled to buy.

 
     </div>
        <div style={{marginTop:30}} >
            Order:#1234567890 <b style={{marginLeft:800}}>12/04/2021</b>
<div style={{marginTop:30,display:'flex',justifyContent:'center',alignItems:'center',width:900}}>

<img style={{display:'flex',justifyContent:'center',alignItems:'center'}} src="/2.png"></img>


</div>

      </div>
</div>



        </>
        
    )
}

export default Product
