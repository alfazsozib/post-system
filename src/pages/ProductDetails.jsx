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
        <p className="py-24 text-center text-muted-foreground">
          Loading product...
        </p>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar cartCount={cartCount} />
        <div className="py-24 text-center">
          <p className="mb-4 text-red-500">{error || "Product not found."}</p>
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

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={images?.[0] || thumbnail}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              {category}
            </span>

            <h1 className="mb-3 font-['Fraunces'] text-3xl text-foreground">
              {title}
            </h1>

            <div className="mb-4 flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />

              <span className="text-sm text-muted-foreground">{rating}</span>

              <span className="ml-2 text-sm text-muted-foreground">
                {isOutOfStock ? "Out of stock" : `${stock} in stock`}
              </span>
            </div>

            <p className="mb-6 text-muted-foreground">{description}</p>

            <p className="mb-6 text-2xl font-medium text-foreground">
              {formatPrice(price)}
            </p>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-md border border-border bg-background px-3 py-1.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  disabled={isOutOfStock}
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="w-4 text-center text-sm text-foreground">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                  aria-label="Increase quantity"
                  disabled={isOutOfStock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                className="flex-1"
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
