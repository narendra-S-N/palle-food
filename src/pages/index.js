import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const snapshot = await getDocs(collection(db, "restaurants"));

      const data = snapshot.docs.map(doc => ({
        id: doc.id,   // ✅ VERY IMPORTANT
        ...doc.data()
      }));

      setRestaurants(data);
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      <h1>Food Delivery</h1>

      {restaurants.length === 0 && <p>No restaurants found</p>}

      {restaurants.map((res) => (
        <RestaurantCard key={res.id} restaurant={res} />
      ))}
    </div>
  );
}