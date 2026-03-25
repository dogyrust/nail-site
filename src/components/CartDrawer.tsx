import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  const { cartItems, removeFromCart, updateQuantity, cartCount, cartTotal, clearCart } = useCart();
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({ name: '', email: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    // Simulate sending email and verifying order
    const promise = new Promise((resolve) => setTimeout(resolve, 2000));
    
    import("sonner").then(({ toast }) => {
      toast.promise(promise, {
        loading: 'Sending order to MOCK-EMAIL@example.com...',
        success: "Order placed successfully! We'll email you once we verify your deposit. 💜",
        error: 'Error processing order',
      });
      
      promise.then(() => {
        setIsSubmitting(false);
        setIsCheckoutStep(false);
        setCustomerDetails({ name: '', email: '', address: '' });
        clearCart();
      });
    });
  };

  return (
    <Sheet onOpenChange={(open) => !open && setIsCheckoutStep(false)}>
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
            <ShoppingBag className="text-primary" /> {isCheckoutStep ? 'Checkout' : 'Your Bag'}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col overflow-hidden">
          {cartItems.length === 0 && !isCheckoutStep ? (
            <div className="flex h-full flex-col items-center justify-center space-y-4 opacity-60">
              <div className="rounded-full bg-secondary/20 p-6">
                <ShoppingBag size={48} className="text-secondary" />
              </div>
              <p className="font-body text-lg font-medium">Your bag is empty</p>
            </div>
          ) : isCheckoutStep ? (
            <ScrollArea className="flex-1 px-1 mt-4">
              <div className="space-y-6 pb-6 pt-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Johnny Doey" 
                      value={customerDetails.name} 
                      onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})} 
                      className="text-base sm:text-sm h-12 sm:h-auto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="johnny@example.com" 
                      value={customerDetails.email} 
                      onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})} 
                      className="text-base sm:text-sm h-12 sm:h-auto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-semibold">Shipping Address</Label>
                    <Textarea 
                      id="address" 
                      placeholder="123 Nail Blvd, Beauty City, NY 10001" 
                      value={customerDetails.address} 
                      onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})} 
                      className="resize-none h-24 text-base sm:text-sm"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5 space-y-4">
                  <div>
                    <h4 className="font-display text-lg font-bold text-primary">Required: $10 Deposit</h4>
                    <p className="text-sm font-body text-muted-foreground mt-1 leading-relaxed">
                      To begin creating your custom set, please send a $10 deposit to our Venmo account. Your order will not begin until the deposit is received!
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center bg-background/80 p-3 rounded-lg border border-primary/10 overflow-hidden">
                    <span className="font-mono font-bold text-base sm:text-lg tracking-tight truncate">@MOCK-VENMO-HANDLE</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full bg-[#008CFF] text-white hover:bg-[#007add] border-none font-bold h-12" 
                    onClick={() => window.open('https://venmo.com', '_blank')}
                  >
                    Open Venmo App
                  </Button>
                </div>
              </div>
            </ScrollArea>
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

        {cartItems.length > 0 && !isCheckoutStep && (
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
                onClick={() => setIsCheckoutStep(true)}
                className="w-full rounded-full bg-primary py-7 sm:py-6 font-display text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Proceed to Checkout
              </Button>
            </SheetFooter>
          </div>
        )}

        {isCheckoutStep && (
          <div className="space-y-4 pt-4 mt-auto">
            <Separator />
            <div className="flex justify-between font-display text-xl sm:text-2xl font-bold px-1 pt-2">
              <span>Order Total</span>
              <span className="text-primary">${cartTotal.toFixed(2)}</span>
            </div>
            <SheetFooter className="px-1 pb-6 sm:pb-0 flex-col gap-3 mt-2">
              <Button 
                onClick={handleFinalSubmit}
                disabled={!customerDetails.name || !customerDetails.email || !customerDetails.address || isSubmitting}
                className="w-full rounded-full bg-primary py-7 sm:py-6 font-display text-lg sm:text-xl font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                I've Paid $10 & Submit
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setIsCheckoutStep(false)}
                className="w-full rounded-full h-12"
                disabled={isSubmitting}
              >
                Back to Cart
              </Button>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
