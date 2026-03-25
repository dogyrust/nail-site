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
  { id: "1", name: "Butterfly Garden", shape: "Almond", price: 24.99, images: [nail1, nail4], rating: 4.9, isNew: true },
  { id: "2", name: "Golden Sage", shape: "Almond", price: 22.99, images: [nail2, nail2b, nail6b], rating: 4.8, isNew: true },
  { id: "3", name: "Picnic Party", shape: "Stiletto", price: 24.99, images: [nail5, nail7, nail7b, nail8, nail8b], rating: 4.8 },
  { id: "4", name: "Celestial Sage", shape: "Almond", price: 22.99, images: [nail6, nail6b], rating: 4.9, isNew: true },
];

type Product = (typeof products)[number];

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
          images={selectedProduct.images}
          rating={selectedProduct.rating}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default ProductGrid;
