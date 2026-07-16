import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import useCart from "../hooks/useCart";
import useDebounce from "../hooks/useDebounce";
import {
  getCategories,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "../lib/api";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { cartItems, addToCart } = useCart();

  console.log(cartItems);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const debouncedQuery = useDebounce(searchQuery, 300);

  // Load categories once for the filter dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Re-fetch products whenever the search query or category changes.
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        let data;

        if (debouncedQuery.trim()) {
          data = await searchProducts(debouncedQuery.trim());
        } else if (selectedCategory !== "all") {
          data = await getProductsByCategory(selectedCategory);
        } else {
          data = await getProducts();
        }

        setProducts(data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load menu items.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedQuery, selectedCategory]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <>
      <Navbar cartCount={cartCount} />
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <h2 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#211F1A]">
            Products
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#211F1A]/40" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="sm:w-48 border border-[#211F1A]/20 rounded-md px-3 py-2 text-sm bg-white text-[#211F1A]"
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-[#211F1A]/50 py-12">Loading menu...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-12">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-[#211F1A]/50 py-12">
            No products found. Try a different search or category.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default HomePage;
