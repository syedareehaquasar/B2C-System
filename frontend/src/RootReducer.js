

const initialState={
    cart:{},
    client:{},
     
}

export default function RootReducer(state=initialState,action){
 switch(action.type)
 {
//      case "ADD_CLIENT":
//  state.client[action.payload[0]]=action.payload[1]
 
//  return {cart:state.cart,client:state.client}

   case "ADD_ITEM":
       state.cart[action.payload[0]]=action.payload[1]
       console.log("cart working",state.cart)
       return {cart:state.cart,client:state.client}
   case "REMOVE_ITEM":
        delete state.cart[action.payload]
        console.log(state.cart)
        return {cart:state.cart,client:state.client}
     


   default:
       return state    
 }

}