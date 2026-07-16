import { createContext } from 'react';


export const CartContext = createContext(null);

const STORAGE_KEY = "cart_op"

// refresh doesn't wipe data 
const loadInitialCart = () =>{
    try {
        const savedKey = localStorage.getItem(STORAGE_KEY)
        return savedKey ? JSON.parse(savedKey) : []
    } catch (err) {
        console.error("Failed to read cart data: ", err)
        return []
    }
};

const cartReducer = (state, action) =>{
    switch (action.type) {
        case "ADD_ITEM": {
            const existsProduct = state.find((item) => item.id === action.payload.id);

            if (existsProduct) {
                return state.map((item) =>
                item.id === action.payload.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
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
                item.id === id ? { ...item, quantity } : item
            );
            }
        
            case "CLEAR_CART":
            return [];
        
        default:
            break
    }
}
