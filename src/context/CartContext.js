import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ✅ Load cart from localStorage
  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) setCart(JSON.parse(data));
  }, []);

  // ✅ Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
const addToCart = (item) => {
  setCart((prev) => {
    const exist = prev.find(
      (i) => i.id === item.id && i.restaurantId === item.restaurantId
    );

    if (exist) {
      return prev.map((i) =>
        i.id === item.id && i.restaurantId === item.restaurantId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    }

    return [...prev, { ...item, quantity: 1 }];
  });
};

const removeFromCart = (id, restaurantId) => {
  setCart((prev) =>
    prev.filter(
      (item) =>
        !(item.id === id && item.restaurantId === restaurantId)
    )
  );
};

const increaseQty = (id, restaurantId) => {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id && item.restaurantId === restaurantId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decreaseQty = (id, restaurantId) => {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id &&
      item.restaurantId === restaurantId &&
      item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
};

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      // value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty, total }}
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);