import { Button } from "@/components/ui/button";
import { ArrowLeft, Minus, Plus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import useCart from "../hooks/useCart";
import { getProductById } from "../lib/api";
import { formatPrice } from "../lib/utils";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cartCount =
    cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load this product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    setQuantity(1);
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar cartCount={cartCount} />

        <p className="text-center text-[#211F1A]/50 py-24">
          Loading product...
        </p>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar cartCount={cartCount} />

        <div className="text-center py-24">
          <p className="text-red-500 mb-4">{error || "Product not found."}</p>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to menu
          </Button>
        </div>
      </>
    );
  }

  const {
    title,
    price,
    thumbnail,
    images,
    rating,
    stock,
    category,
    description,
  } = product;
  const isOutOfStock = stock === 0;

  return (
    <>
      <Navbar cartCount={cartCount} />
      <Hero />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-[#211F1A]/60 hover:text-[#B4491F] mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="aspect-square rounded-lg overflow-hidden bg-[#211F1A]/5">
            <img
              src={images?.[0] || thumbnail}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <span className="inline-block text-xs tracking-widest uppercase text-[#B4491F] font-semibold mb-2">
              {category}
            </span>

            <h1 className="font-['Fraunces'] text-3xl text-[#211F1A] mb-3">
              {title}
            </h1>

            <div className="flex items-center gap-1 mb-4">
              <Star className="w-4 h-4 fill-[#C99A2E] text-[#C99A2E]" />
              <span className="text-sm text-[#211F1A]/70">{rating}</span>
              <span className="text-sm text-[#211F1A]/40 ml-2">
                {isOutOfStock ? "Out of stock" : `${stock} in stock`}
              </span>
            </div>

            <p className="text-[#211F1A]/70 mb-6">{description}</p>

            <p className="text-2xl font-medium text-[#211F1A] mb-6">
              {formatPrice(price)}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3 border border-[#211F1A]/20 rounded-md px-3 py-1.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  disabled={isOutOfStock}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm w-4 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                  aria-label="Increase quantity"
                  disabled={isOutOfStock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                className="flex-1 bg-[#211F1A] hover:bg-[#B4491F]"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
              >
                {isOutOfStock ? "Out of stock" : "Add to cart"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
