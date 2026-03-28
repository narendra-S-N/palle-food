import Link from "next/link";
import { useCart } from "../context/CartContext";
import { auth, provider } from "../services/firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px",
      background: "#fc8019",
      color: "white"
    }}>
      <div>
        <Link href="/" style={{ marginRight: "15px", color: "white" }}>
          Home
        </Link>

        <Link href="/cart" style={{ marginRight: "15px", color: "white" }}>
          Cart ({totalItems})
        </Link>

        <Link href="/orders" style={{ color: "white" }}>
          Orders
        </Link>
      </div>

      {/* ✅ Login / Logout */}
      <div>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>
              Hi, {user.displayName}
            </span>
            <button onClick={() => signOut(auth)}>
              Logout
            </button>
          </>
      ) : (
  <button onClick={() => signInWithPopup(auth, provider)}>
    Login
  </button>
)}
      </div>
    </div>
  );
}