import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("Error Found at Context");

  const cartCount = context.cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return { ...context, cartCount };
};    


export default useCart;
