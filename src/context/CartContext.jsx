import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext(null);

const STORAGE_KEY = "cart_op";

// refresh doesn't wipe data
const loadInitialCart = () => {
  try {
    const savedKey = localStorage.getItem(STORAGE_KEY);
    return savedKey ? JSON.parse(savedKey) : [];
  } catch (err) {
    console.error("Failed to read cart data: ", err);
    return [];
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existsProduct = state.find((item) => item.id === action.payload.id);

      if (existsProduct) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;

      // if quantity droped to 0 or less than 0 it will remove the item
      if (quantity <= 0) {
        return state.filter((item) => item.id !== id);
      }

      return state.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );
    }

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItem, dispatch] = useReducer(cartReducer, [], loadInitialCart);

  // whenever cart changes sync with local storage

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItem));
    } catch (err) {
      console.error("Failed to save item: ", err);
    }
  }, [cartItem]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{ cartItem, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
