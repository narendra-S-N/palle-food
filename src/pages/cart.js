import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  // 🔥 Calculate final price
  const getFinalPrice = (item) => {
    if (!item.discountType || item.discountType === "none") {
      return item.price;
    }

    if (item.discountType === "percent") {
      return item.price - (item.price * item.discountValue) / 100;
    }

    if (item.discountType === "flat") {
      return item.price - item.discountValue;
    }

    return item.price;
  };

  // 🔥 Total calculation
  const total = cart.reduce((sum, item) => {
    return sum + getFinalPrice(item) * item.quantity;
  }, 0);

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto" }}>
      <h1>Your Cart</h1>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item) => {
        const finalPrice = getFinalPrice(item);
        const totalQty = item.baseQuantity * item.quantity;

        return (
          <div
            key={`${item.id}-${item.restaurantId}`}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            <p>
              <strong>{item.name}</strong>
            </p>

            {/* 🏷 Offer */}
            {item.discountType !== "none" && (
              <span style={{
                background: "orange",
                color: "white",
                padding: "2px 6px",
                borderRadius: "4px",
                fontSize: "12px"
              }}>
                {item.discountType === "percent"
                  ? `${item.discountValue}% OFF`
                  : `₹${item.discountValue} OFF`}
              </span>
            )}

            {/* 💰 Price */}
            <p>
              ₹{finalPrice}
              {item.discountType !== "none" && (
                <span style={{
                  textDecoration: "line-through",
                  marginLeft: "5px",
                  color: "#888"
                }}>
                  ₹{item.price}
                </span>
              )}
            </p>

            {/* 📦 Quantity */}
            <p style={{ fontSize: "14px", color: "#555" }}>
              {totalQty} {item.unit}
            </p>

            <p style={{ fontSize: "14px", color: "#777" }}>
              Shop: {item.shop}
            </p>

            {/* ➕➖ Controls */}
            <button onClick={() => decreaseQty(item.id, item.restaurantId)}>
              -
            </button>

            <span> {item.quantity} </span>

            <button onClick={() => increaseQty(item.id, item.restaurantId)}>
              +
            </button>

            <button
              onClick={() => removeFromCart(item.id, item.restaurantId)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Remove
            </button>
          </div>
        );
      })}

      <h2>Total: ₹{total}</h2>

      <Link href="/checkout">
        <button
          disabled={cart.length === 0}
          style={{
            backgroundColor: cart.length === 0 ? "#ccc" : "#ff6b6b",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: cart.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          Go to Checkout
        </button>
      </Link>
    </div>
  );
}