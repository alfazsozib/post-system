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
    <Card className="overflow-hidden border-border transition-shadow hover:shadow-md">
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square bg-muted">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover"
          />

          <Badge className="absolute left-2 top-2 bg-secondary text-secondary-foreground hover:bg-secondary">
            {category}
          </Badge>
        </div>

        <CardContent className="p-4">
          <h3 className="mb-1 line-clamp-1 text-sm font-medium text-foreground">
            {title}
          </h3>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
              <span>{rating}</span>
            </div>

            {isOutOfStock ? (
              <Badge variant="destructive" className="text-[10px]">
                Out of stock
              </Badge>
            ) : isLowStock ? (
              <span className="text-orange-500">Only {stock} left</span>
            ) : (
              <span>{stock} in stock</span>
            )}
          </div>
        </CardContent>
      </Link>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="font-medium text-foreground">${price}</span>

        <Button
          size="sm"
          disabled={isOutOfStock}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
