import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Plus, Star } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const { title, price, thumbnail, rating, stock, category } = product;
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;

  return (
    <Card className="overflow-hidden border-[#211F1A]/10 hover:shadow-md transition-shadow">
      <Link to={`/products/${product.id}`}>
        <div className="relative bg-[#211F1A]/5 aspect-square">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-2 left-2 bg-[#FAF7F0] text-[#211F1A] hover:bg-[#FAF7F0]">
            {category}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-sm text-[#211F1A] line-clamp-1 mb-1">
            {title}
          </h3>

          <div className="flex items-center justify-between text-xs text-[#211F1A]/60">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#C99A2E] text-[#C99A2E]" />
              <span>{rating}</span>
            </div>

            {isOutOfStock ? (
              <Badge variant="destructive" className="text-[10px]">
                Out of stock
              </Badge>
            ) : isLowStock ? (
              <span className="text-[#B4491F]">Only {stock} left</span>
            ) : (
              <span>{stock} in stock</span>
            )}
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="font-medium text-[#211F1A]">${price}</span>
        <Button
          size="sm"
          disabled={isOutOfStock}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="bg-[#211F1A] hover:bg-[#B4491F]"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
