import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useCart } from '../contexts/cartContext'
import {useParams} from "react-router-dom"
import { useAuth } from '../contexts/authContext'
import NumericInput from 'react-numeric-input';

import {useDispatch,useSelector} from "react-redux"
import { Button } from '@material-ui/core'

const Product = () => {
    const {quantity,dispatch} = useCart()
    const [product,setProduct] = useState([])
    const {id} = useParams()
    const {token} = useAuth()

    const [refresh,setRefresh]=useState(false)

    const [getQty,setQty]=useState(1)
    var Reduxdispatch=useDispatch()

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


        <div style={{position:'fixed',alignSelf:'center',fontSize:22,marginLeft:350,fontWeight:'bold',display:'flex',justifyContent:'center',alignItems:'center'}}>My Staff Details</div>
         

        <div className="shopName" >
          <h2 style={{marginTop:70,background: "#ecf0f1",width:807,marginTop:50,height:35,fontSize:19}}>
          Prakash Kumar
          </h2>
          <div className="whatsapp" style={{marginTop:50}} >
          <img src={require("../images/whatsappicon.png").default} alt="" /> 
          <span >Call Seller</span>
          </div>
      </div>
      <div>
          <div style={{display:'flex',flexDirection:'row'}}>
          <h3 style={{fontSize:"1rem",marginTop:0,marginLeft:10}}>#1234567890</h3>
          <div style={{color:'blue',display:'flex',alignItems:'flex-end',marginLeft:700}}>Dispached</div>
        
         </div>


          <div style={{ background: "#ecf0f1",marginTop:20,width:'900px',height:'40px',marginTop:20}}>
              <div style={{marginLeft:20,marginTop:30,fontSize:22}}>Assign Staff Member</div>
          </div>

          <div style={{ background: "#9AECDB",marginTop:30,width:900}}>
<font color='' style={{color:'',marginLeft:0}}>total 2 Items</font> <b style={{marginLeft:800}}>INR 1400</b>
<br></br>
A product description is the marketing copy that explains what a product is and why it's worth purchasing. The purpose of a product description is to supply customers with important information about the features and benefits of the product so they're compelled to buy.

 
     </div>
        <div style={{marginTop:30,background:'#ecf0f1'}} >
            Order:#1234567890 <b style={{marginLeft:800}}>12/04/2021</b>
<div style={{marginTop:30,display:'flex',justifyContent:'center',alignItems:'center',width:900}}>

<img style={{display:'flex',justifyContent:'center',alignItems:'center'}} src="/2.png"></img>


</div>
Door handed set of 2 <b style={{marginLeft:780}}>INR 270</b>
<br></br>
Status Dispached <b style={{marginLeft:800}}>Quantity 5</b>
      </div>

  
</div>


<div style={{marginTop:10,background:'#ecf0f1'}} >
            Order:#1234567890 <b style={{marginLeft:800}}>12/04/2021</b>
            </div>



        </>
        
    )
}

export default Product
