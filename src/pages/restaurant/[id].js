import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/router";

import { db } from "../../services/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export default function RestaurantPage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const { id } = router.query;

  const [message, setMessage] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  // 🔥 FETCH MENU FROM FIREBASE
  useEffect(() => {
    if (!id) return;

    const fetchMenu = async () => {
      const snapshot = await getDocs(
        collection(db, "restaurants", id, "menu")
      );

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setMenuItems(data);
    };
    const fetchRestaurant = async () => {
      const docRef = doc(db, "restaurants", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRestaurant(docSnap.data());
      }
    };

    fetchRestaurant();

    fetchMenu();
  }, [id]);

  // 🛒 ADD TO CART
  const handleAddToCart = (item) => {
    // addToCart(item);
    addToCart({
  ...item,
  shop: restaurant?.name,   // ✅ add this
  restaurantId: id          // ✅ very important
});

    setMessage(`${item.name} added successfully!`);

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

      {/* ✅ EMPTY STATE */}
      {menuItems.length === 0 && (
        <p style={{ textAlign: "center" }}>No items available</p>
      )}

      {/* ✅ DYNAMIC MENU */}
      {menuItems.map((item) => (
        <div
          key={item.id}
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
          {/* 🟢 Veg / 🔴 Non-Veg */}
<p style={{
  margin: 0,
  fontSize: "14px",
  fontWeight: "bold",
  color: item.category === "veg" ? "green" : "red"
}}>
  {item.category === "veg" ? "🟢 Veg" : "🔴 Non-Veg"}
</p>
            {/* OPTIONAL: show restaurant name */}
            <p style={{ margin: 0, fontSize: "14px", color: "#888" }}>
              {restaurant?.name || "Restaurant"}
            </p>

            {/* 🖼️ IMAGE */}
            {item.image && (
              <img
                src={item.image}
                width="80"
                style={{ marginTop: "5px", borderRadius: "5px" }}
              />
            )}
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