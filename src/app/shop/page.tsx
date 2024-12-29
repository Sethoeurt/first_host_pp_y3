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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <p>Loading products...</p>
    </div>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
            >
              {/* Image container with fixed height */}
              <div className="relative h-64 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  quality={100}
                  className="object-cover"
                />
              </div>

              {/* Content container with fixed heights for title and description */}
              <div className="p-6 flex flex-col flex-1">
                <div className="h-14">
                  {" "}
                  {/* Fixed height for title */}
                  <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
                    {product.name}
                  </h3>
                </div>

                <div className="h-20 mb-4">
                  {" "}
                  {/* Fixed height for description */}
                  <p className="text-gray-600 text-sm line-clamp-4">
                    {product.description}
                  </p>
                </div>

                {/* Price and cart button */}
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">
                    ${product.price}
                  </span>
                  <button className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors duration-200">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}