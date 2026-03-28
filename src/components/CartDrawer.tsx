import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function CartDrawer() {
  const { cartItems, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button aria-label="Cart" className="relative transition-transform hover:scale-105">
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in">
              {cartCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md border-l-secondary/20 bg-card/95 backdrop-blur-xl p-4 sm:p-6" style={{ height: '100dvh' }}>
        <SheetHeader className="px-1 text-left">
          <SheetTitle className="flex items-center gap-2 font-display text-2xl font-bold italic">
            <ShoppingBag className="text-primary" /> Your Bag
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col overflow-hidden">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-4 opacity-60">
              <div className="rounded-full bg-secondary/20 p-6">
                <ShoppingBag size={48} className="text-secondary" />
              </div>
              <p className="font-body text-lg font-medium">Your bag is empty</p>
            </div>
          ) : (
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-6 pt-6 -mx-1 px-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="group flex gap-3 sm:gap-4 animate-fade-in relative">
                    <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl border border-secondary/10 bg-secondary/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div className="space-y-1 pr-6 sm:pr-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between items-start">
                          <h4 className="font-display text-sm font-bold leading-tight line-clamp-2">{item.name}</h4>
                          <p className="font-body text-sm font-bold text-primary mt-1 sm:mt-0">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="font-body text-xs text-muted-foreground uppercase tracking-widest">{item.shape}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3 sm:mt-2">
                        <div className="flex items-center gap-1.5 rounded-full border border-secondary/20 bg-secondary/5 p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="flex h-7 w-7 sm:h-6 sm:w-6 items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 sm:w-8 text-center font-body text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="flex h-7 w-7 sm:h-6 sm:w-6 items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors absolute sm:static top-1 right-1 sm:top-auto sm:right-auto p-2 sm:p-0"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="space-y-4 pt-4 mt-auto">
            <Separator />
            <div className="space-y-1.5 px-1">
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between font-display text-xl sm:text-2xl font-bold pt-2">
                <span>Total</span>
                <span className="text-primary">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <SheetFooter className="mt-4 pb-4 sm:pb-0">
              <Button 
                onClick={() => navigate("/checkout")}
                className="w-full rounded-full bg-primary py-7 sm:py-6 font-display text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Proceed to Checkout
              </Button>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
