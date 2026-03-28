import { auth, db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, total ,clearCart } = useCart();

  const placeOrder = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cart, // ✅ correct
        total: total, // ✅ correct
        status: "Pending", 
        createdAt: new Date(),
      });
      alert("Order placed!");
      clearCart(); // ✅ clears cart
      

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>

      {cart.map((item, index) => (
        <p key={index}>
          {item.name} x {item.quantity}
        </p>
      ))}

      <h2>Total: ₹{total}</h2>

      <button onClick={placeOrder} className="button">
        Place Order
      </button>
    </div>
  );
}