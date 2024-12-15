/**
 * Adds an event listener to the "Back to Cart" button
 * that hides the order section, shows the cart, and returns the user to the main view.
 */
export const backToCartEvent = () => {
  const backToCartButton = document.getElementById("backToCart");
  const orderSection = document.getElementById("order");
  const cartSection = document.getElementById("cart");

  if (!backToCartButton || !orderSection || !cartSection) {
    console.error("Required elements not found: #backToCart, #order, or #cart");
    return;
  }

  backToCartButton.addEventListener("click", () => {
    // Hide the order section
    orderSection.classList.add("visually-hidden");
    // Show the cart section
    cartSection.classList.remove("visually-hidden");
    // Scroll back to the cart section smoothly
    cartSection.scrollIntoView({ behavior: "smooth" });
  });
};
