import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Star, Heart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProductModalProps {
  id: string;
  name: string;
  shape: string;
  price: number;
  salePrice?: number;
  priceRange?: string;
  images: string[];
  rating: number;
  description?: string;
  onClose: () => void;
}

const ProductModal = ({ id, name, shape, price, salePrice, priceRange, images, rating, description, onClose }: ProductModalProps) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [liked, setLiked] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const prev = () => setCurrentImg((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrentImg((i) => (i === images.length - 1 ? 0 : i + 1));

  const handleAddToCart = () => {
    addToCart({ id, name, shape, price: salePrice || price, image: images[0] });
    onClose();
  };

  const handleBuyNow = () => {
    onClose();
    navigate("/checkout", { state: { isDirectBuy: true, customItem: { id, name, shape, price: salePrice || price, image: images[0] } } });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-3xl animate-fade-up overflow-hidden rounded-2xl bg-card shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image gallery */}
          <div className="relative aspect-square bg-muted">
            <img
              src={images[currentImg]}
              alt={`${name} - photo ${currentImg + 1}`}
              className="h-full w-full object-cover"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>

                {/* Thumbnails */}
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImg(i)}
                      className={`h-12 w-12 overflow-hidden rounded-lg border-2 transition-all ${
                        i === currentImg ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center p-6 md:p-8">
            <div className="flex items-center gap-2">
              <Star size={14} className="fill-secondary text-secondary" />
              <span className="font-body text-sm font-semibold text-foreground">{rating}</span>
            </div>

            <h2 className="mt-2 font-display text-2xl font-bold text-card-foreground md:text-3xl">{name}</h2>
            <p className="mt-1 font-body text-sm text-muted-foreground">{shape} shape</p>

            <div className="mt-4 flex items-baseline gap-3">
              {priceRange ? (
                <span className="font-body text-2xl font-bold text-foreground">{priceRange}</span>
              ) : salePrice ? (
                <>
                  <span className="font-body text-2xl font-bold text-primary">${salePrice.toFixed(2)}</span>
                  <span className="font-body text-lg text-muted-foreground line-through">${price.toFixed(2)}</span>
                </>
              ) : (
                <span className="font-body text-2xl font-bold text-foreground">${price.toFixed(2)}</span>
              )}
            </div>

            <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
              {description ?? "Handcrafted press-on nails designed by Gracie. Each set includes 10 nails, nail glue, and a mini file."}
            </p>

            <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
              <p className="font-body text-xs font-semibold text-primary">📸 Hand Photo Required at Checkout</p>
              <p className="mt-0.5 font-body text-xs text-muted-foreground">You'll be asked to upload a photo of your hand so Gracie can size your nails perfectly.</p>
            </div>

            <div className="mt-8 flex gap-3">
              {name.toLowerCase().includes("custom") ? (
                <Button
                  onClick={handleBuyNow}
                  className="flex-1 rounded-full py-6 font-display text-lg font-bold shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95"
                >
                  BUY NOW
                </Button>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 rounded-full py-6 font-display text-lg font-bold shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95"
                >
                  ADD TO BAG
                </Button>
              )}
              <Button
                variant="outline"
                size="icon"
                className="h-auto w-14 shrink-0 rounded-full border-2"
                onClick={() => setLiked(!liked)}
              >
                <Heart
                  size={24}
                  className={`transition-colors ${liked ? "fill-red-500 text-red-500" : "text-foreground"}`}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
