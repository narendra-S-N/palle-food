import { auth, db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useCart();

  // 🔥 Price function
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

  // 🔥 Total
  const total = cart.reduce((sum, item) => {
    return sum + getFinalPrice(item) * item.quantity;
  }, 0);

  const placeOrder = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        userEmail: user.email,

        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          baseQuantity: item.baseQuantity,
          unit: item.unit,
          price: getFinalPrice(item),
          shop: item.shop
        })),

        total: total,
        restaurantId: cart[0]?.restaurantId,
        shop: cart[0]?.shop,

        status: "Pending",
        createdAt: new Date(),
      });

      alert("Order placed successfully!");
      clearCart();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto" }}>
      <h1>Checkout</h1>

      {cart.map((item) => {
        const totalQty = item.baseQuantity * item.quantity;

        return (
          <p key={item.id}>
            {item.name} ({item.shop}) → {totalQty} {item.unit}
          </p>
        );
      })}

      <h2>Total: ₹{total}</h2>

      <button
        onClick={placeOrder}
        style={{
          background: "#28a745",
          color: "white",
          padding: "10px",
          border: "none"
        }}
      >
        Place Order
      </button>
    </div>
  );
}