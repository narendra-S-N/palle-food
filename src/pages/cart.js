import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart, total } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>

      {cart.map((item, index) => (
        <div key={index}>
          <p>{item.name} - ₹{item.price}</p>

          <button onClick={() => decreaseQty(item.name)}>-</button>
          <span> {item.quantity} </span>
          <button onClick={() => increaseQty(item.name)}>+</button>

          <button onClick={() => removeFromCart(item.name)}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: ₹{total}</h2>
      <Link href="/checkout">
  <button>Go to Checkout</button>
</Link>
    </div>
  );
  
}
