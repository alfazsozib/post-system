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


