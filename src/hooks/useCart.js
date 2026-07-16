import { CartContext } from "@/context/cartContext";
import { useContext } from "react";

const useCart = () =>{
    const context = useContext(CartContext)
    if(!context) throw new Error("Error Found at Context");
    return context;    
}

export default useCart;
