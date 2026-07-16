import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "../lib/utils";

const CartItemRow = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-background/10">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-16 h-16 rounded object-cover bg-background/5"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-forground truncate">
          {item.title}
        </p>
        <p className="text-xs text-forground/60">
          {formatPrice(item.price)} each
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          className="h-7 w-7"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          aria-label={`Decrease quantity of ${item.title}`}
        >
          <Minus className="w-3.5 h-3.5" />
        </Button>

        <span className="w-6 text-center text-sm">{item.quantity}</span>

        <Button
          size="icon"
          variant="outline"
          className="h-7 w-7"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          aria-label={`Increase quantity of ${item.title}`}
        >
          <Plus className="w-3.5 h-3.5" />
        </Button>
      </div>

      <span className="text-sm font-medium text-forground w-16 text-right">
        {formatPrice(item.price * item.quantity)}
      </span>
      <button
        onClick={() => onRemove(item.id)}
        className="text-forground/40 hover:text-red-500 transition-colors"
        aria-label={`Remove ${item.title} from cart`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CartItemRow;
