export const VAT_RATE = 0.05;


const coupons = {
    SAVE10: {type: "percent", value: 0.1},
    SAVE20: {type: "percent", value: 0.2},
    WELCOME: {type: "flat", value: 6}
};

export const calculateSubtotal = (cartItems) => {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
};
 
export const calculateVAT = (subtotal) => {
  return subtotal * VAT_RATE;
};
 

export const applyCoupon = (code, subtotal) => {
  if (!code) {
    return { discount: 0, error: "" };
  }
 
  const coupon = coupons[code.trim().toUpperCase()];
 
  if (!coupon) {
    return { discount: 0, error: "Invalid coupon code." };
  }
 
  const discount =
    coupon.type === "percent" ? subtotal * coupon.value : coupon.value;
 
  // Never let a flat discount exceed the subtotal
  return { discount: Math.min(discount, subtotal), error: "" };
};
 
export const calculateGrandTotal = (subtotal, vat, discount) => {
  return Math.max(subtotal + vat - discount, 0);
};
 
export const formatPrice = (amount) => {
  return `$${amount.toFixed(2)}`;
};