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
    <div>
      <h1>Menu</h1>

      {/* Success Message */}
      {message && (
        <p style={{ color: "green", fontWeight: "bold" }}>
          {message}
        </p>
      )}

      {menuItems.map((item, index) => (
        <div key={index}>
          <p>
            {item.name} - ₹{item.price}
          </p>
          <button onClick={() => handleAddToCart(item)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}