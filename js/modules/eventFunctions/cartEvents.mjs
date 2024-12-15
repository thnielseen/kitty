/* -----------------------------
   ~~~ CART FUNCTIONS ~~~
------------------------------*/


/**
 * ------ TOGGLE CART VISIBILITY ------
 * Add a click event listener to the cart button.
 * 
 * Toggles the `visually-hidden` class on the cart to show or hide it.
 */
let cartTimeout = null;

export const toggleCartEvent = (cartElement, cartButton, headerCartIconId = "cartIcon") => {
  if (!cartElement || !cartButton) {
    console.error("Cart element or button is missing.");
    return;
  }

  const cartButtonSymbol = document.getElementById(headerCartIconId);

  // Ensure cart starts as hidden
  if (!cartElement.classList.contains("visually-hidden")) {
    cartElement.classList.add("visually-hidden");
    cartButton.setAttribute("aria-label", "Visa kundkorg");
    if (cartButtonSymbol) cartButtonSymbol.innerHTML = "shopping_cart";
  }

  // Add click event to toggle cart visibility
  cartButton.addEventListener("click", () => {
    const isHidden = cartElement.classList.toggle("visually-hidden");

    // Update aria-label and icon
    if (isHidden) {
      cartButton.setAttribute("aria-label", "Visa kundkorg");
      if (cartButtonSymbol) cartButtonSymbol.innerHTML = "shopping_cart";
    } else {
      cartButton.setAttribute("aria-label", "Stäng kundkorg");
      if (cartButtonSymbol) cartButtonSymbol.innerHTML = "close";
    }

    // Clear existing timeout when manually toggled
    if (cartTimeout) clearTimeout(cartTimeout);

    // Automatically close cart after 5 seconds if manually opened
    if (!isHidden) {
      cartTimeout = setTimeout(() => {
        cartElement.classList.add("visually-hidden");
        cartButton.setAttribute("aria-label", "Visa kundkorg");
        if (cartButtonSymbol) cartButtonSymbol.innerHTML = "shopping_cart";
      }, 5000); // 5 seconds timeout
    }
  });
};


/** EMPTY CART
 * Event listener for emptying the cart.
 * When clicked, the cart will be emptied by reloading the page.
 * This will reset the cart to its initial state and reload the page, 
 * effectively clearing any cart contents and user data.
 * 
 * @event click
 * @param {Event} event - The click event that triggers the page reload.
 * @returns {void}
 */
export const emptyCart = () => {
  document.getElementById("emptyCart").addEventListener("click", function() {
    // Empty the cart by reloading the page.
    location.reload();
  });
};

/**
 * ------- CHECKOUT EVENT HANDLER -------
 * Handles the click event for the "toCheckout" button.
 * Displays the order section, updates the product summary and order details.
 * 
 * @param {Array} donutProducts - The array of all products.
 * @param {Function} printSummary - Function to render product summary.
 * @param {Function} calcOrderDetails - Function to calculate order details.
 * @param {Function} printOrderDetails - Function to render order details.
 */
export const checkoutEvent = (donutProducts, printSummary, calcOrderDetails, printOrderDetails) => {
  const checkoutButton = document.getElementById("toCheckout");

  if (!checkoutButton) {
    console.error("Checkout button not found.");
    return;
  }

  checkoutButton.addEventListener("click", () => {
    // Hitta order-sektionen och se till att den är synlig
    const orderSection = document.getElementById("order");
    if (orderSection) {
      orderSection.classList.remove("visually-hidden");
      orderSection.scrollIntoView({ behavior: "smooth" });
    }

    // Filtrera ut endast produkter med positiv kvantitet
    const cartProducts = donutProducts.filter((product) => product.amount > 0);

    if (cartProducts.length === 0) {
      console.error("No products in the cart to checkout.");
      return;
    }

    // Uppdatera produktöversikten
    printSummary(cartProducts);

    // Beräkna och uppdatera orderdetaljer
    const orderDetails = calcOrderDetails(donutProducts);
    printOrderDetails(orderDetails);
  });
};
