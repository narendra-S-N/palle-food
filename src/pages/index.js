import RestaurantCard from "../components/RestaurantCard";
import { restaurants } from "../data/restaurants";

export default function Home() {
  return (
    <div>
      <h1>Food Delivery</h1>

      {restaurants.map((res) => (
        <RestaurantCard key={res.id} restaurant={res} />
      ))}

    </div>
  );
}