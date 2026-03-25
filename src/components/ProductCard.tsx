import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";

interface ProductCardProps {
  id: string;
  name: string;
  shape: string;
  price: number;
  salePrice?: number;
  image: string;
  rating: number;
  isNew?: boolean;
}

const ProductCard = ({ id, name, shape, price, salePrice, image, rating, isNew }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);
  const { addToCart } = useCart();

  return (
    <div className="group relative animate-fade-up overflow-hidden rounded-xl bg-card shadow-card transition-all duration-300 hover:shadow-card-hover">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={640}
          height={640}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        {isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 font-body text-xs font-bold uppercase tracking-wider text-secondary-foreground">
            New
          </span>
        )}
        {salePrice && (
          <span className="absolute left-3 top-3 rounded-full bg-destructive px-3 py-1 font-body text-xs font-bold text-destructive-foreground">
            {Math.round((1 - salePrice / price) * 100)}% OFF
          </span>
        )}
        {/* Wishlist */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-all hover:bg-card"
          aria-label="Add to wishlist"
        >
          <Heart
            size={16}
            className={liked ? "fill-destructive text-destructive" : "text-foreground/50"}
          />
        </button>
        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-card/80 px-2 py-1 backdrop-blur-sm">
          <Star size={12} className="fill-secondary text-secondary" />
          <span className="font-body text-xs font-semibold text-foreground">{rating}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display text-base font-semibold text-card-foreground">{name}</h3>
        <p className="mt-0.5 font-body text-xs text-muted-foreground">{shape}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {salePrice ? (
              <>
                <span className="font-body text-lg font-bold text-primary">${salePrice.toFixed(2)}</span>
                <span className="font-body text-sm text-muted-foreground line-through">${price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-body text-lg font-bold text-foreground">${price.toFixed(2)}</span>
            )}
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart({ id, name, price: salePrice || price, image, shape });
            }}
            className="rounded-full bg-primary px-4 py-2 font-body text-xs font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-105"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
