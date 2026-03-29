import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  //   const getColor = (step) => {
  //   if (order.status === "Delivered") return "green";
  //   if (order.status === "Preparing" && step !== "Delivered") return "blue";
  //   if (order.status === "Pending" && step === "Pending") return "orange";
  //   return "gray";
  // };

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) return;

    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  return (
    <div>
      <h1>Your Orders</h1>

      {orders.map((order) => (
        <div key={order.id} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
          <p><b>Shop:</b> {order.shop}</p>
          <p><b>Order ID:</b> {order.id}</p>

          {order.items.map((item, i) => (
            <p key={i}>
              {item.name} x {item.quantity}
            </p>
          ))}

          <h3>Total: ₹{order.total}</h3>

          {/* ✅ MOVE HERE */}
          <div style={{ marginTop: "10px" }}>
            <p><b>Status:</b> {order.status}</p>

            <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>

              <span style={{
                color: order.status === "Pending" ? "orange" : "gray"
              }}>
                ● Pending
              </span>

              <span style={{
                color: order.status === "Preparing" ? "blue" : "gray"
              }}>
                ● Preparing
              </span>

              <span style={{
                color: order.status === "Delivered" ? "green" : "gray"
              }}>
                ● Delivered
              </span>

            </div>
          </div>

        </div>
      ))}

    </div>
  );
}