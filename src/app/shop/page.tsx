"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const imageLoader = ({ src }: { src: string }) => {
    return src;
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product: IProduct) => {
    console.log(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <p className="text-red-500">{error}</p>
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
          onClick={fetchProducts}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const uniqueKey = `product-${product._id}-${index}`;
            return (
              <article 
                key={uniqueKey}
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
              >
                <div className="relative h-64 w-full bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    loader={imageLoader}
                    quality={100}
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 line-clamp-2 h-14">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-4 h-20 mb-4">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">
                      ${product.price}
                    </span>
                    <button
                      className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors duration-200"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}