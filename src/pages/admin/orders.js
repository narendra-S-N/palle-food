import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { auth } from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ 1. Fetch Orders (TOP)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const data = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));
      setOrders(data);
    });


    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== "narendraseerla@gmail.com") {
        router.push("/"); // redirect
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
  // ✅ 2. ADD HERE (updateStatus function)
  const updateStatus = async (id, status) => {
    const ref = doc(db, "orders", id);
    await updateDoc(ref, { status });
  };
  const assignDelivery = async (id, email) => {
    const ref = doc(db, "orders", id);

    await updateDoc(ref, {
      deliveryBoy: email,
      status: "Assigned",
    });
  };
  if (loading) return <p>Checking access...</p>;

  // ✅ 3. UI RETURN
  return (
    <div>
      <h1>Restaurant Orders</h1>

      {orders.map((order) => (
        <div key={order.id} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Shop:</b> {order.shop}</p>
          <p><b>Order ID:</b> {order.id}</p>
          <p>Total: ₹{order.total}</p>
          <p>Status: {order.status}</p>
          <p><b>Delivery Boy:</b> {order.deliveryBoy || "Not Assigned"}</p>
          <button onClick={() => updateStatus(order.id, "Picked")}>
            Picked
          </button>

          <button onClick={() => updateStatus(order.id, "On the Way")}>
            On the Way
          </button>

          <button onClick={() => updateStatus(order.id, "Delivered")}>
            Delivered
          </button>

          <button onClick={() => assignDelivery(order.id, "seerlanarendra113@gmail.com")}>
            Assign Rahul
          </button>

          <button onClick={() => assignDelivery(order.id, "ravi@gmail.com")}>
            Assign Ravi
          </button>
          <button onClick={() => updateStatus(order.id, "Delivered")}>
            Mark Delivered
          </button>

        </div>
      ))}


    </div>
  );
}