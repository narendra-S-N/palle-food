import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function RestaurantPage() {
  const { addToCart } = useCart();
  const [message, setMessage] = useState("");

  const menuItems = [
    { name: "Pizza", price: 200 },
    { name: "Burger", price: 150 },
    { name: "Pasta", price: 180 },
    { name: "Sandwich", price: 120 },
    { name: "French Fries", price: 100 },
    { name: "Noodles", price: 160 },
    { name: "Fried Rice", price: 170 },
    { name: "Paneer Tikka", price: 220 },
    { name: "Chicken Wings", price: 250 },
    { name: "Ice Cream", price: 90 },
  ];

  const handleAddToCart = (item) => {
    addToCart(item);
    setMessage(`${item.name} added successfully!`);

    // hide message after 2 seconds
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Menu</h1>

      {/* Success Message */}
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
          <p style={{ margin: 0, fontSize: "16px", color: "#555" }}>
            {item.name} - ₹{item.price}
          </p>
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