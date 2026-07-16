import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItemRow from "../components/CartItemRow";
import CheckoutModal from "../components/CheckoutPopUp";
import Navbar from "../components/Navbar";
import OrderSummary from "../components/OrderSummary";
import useCart from "../hooks/useCart";
import { postOrder } from "../lib/api";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkoutSummary, setCheckoutSummary] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const cartCount =
    cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const handleCheckout = (summary) => {
    setCheckoutSummary(summary);
    setSubmitError("");
    setIsModalOpen(true);
  };

  console.log(cartItems);

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await postOrder({
        items: cartItems?.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      });

      clearCart();
      setIsModalOpen(false);
      navigate("/order-confirmed");
    } catch (err) {
      console.error("Failed to place order:", err);
      setSubmitError(
        "Something went wrong placing your order. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar cartCount={cartCount || 0} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-['Fraunces'] text-3xl text-[#211F1A] mb-8">
          Your cart
        </h1>

        {cartItems?.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#211F1A]/20 rounded-lg">
            <ShoppingBag className="w-10 h-10 mx-auto text-[#211F1A]/30 mb-3" />
            <p className="text-[#211F1A]/60 mb-4">Your cart is empty.</p>
            <Button
              className="bg-[#211F1A] hover:bg-[#B4491F]"
              onClick={() => navigate("/")}
            >
              Browse menu
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-2">
              {cartItems?.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <div>
              <OrderSummary cartItems={cartItems} onCheckout={handleCheckout} />
            </div>
          </div>
        )}
      </div>

      <CheckoutModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        summary={checkoutSummary}
        onConfirm={handleConfirmOrder}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    </>
  );
};

export default Cart;
