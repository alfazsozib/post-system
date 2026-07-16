import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatPrice } from "../../lib/cartUtils";

const CheckoutPopUp = ({
  open,
  onOpenChange,
  summary,
  onConfirm,
  isSubmitting,
  submitError,
}) => {
  if (!summary) return null;

  const { subtotal, vat, discount, grandTotal } = summary;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#FAF7F0]">
        <DialogHeader>
          <DialogTitle className="font-['Fraunces'] text-xl text-[#211F1A]">
            Confirm your order
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm py-2">
          <div className="flex justify-between text-[#211F1A]/70">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-[#211F1A]/70">
            <span>VAT</span>
            <span>{formatPrice(vat)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-[#4B5D46]">
              <span>Discount</span>
              <span>-{formatPrice(discount)}</span>
            </div>
          )}
          <div className="flex justify-between font-medium text-[#211F1A] border-t border-[#211F1A]/10 pt-2 mt-2">
            <span>Grand total</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>
        </div>

        {submitError && <p className="text-sm text-red-500">{submitError}</p>}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#211F1A] hover:bg-[#B4491F]"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing order..." : "Confirm order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutPopUp;
