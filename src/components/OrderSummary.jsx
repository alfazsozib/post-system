import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  applyCoupon,
  calculateGrandTotal,
  calculateSubtotal,
  calculateVAT,
  formatPrice,
} from "../lib/utils";

const OrderSummary = ({ cartItems, onCheckout }) => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCode, setAppliedCode] = useState("");
  const [couponError, setCouponError] = useState("");

  const subtotal = calculateSubtotal(cartItems);
  const vat = calculateVAT(subtotal);
  const { discount, error } = applyCoupon(appliedCode, subtotal);
  const grandTotal = calculateGrandTotal(subtotal, vat, discount);

  const handleApplyCoupon = () => {
    const { error: validationError } = applyCoupon(couponCode, subtotal);

    if (validationError) {
      setCouponError(validationError);
      setAppliedCode("");
      return;
    }

    setCouponError("");
    setAppliedCode(couponCode);
  };

  return (
    <div className="bg-[#FAF7F0] border border-[#211F1A]/10 rounded-lg p-5">
      <h2 className="font-['Fraunces'] text-lg text-[#211F1A] mb-4">
        Order summary
      </h2>

      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between text-[#211F1A]/70">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[#211F1A]/70">
          <span>VAT (5%)</span>
          <span>{formatPrice(vat)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-[#4B5D46]">
            <span>Coupon ({appliedCode.toUpperCase()})</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-2">
        <Input
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="text-sm"
        />
        <Button variant="outline" onClick={handleApplyCoupon}>
          Apply
        </Button>
      </div>
      {couponError && (
        <p className="text-xs text-red-500 mb-2">{couponError}</p>
      )}

      <div className="flex justify-between items-center border-t border-[#211F1A]/10 pt-4 mb-4">
        <span className="font-medium text-[#211F1A]">Total</span>
        <span className="font-medium text-lg text-[#211F1A]">
          {formatPrice(grandTotal)}
        </span>
      </div>

      <Button
        className="w-full bg-[#211F1A] hover:bg-[#B4491F]"
        disabled={cartItems?.length === 0}
        onClick={() =>
          onCheckout({ subtotal, vat, discount, grandTotal, appliedCode })
        }
      >
        Checkout
      </Button>
    </div>
  );
};

export default OrderSummary;
