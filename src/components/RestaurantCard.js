import Link from "next/link";

export default function RestaurantCard({ restaurant }) {
  return (
    <div style={{border:"1px solid #ddd",padding:"10px",margin:"10px"}}>
      <img src={restaurant.image} width="200" />
      <h3>{restaurant.name}</h3>
      <p>Rating: {restaurant.rating}</p>

      <Link href={`/restaurant/${restaurant.id}`}>
        View Menu
      </Link>
    </div>
  );
}