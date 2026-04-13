"use client";

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

  // 🔥 Fetch Data
  useEffect(() => {
    if (!id) return;

    const fetchMenu = async () => {
      const snapshot = await getDocs(
        collection(db, "restaurants", id, "menu")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        selectedQty: 1 // ✅ default quantity
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

  // 🧮 Final Price
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

  // 🛒 Add to Cart
  const handleAddToCart = (item) => {
    addToCart({
      ...item,
      shop: restaurant?.name,
      restaurantId: id,
      totalQty: item.baseQuantity * item.selectedQty // ✅ calculated
    });

    setMessage(`${item.name} added successfully!`);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  // ➕➖ Quantity Change
  const updateQty = (index, value) => {
    const updated = [...menuItems];
    updated[index].selectedQty = value < 1 ? 1 : value;
    setMenuItems(updated);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>
        {restaurant?.name || "Menu"}
      </h1>

      {message && (
        <p style={{
          color: "green",
          background: "#e0ffe0",
          padding: "10px",
          textAlign: "center"
        }}>
          {message}
        </p>
      )}

      {menuItems.length === 0 && (
        <p style={{ textAlign: "center" }}>No items available</p>
      )}

      {menuItems.map((item, index) => {
        const finalPrice = getFinalPrice(item);
        const totalQty = item.baseQuantity * item.selectedQty;

        return (
          <div key={item.id} style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
            margin: "10px 0",
            background: "#fafafa"
          }}>
            {/* 🔥 OFFER BADGE */}
            {item.discountType !== "none" && (
              <span style={{
                background: "orange",
                color: "white",
                padding: "3px 8px",
                borderRadius: "5px",
                fontSize: "12px"
              }}>
                {item.discountType === "percent"
                  ? `${item.discountValue}% OFF`
                  : `₹${item.discountValue} OFF`}
              </span>
            )}

            <h3 style={{ margin: "5px 0" }}>{item.name}</h3>

            {/* PRICE */}
            <p style={{ margin: 0 }}>
              ₹{finalPrice}
              {item.discountType !== "none" && (
                <span style={{
                  textDecoration: "line-through",
                  marginLeft: "8px",
                  color: "#999"
                }}>
                  ₹{item.price}
                </span>
              )}
            </p>

            {/* QUANTITY DISPLAY */}
            <p style={{ margin: "5px 0", color: "#555" }}>
              {item.baseQuantity} {item.unit}
            </p>

            {/* TOTAL AFTER SELECT */}
            <p style={{ fontSize: "13px", color: "#777" }}>
              Total: {totalQty} {item.unit}
            </p>

            {/* VEG/NON-VEG */}
            <p style={{
              color: item.category === "veg" ? "green" : "red",
              fontWeight: "bold"
            }}>
              {item.category === "veg" ? "🟢 Veg" : "🔴 Non-Veg"}
            </p>

            {/* IMAGE */}
            {item.image && (
              <img
                src={item.image}
                width="80"
                style={{ borderRadius: "5px" }}
              />
            )}

            {/* ADD TO CART */}
            <button
              onClick={() => handleAddToCart(item)}
              style={{
                marginTop: "10px",
                background: "#ff6b6b",
                color: "white",
                padding: "8px 15px",
                border: "none",
                borderRadius: "5px"
              }}
            >
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}