import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart, total } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div key={`${item.name}-${item.shop}`} style={{ marginBottom: "10px" }}>
          <p>
            <strong>{item.name}</strong> - ₹{item.price}
          </p>

          <p style={{ color: "#777", fontSize: "14px" }}>
            Shop: {item.shop}
          </p>

          <button onClick={() => decreaseQty(item.name, item.shop)}>-</button>
          <span> {item.quantity} </span>
          <button onClick={() => increaseQty(item.name, item.shop)}>+</button>

          <button onClick={() => removeFromCart(item.name, item.shop)}>
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