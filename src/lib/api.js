import axios from "axios";


export const getProducts = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/products");
    return res.data;
    
  } catch (err) {
    console.log(`Error ${err}`)
    
  }
  
};


export const searchProducts = async (query) =>{
  try{
      const searchRes = await axios.get("https://dummyjson.com/products/search",{params: {q: query}})
      return searchRes.data;

    } catch(err){
      console.log(`Error ${err}`)
    }
  
}


export const getCategories = async () =>{
  try{
      const categoryRes = await axios.get("https://dummyjson.com/products/categories")

      return categoryRes.data;
      
    } catch(err){
      console.log(`Error ${err}`)
    }
}


export const getProductsByCategory = async (category) =>{
  try{
      const productByCatRes = await axios.get(`https://dummyjson.com/products/category/${category}`)
      return productByCatRes.data;

    } catch(err){
      console.log(`Error ${err}`)
    }
  
}