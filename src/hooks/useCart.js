import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const useCart = () =>{
    const context = useContext(CartContext)
    if(!context) throw new Error("Error Found at Context");
    return context;    
}

export default useCart;
