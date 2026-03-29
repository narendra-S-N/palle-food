import { useEffect, useState } from "react";
import { auth, db } from "../../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Delivery() {
    const [orders, setOrders] = useState([]);
const [user, setUser] = useState(null);
    const deliveryBoy = "seerlanarendra113@gmail.com"; // 👈 simulate login

      useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
},[]);


    const updateStatus = async (id) => {
        const ref = doc(db, "orders", id);

        await updateDoc(ref, {
            status: "Delivered",
        });
    };
 useEffect(() => {
  if (!user) return;

  const q = query(
    collection(db, "orders"),
    where("deliveryBoy", "==", user.email)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setOrders(data);
  });

  return () => unsubscribe();
}, [user]);
if (!user) {
  return (
    <div>
      <h2>Delivery Login</h2>

      <button onClick={() => signInWithPopup(auth, provider)}>
        Login with Google
      </button>
    </div>
  );
}

    return (
        <div>
            <h1>My Deliveries</h1>

            {orders.map((order) => (
                <div key={order.id} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
                    <p>Shop: {order.shop}</p>
                    <p>Order ID: {order.id}</p>
                    <p>Total: ₹{order.total}</p>
                    <p>Status: {order.status}</p>
                    <button onClick={() => updateStatus(order.id)}>
                        Mark Delivered
                    </button>
                </div>
            ))}
        </div>
    );
}