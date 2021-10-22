import { useEffect,createContext,useReducer,useContext } from "react";
import {useAuth} from "./authContext"
import axios from "axios"
 const CartContext = createContext();


const CartProvider=({children})=>
{
    const {user,token} = useAuth();
   
    useEffect(()=>
    {
        
     (()=>
     {
       console.log(user,"in cart context")
       if(user)
       dispatch({type:"setCart",payload:user.cartItems})
      
     })()
    },[user])
    const [state,dispatch] = useReducer(reducer,{itemsInCart:[],quantity:0,token})
    return (
        <CartContext.Provider value={{dispatch,itemsInCart:state.itemsInCart,quantity:state.quantity}}>
            {children}
        </CartContext.Provider>
    )
}

function reducer(state,action)
{
    switch (action.type) {
        case "Add":
            const token = state.token;
            const id=action.payload.id;
            
            ((async()=>
            {
                try
                {
                   const response =  await axios.post("https://tranquil-escarpment-64779.herokuapp.com/product/"+id,{Credentials:"include"},{headers:{"x-access-token":token}})
                   console.log(response)
                }
                catch(error)
                {
                    console.log(error)
                }
                
            }))()
          
            return {...state,itemsInCart:[...state.itemsInCart,action.payload]}


        case "Increase" :
         return {...state,itemsInCart:[...state.itemsInCart.map(item=>
            {
                if(item.id===action.payload.id)
                return {...item,quantity:Number(item.quantity)+1}
                return item
            })]};

        // return {...state,quantity:state.quantity+1}


        case "Decrease" :
            return {...state,itemsInCart:[...state.itemsInCart.map(item=>
                {
                    if(item.id===action.payload.id)
                    return {...item,quantity:Number(item.quantity)-1}
                    return item
                })]};

            // return {...state,quantity:state.quantity-1}
        case  "setCart" :
                return {...state,itemsInCart:action.payload}
        default:
            return state
    }
}

export const useCart=()=>
{
    return useContext(CartContext);
}

export default CartProvider