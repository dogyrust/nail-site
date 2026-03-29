import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Trash2, Plus, Minus, CreditCard, Camera, UploadCloud } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import sizingEx1 from "@/assets/sizing-example-1.jpg";
import sizingEx2 from "@/assets/sizing-example-2.jpg";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  
  // Support direct buy bypassing the cart
  const isDirectBuy = location.state?.isDirectBuy;
  const directBuyItem = location.state?.customItem;
  
  const activeItems = isDirectBuy && directBuyItem 
    ? [{ ...directBuyItem, quantity: 1 }] 
    : cartItems;
    
  const activeTotal = isDirectBuy && directBuyItem
    ? directBuyItem.price
    : cartTotal;
  const [customerDetails, setCustomerDetails] = useState({ name: '', email: '', address: '' });
  const [handPhoto, setHandPhoto] = useState<File | null>(null);
  const [customDescription, setCustomDescription] = useState('');
  const [inspoPhotos, setInspoPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if any item in the active list is the Custom Set
  const hasCustomSet = activeItems.some(item => item.id === "5" || item.name.toLowerCase().includes("custom"));

  // Redirect to home if no items
  if (activeItems.length === 0 && !isSubmitting) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center space-y-6">
        <h2 className="font-display text-3xl font-bold">Your bag is empty</h2>
        <Button onClick={() => navigate("/")} className="rounded-full px-8 py-6 font-bold">
          Continue Shopping
        </Button>
      </div>
    );
  }

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    // Create form data payload for FormSubmit
    const formData = new FormData();
    formData.append("_subject", `New Nail Order from ${customerDetails.name}`);
    formData.append("_captcha", "false");
    formData.append("Name", customerDetails.name);
    formData.append("Email", customerDetails.email);
    formData.append("Shipping Address", customerDetails.address);
    formData.append("Order Total", `$${activeTotal.toFixed(2)}`);
    
    // Format items
    const itemsList = activeItems.map(item => 
      `${item.quantity}x ${item.name} (${item.shape}) - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    formData.append("Items Ordered", itemsList);

    if (hasCustomSet) {
      formData.append("Custom Nail Description", customDescription);
    }

    if (handPhoto) {
      formData.append("Hand_Photo", handPhoto);
    }

    if (inspoPhotos.length > 0) {
      inspoPhotos.forEach((photo, index) => {
        formData.append(`Inspiration_Photo_${index + 1}`, photo);
      });
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/gracies.nails08@gmail.com", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        import("sonner").then(({ toast }) => {
          toast.success("Order placed successfully! We'll email you once we verify your deposit. 💜");
        });
        
        setIsSubmitting(false);
        setCustomerDetails({ name: '', email: '', address: '' });
        setHandPhoto(null);
        setCustomDescription('');
        setInspoPhotos([]);
        if (!isDirectBuy) {
          clearCart();
        }
        navigate("/");
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      import("sonner").then(({ toast }) => {
        toast.error("Error processing order. Please try again.");
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-6xl py-10 md:py-16">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 font-body text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ChevronLeft size={16} />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Checkout Form */}
        <div className="lg:col-span-7 space-y-10 animate-fade-up">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Checkout</h1>
            <p className="mt-2 text-muted-foreground font-body">Please fill out your details below to complete your order.</p>
          </div>

          <div className="space-y-6 bg-card rounded-2xl border border-border/50 p-6 md:p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
              Shipping Information
            </h2>
            
            <div className="space-y-4 pt-2">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Johnny Doey" 
                    value={customerDetails.name} 
                    onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})} 
                    className="h-12 bg-background"
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
                    className="h-12 bg-background"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-semibold">Shipping Address</Label>
                <Textarea 
                  id="address" 
                  placeholder="123 Nail Blvd, Beauty City, NY 10001" 
                  value={customerDetails.address} 
                  onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})} 
                  className="resize-none h-24 bg-background"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 bg-card rounded-2xl border border-border/50 p-6 md:p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
              Nail Sizing
            </h2>

            <div className="space-y-4 pt-2">
              <div className="space-y-3">
                <Label htmlFor="handPhoto" className="text-sm font-semibold flex items-center gap-2">
                  <Camera size={16} className="text-primary" />
                  Photo of Your Hand <span className="text-destructive">*</span>
                </Label>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Please send a clear photo of your hand (palm side up) flat on a table with a coin (like a quarter) next to it for scale. This helps Gracie size your nails perfectly!
                </p>
                
                {/* Sizing Example Photos */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="rounded-xl overflow-hidden border border-border">
                    <img src={sizingEx1} alt="Sizing example with coin" className="w-full h-auto object-cover aspect-square" />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-border">
                    <img src={sizingEx2} alt="Sizing example with coin" className="w-full h-auto object-cover aspect-square" />
                  </div>
                </div>

                <div className="relative mt-2">
                  <input
                    id="handPhoto"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setHandPhoto(e.target.files?.[0] ?? null)}
                  />
                  <label
                    htmlFor="handPhoto"
                    className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 transition-all ${
                      handPhoto
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-primary/5'
                    }`}
                  >
                    {handPhoto ? (
                      <>
                        <div className="rounded-full bg-primary/20 p-3">
                          <span className="text-xl">✅</span>
                        </div>
                        <span className="font-medium text-foreground truncate max-w-full px-4">{handPhoto.name}</span>
                        <span className="text-xs text-primary font-semibold uppercase tracking-wider">Change Photo</span>
                      </>
                    ) : (
                      <>
                        <div className="rounded-full bg-secondary/30 p-4">
                          <Camera size={24} className="text-secondary-foreground" />
                        </div>
                        <div className="text-center">
                          <span className="font-medium text-foreground block">Click to upload photo</span>
                          <span className="text-xs mt-1 block">JPG, PNG, HEIC up to 10MB</span>
                        </div>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {hasCustomSet && (
            <div className="space-y-6 bg-card rounded-2xl border border-border/50 p-6 md:p-8 shadow-sm">
              <h2 className="font-display text-xl font-bold flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                Custom Nail Details
              </h2>
              
              <div className="space-y-6 pt-2">
                <div className="space-y-3">
                  <Label htmlFor="customDesc" className="text-sm font-semibold">
                    What are you looking for? <span className="text-destructive">*</span>
                  </Label>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Describe your dream nails! Mention colors, themes, patterns, or specific designs you want. (Price will be finalized between $25-$40 based on complexity).
                  </p>
                  <Textarea 
                    id="customDesc" 
                    placeholder="E.g., I want an aura effect with hot pink and black, plus some silver star charms..." 
                    value={customDescription} 
                    onChange={(e) => setCustomDescription(e.target.value)} 
                    className="resize-none h-32 bg-background"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold flex items-center gap-2">
                    <UploadCloud size={16} className="text-primary" />
                    Inspiration Photos (Optional)
                  </Label>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Upload any pictures of designs, colors, or vibes you want to use as inspiration.
                  </p>
                  <div className="relative mt-2">
                    <input
                      id="inspoPhotos"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) {
                          setInspoPhotos(Array.from(e.target.files));
                        }
                      }}
                    />
                    <label
                      htmlFor="inspoPhotos"
                      className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-8 transition-all ${
                        inspoPhotos.length > 0
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-primary/5'
                      }`}
                    >
                      {inspoPhotos.length > 0 ? (
                        <>
                          <div className="rounded-full bg-primary/20 p-3">
                            <span className="text-xl">✅</span>
                          </div>
                          <span className="font-medium text-foreground text-center">
                            {inspoPhotos.length} {inspoPhotos.length === 1 ? 'photo' : 'photos'} selected
                          </span>
                          <span className="text-xs text-primary font-semibold uppercase tracking-wider">Change Photos</span>
                        </>
                      ) : (
                        <>
                          <div className="rounded-full bg-secondary/30 p-4">
                            <UploadCloud size={24} className="text-secondary-foreground" />
                          </div>
                          <div className="text-center">
                            <span className="font-medium text-foreground block">Select inspiration photos</span>
                            <span className="text-xs mt-1 block">You can select multiple images</span>
                          </div>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6 bg-card rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold flex items-center gap-2 text-primary">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary text-sm">
                {hasCustomSet ? "4" : "3"}
              </span>
              Payment Deposit
            </h2>

            <div className="space-y-6 pt-2">
              <p className="text-base font-body text-muted-foreground leading-relaxed">
                To secure your order, please send a <strong className="text-foreground">$10 deposit</strong> to my CashApp. 
                {hasCustomSet ? " For custom sets, the remaining balance ($15-$30 depending on complexity) will be due before shipping." : ""} Your order will not begin until the deposit is received!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-background p-5 rounded-xl border border-primary/10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-[#00D632]/10 flex items-center justify-center text-[#00D632]">
                    <span className="font-bold text-2xl">$</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">CashApp Tag</p>
                    <span className="font-mono font-bold text-xl tracking-tight">$YourCashTag</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full sm:w-auto bg-[#00D632] text-white hover:bg-[#00b52a] border-none font-bold rounded-full px-6" 
                  onClick={() => window.open('https://cash.app/$YourCashTag', '_blank')}
                >
                  Open CashApp
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-2xl bg-card border border-border/50 shadow-sm overflow-hidden animate-fade-up" style={{ animationDelay: '100ms' }}>
            <div className="p-6 md:p-8 bg-muted/30 border-b border-border/50">
              <h2 className="font-display text-2xl font-bold">Order Summary</h2>
            </div>
            
            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-5 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {activeItems.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col py-0.5">
                      <div className="flex justify-between items-start">
                        <h4 className="font-display text-base font-bold line-clamp-2 pr-4">{item.name}</h4>
                        {!isDirectBuy && (
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mt-1">{item.shape}</p>
                      
                      <div className="flex items-center justify-between mt-auto pt-2">
                        {isDirectBuy ? (
                          <span className="font-body text-xs font-bold text-muted-foreground">Qty: 1</span>
                        ) : (
                          <div className="flex items-center gap-1.5 rounded-full border border-border bg-background p-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-secondary transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center font-body text-xs font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-secondary transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        )}
                        <p className="font-body text-sm font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-3 pt-2">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${activeTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary font-bold">Free</span>
                </div>
                <div className="flex justify-between font-display text-2xl font-bold pt-4 border-t border-border/50">
                  <span>Total</span>
                  <span className="text-primary">${activeTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  onClick={handleFinalSubmit}
                  disabled={!customerDetails.name || !customerDetails.email || !customerDetails.address || !handPhoto || (hasCustomSet && !customDescription) || isSubmitting}
                  className="w-full rounded-full bg-primary py-7 font-display text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? "Processing..." : "I've Paid $10 & Submit Order"}
                </Button>
                
                {(!customerDetails.name || !customerDetails.email || !customerDetails.address || !handPhoto || (hasCustomSet && !customDescription)) && (
                  <p className="text-xs text-center text-muted-foreground mt-4 font-medium">
                    Please fill out all required fields {hasCustomSet ? "(including custom nail details)" : ""} and upload a hand photo to continue.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
