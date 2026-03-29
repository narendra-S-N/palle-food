import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function RestaurantPage() {
  const { addToCart } = useCart();
  const [message, setMessage] = useState("");

  const menuItems = [
    { name: "Pizza", price: 200, shop: "Italian Delight" },
    { name: "Burger", price: 150, shop: "Burger Hub" },
    { name: "Pasta", price: 180, shop: "Italian Delight" },
    { name: "Sandwich", price: 120, shop: "Snack Corner" },
    { name: "French Fries", price: 100, shop: "Fast Food Express" },
    { name: "Noodles", price: 160, shop: "Chinese Wok" },
    { name: "Fried Rice", price: 170, shop: "Chinese Wok" },
    { name: "Paneer Tikka", price: 220, shop: "Desi Tadka" },
    { name: "Chicken Wings", price: 250, shop: "Grill House" },
    { name: "Ice Cream", price: 90, shop: "Cool Treats" },
  ];

  const handleAddToCart = (item) => {
    addToCart(item);
    setMessage(`${item.name} from ${item.shop} added successfully!`);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Menu</h1>

      {message && (
        <p
          style={{
            color: "green",
            fontWeight: "bold",
            backgroundColor: "#e0ffe0",
            padding: "10px",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          {message}
        </p>
      )}

      {menuItems.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 15px",
            margin: "8px 0",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: "16px", color: "#555" }}>
              {item.name} - ₹{item.price}
            </p>
            <p style={{ margin: 0, fontSize: "14px", color: "#888" }}>
              {item.shop}
            </p>
          </div>

          <button
            onClick={() => handleAddToCart(item)}
            style={{
              backgroundColor: "#ff6b6b",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}