import { useState } from "react";
import ShapeFilter from "./ShapeFilter";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

import nail1 from "@/assets/nail-1.jpg";
import nail2 from "@/assets/nail-2.jpg";
import nail2b from "@/assets/nail-2b.jpg";
import nail4 from "@/assets/nail-4.jpg";
import nail5 from "@/assets/nail-5.jpg";
import nail6 from "@/assets/nail-6.jpg";
import nail6b from "@/assets/nail-6b.jpg";
import nail7 from "@/assets/nail-7.jpg";
import nail7b from "@/assets/nail-7b.jpg";
import nail8 from "@/assets/nail-8.jpg";
import nail8b from "@/assets/nail-8b.jpg";

const products = [
  {
    id: "1",
    name: "Cherry Blossom",
    shape: "Almond",
    price: 26.99,
    images: [nail1, nail4],
    rating: 4.9,
    isNew: true,
    description: "Soft pink blossoms with delicate floral accents. A dreamy, feminine set perfect for any occasion. Each set includes 10 nails, nail glue, and a mini file.",
  },
  {
    id: "2",
    name: "Golden Sage",
    shape: "Almond",
    price: 24.99,
    images: [nail2b, nail2, nail6, nail6b],
    rating: 4.9,
    isNew: true,
    description: "Sage green nails with gold celestial accents and sun charms. Handcrafted and one of a kind. Each set includes 10 nails, nail glue, and a mini file.",
  },
  {
    id: "3",
    name: "Lavender Dream",
    shape: "Almond",
    price: 26.99,
    images: [nail7, nail7b, nail5, nail8, nail8b],
    rating: 4.8,
    description: "Soft lavender hues with a satin finish. Minimal and modern, perfect for everyday wear. Each set includes 10 nails, nail glue, and a mini file.",
  },
  {
    id: "5",
    name: "Custom Set",
    shape: "Almond",
    price: 25,
    priceRange: "$25 – $40",
    images: [nail1, nail4, nail2b],
    rating: 5.0,
    isNew: true,
    description: "Fully custom press-on nails designed just for you! Choose your colors, patterns, and style. Price varies by complexity ($25–$40). After ordering, you'll upload a photo of your hand so Gracie can get your sizing perfect.",
  },
];

type Product = (typeof products)[number] & { priceRange?: string; description?: string };

const ProductGrid = () => {
  const [filter, setFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = filter === "All" ? products : products.filter((p) => p.shape === filter);

  return (
    <>
      <section id="products" className="py-16">
        <div className="container">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Gracie's Best Sellers
            </h2>
            <p className="mt-2 font-body text-muted-foreground">
              Handcrafted designs — filter by shape
            </p>
          </div>

          <ShapeFilter onFilter={setFilter} />

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((product, i) => (
              <div
                key={product.name}
                style={{ animationDelay: `${i * 100}ms` }}
                onClick={() => setSelectedProduct(product)}
                className="cursor-pointer"
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  shape={product.shape}
                  price={product.price}
                  salePrice={(product as any).salePrice}
                  priceRange={product.priceRange}
                  image={product.images[0]}
                  rating={product.rating}
                  isNew={product.isNew}
                />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-20 text-center font-body text-muted-foreground">
              No products in this shape yet — check back soon! 💜
            </p>
          )}
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          id={selectedProduct.id}
          name={selectedProduct.name}
          shape={selectedProduct.shape}
          price={selectedProduct.price}
          salePrice={(selectedProduct as any).salePrice}
          priceRange={selectedProduct.priceRange}
          images={selectedProduct.images}
          rating={selectedProduct.rating}
          description={selectedProduct.description}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default ProductGrid;
