import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../lib/api";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getProducts();
        setFeaturedProducts(data.products);
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError("Failed to load menu items.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const handleAddToCart = (product) => {
    setCartCount((prev) => prev + 1);
    // Real add-to-cart logic hooks into useCart() here
  };

  return (
    <>
      <Navbar cartCount={cartCount} />
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#211F1A]">
            Products
          </h2>
        </div>

        {loading ? (
          <p className="text-center text-[#211F1A]/50 py-12">Loading menu...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-12">{error}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
