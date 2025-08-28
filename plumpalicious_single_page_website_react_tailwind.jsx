import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

const DEFAULT_PRODUCTS = [
  { id: "soap-blue-flower", title: "Blue Flower Shape Soap (Lavender)", price: 350, img: "", tags: ["Soap", "Lavender"], customization: true },
  { id: "soap-beetroot", title: "Beetroot Flower Soap (Rose & Lily)", price: 350, img: "", tags: ["Soap", "Rose", "Lily"], customization: true },
  { id: "soap-rice", title: "Rice Soap (Rose & Lavender)", price: 300, img: "", tags: ["Soap", "Rice"], customization: true },
  { id: "soap-daisy", title: "Daisy Flower Soap", price: 200, img: "", tags: ["Soap"], customization: true },
  { id: "soap-heart", title: "Heart Shape Soap", price: 250, img: "", tags: ["Soap"], customization: true },
  { id: "lip-coconut", title: "Coconut Lip Balm", price: 450, img: "", tags: ["Lip Balm"], customization: false },
  { id: "lip-lavender", title: "Lavender Lip Balm", price: 450, img: "", tags: ["Lip Balm"], customization: false },
  { id: "lip-rose", title: "Rose Lip Balm", price: 450, img: "", tags: ["Lip Balm"], customization: false },
  { id: "scrub-slushie", title: "Slushie Body Scrub", price: 950, img: "", tags: ["Body Scrub"], customization: false },
  { id: "toner-cooling", title: "Cooling Mist Toner", price: 850, img: "", tags: ["Toner"], customization: false },
  { id: "bath-rose", title: "Premium Rose Bath Salt", price: 300, img: "", tags: ["Bath Salt"], customization: false },
  { id: "soap-oval", title: "Oval Custom Soap", price: 300, img: "", tags: ["Soap"], customization: true },
  { id: "lip-scrub-strawberry", title: "Strawberry Lip Scrub", price: 150, img: "", tags: ["Lip Scrub"], customization: false },
  { id: "lip-scrub-lemon", title: "Lemon Lip Scrub", price: 150, img: "", tags: ["Lip Scrub"], customization: false },
  { id: "lip-scrub-blueberry", title: "Blueberry Lip Scrub", price: 150, img: "", tags: ["Lip Scrub"], customization: false },
  { id: "scrunchie-colorful", title: "Colourful Scrunchie", price: 60, img: "", tags: ["Scrunchie"], customization: false },
  { id: "deal-giftbox", title: "Plumpalicious Gift Box (Deal)", price: 1450, img: "", tags: ["Deal"], customization: false },
];

export default function Shop() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("plumpalicious_products");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem("plumpalicious_products", JSON.stringify(newProducts));
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const newProducts = [...products];
      newProducts[index].img = reader.result;
      saveProducts(newProducts);
    };
    reader.readAsDataURL(file);
  };

  const checkPassword = () => {
    if (password === "plumpadmin") setIsAdmin(true);
    else alert("Wrong password");
  };

  const categories = ["All", ...new Set(DEFAULT_PRODUCTS.flatMap(p => p.tags))];

  const filteredProducts = products.filter(p =>
    (filter === "All" || p.tags.includes(filter)) &&
    (search === "" || p.title.toLowerCase().includes(search.toLowerCase()))
  );

  if (showWelcome) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 text-center p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-pink-600 mb-4"
        >
          🌸 Welcome to Plumpalicious 🌸
        </motion.h1>
        <p className="text-lg text-gray-700 mb-6 max-w-xl">
          Discover our handmade soaps, lip balms, scrubs, and more – made with love, fragrance, and care. ✨
        </p>
        <Button
          className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-3 rounded-xl shadow-lg"
          onClick={() => setShowWelcome(false)}
        >
          Enter Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Filter & Search */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded-lg shadow-sm"
        >
          {categories.map(cat => <option key={cat}>{cat}</option>)}
        </select>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="border px-3 py-2 rounded-lg shadow-sm flex-1"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((p, i) => (
          <motion.div key={p.id} whileHover={{ scale: 1.05 }}>
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-4 flex flex-col items-center">
                {p.img ? (
                  <img src={p.img} alt={p.title} className="w-32 h-32 object-cover rounded-xl mb-3" />
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center bg-pink-100 rounded-xl mb-3 text-gray-500">
                    No Image
                  </div>
                )}
                <h3 className="text-lg font-semibold text-center">{p.title}</h3>
                <p className="text-pink-600 font-bold">Rs {p.price}</p>
                {p.customization && <p className="text-xs text-green-600">✨ Customisation Available</p>}
                <a
                  href="https://www.instagram.com/_plumpalicious/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-xl"
                >
                  Order via Instagram
                </a>
                {isAdmin && (
                  <div className="mt-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, i)}
                      />
                    </label>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Admin Panel */}
      <div className="fixed bottom-6 right-6">
        {!isAdmin ? (
          <div className="bg-white p-3 rounded-xl shadow-md flex gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="border px-2 py-1 rounded-lg"
            />
            <Button onClick={checkPassword}>Login</Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              saveProducts(DEFAULT_PRODUCTS);
              setIsAdmin(false);
            }}
            className="bg-red-500 text-white"
          >
            Logout Admin
          </Button>
        )}
      </div>

      {/* Floating Instagram DM button */}
      <a
        href="https://www.instagram.com/_plumpalicious/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-gradient-to-r from-pink-400 to-purple-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
      >
        💌
      </a>
    </div>
  );
}
