import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart, total } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div key={`${item.id}-${item.restaurantId}`} style={{ marginBottom: "10px" }}>
          
          <p>
            <strong>{item.name}</strong> - ₹{item.price}
          </p>

          <p style={{ color: "#777", fontSize: "14px" }}>
            Shop: {item.shop || "Restaurant"}
          </p>

          <button onClick={() => decreaseQty(item.id, item.restaurantId)}>-</button>
          <span> {item.quantity} </span>
          <button onClick={() => increaseQty(item.id, item.restaurantId)}>+</button>

          <button onClick={() => removeFromCart(item.id, item.restaurantId)}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: ₹{total}</h2>

      <Link href="/checkout">
        <button
          disabled={cart.length === 0}
          style={{
            backgroundColor: cart.length === 0 ? "#ccc" : "#ff6b6b",
            color: "white",
            border: "none",
            padding: "10px 16px",
            cursor: cart.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          Go to Checkout
        </button>
      </Link>
    </div>
  );
}