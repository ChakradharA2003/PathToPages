// cartUtils.js - Utility functions for cart management

/**
 * Add item to cart with localStorage persistence
 * @param {Object} item - Product item to add (must have id, name, price, image)
 * @returns {Array} - Updated cart items array
 */
export const addToCartUtil = (item) => {
  try {
    const currentCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItem = currentCart.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(currentCart));

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("cartUpdated"));

    return currentCart;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

/**
 * Get current cart items from localStorage
 * @returns {Array} - Cart items array
 */
export const getCartItems = () => {
  try {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Error loading cart:", error);
    return [];
  }
};

/**
 * Get cart item count
 * @returns {Number} - Total number of items in cart
 */
export const getCartCount = () => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Clear all items from cart
 */
export const clearCart = () => {
  localStorage.removeItem("cartItems");
  window.dispatchEvent(new Event("cartUpdated"));
};

/**
 * Remove specific item from cart
 * @param {Number|String} itemId - ID of item to remove
 */
export const removeFromCart = (itemId) => {
  try {
    const currentCart = getCartItems();
    const updatedCart = currentCart.filter((item) => item.id !== itemId);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    return updatedCart;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

/**
 * Update item quantity in cart
 * @param {Number|String} itemId - ID of item to update
 * @param {Number} quantity - New quantity
 */
export const updateCartItemQuantity = (itemId, quantity) => {
  try {
    const currentCart = getCartItems();
    const updatedCart = currentCart.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    return updatedCart;
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    throw error;
  }
};
