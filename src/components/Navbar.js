import Link from "next/link";
import { useCart } from "../context/CartContext";
import { auth, provider } from "../services/firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const [user, setUser] = useState(null);
  const adminEmail = "narendraseerla@gmail.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const linkStyle = {
    marginRight: "15px",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
  };

  const buttonStyle = {
    backgroundColor: "#ffffff",
    color: "#fc8019",
    border: "none",
    padding: "6px 14px",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
    marginLeft: "10px",
  };

  const buttonHoverStyle = {
    backgroundColor: "#ffe5d6",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#fc8019",
        color: "white",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Links */}
      <div style={{
        display: "flex",
    flexDirection: "column",
    gap: "10px",
      }}>
<div>
  <Link href="/" style={{ marginRight: "15px", color: "white" }}>
    Home
  </Link>

  <Link href="/cart" style={{ marginRight: "15px", color: "white" }}>
    Cart ({totalItems})
  </Link>

  <Link href="/orders" style={{ marginRight: "15px", color: "white" }}>
    Orders
  </Link>

  {/* ✅ Admin link only for you */}
  {user && user.email === adminEmail && (
    <div>
    <Link href="/admin/orders" style={{ color: "white" }}>
      Admin
    </Link>
    <Link href="/admin/analytics">Analytics</Link>
    </div>
  )}
</div>
      </div>

      {/* Login / Logout */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {user ? (
          <>
            <span style={{ marginRight: "10px", fontWeight: "bold" }}>
              Hi, {user.displayName}
            </span>
            <button
              onClick={() => signOut(auth)}
              style={buttonStyle}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = buttonStyle.backgroundColor)
              }
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => signInWithPopup(auth, provider)}
            style={buttonStyle}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = buttonStyle.backgroundColor)
            }
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}