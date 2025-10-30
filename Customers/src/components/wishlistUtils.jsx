// wishlistUtils.js
export const addToWishlist = (item) => {
  try {
    const currentWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );
    const exists = currentWishlist.find((i) => i.id === item.id);

    if (!exists) {
      currentWishlist.push(item);
      localStorage.setItem("wishlist", JSON.stringify(currentWishlist));
      window.dispatchEvent(new Event("wishlistUpdated"));
      return { success: true, message: "Added to wishlist!" };
    }

    return { success: false, message: "Already in wishlist!" };
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return { success: false, message: "Failed to add to wishlist" };
  }
};
