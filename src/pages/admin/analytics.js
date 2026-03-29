import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Analytics() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "orders"));

      const orders = snapshot.docs.map(doc => doc.data());

      const result = {};

      orders.forEach(order => {
        const shop = order.shop;

        if (result[shop]) {
          result[shop] += 1;
        } else {
          result[shop] = 1;
        }
      });

      setStats(result);
    };

    fetchData();
  }, []);
    return (
    <div>
      <h1>Top Restaurants</h1>

      {Object.entries(stats).map(([shop, count]) => (
        <p key={shop}>
          {shop} → {count} orders
        </p>
      ))}
    </div>
  );
}