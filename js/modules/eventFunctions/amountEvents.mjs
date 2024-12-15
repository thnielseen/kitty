

/**
 * Handle clicks on the product image navigation buttons.
 * 
 * 1. Listens for click events on the element with the ID "displayProducts".
 * 2. If a button is clicked:
 *    a. Checks if the clicked element is a <button> or contains a <button> (using .closest()).
 *    b. If a valid button with a "direction" data attribute is found:
 *       - Find the nearest product image container (.display__product__image-content).
 *       - Based on the direction (right or left), toggle the images by calling toggleImages.
 */

export const controlDisplayAmountButtonEvent = (
  productDisplayId,
  donutProducts,
  currentProducts,
  printProductDisplay,
  printCartProducts,
  showCartForFiveSeconds,
  cartElement,
  calcOrderDetails,
  printOrderDetails
) => {
  const productDisplay = document.getElementById(productDisplayId);

  if (!productDisplay) {
    console.error(`Element with ID '${productDisplayId}' not found.`);
    return;
  }

  productDisplay.addEventListener("click", (event) => {
    const button = event.target.closest(".product__button--decrease, .product__button--increase");
    if (button) {
      const productId = parseInt(button.dataset.id, 10);
      const product = donutProducts.find((product) => product.id === productId);

      if (!product) {
        console.error(`Product with ID ${productId} not found.`);
        return;
      }

      if (button.classList.contains("product__button--decrease") && product.amount > 0) {
        product.amount--;
      } else if (button.classList.contains("product__button--increase")) {
        product.amount++;
      }

      // Update all views and details
      printProductDisplay(currentProducts);
      printCartProducts(donutProducts);
      showCartForFiveSeconds(cartElement);

      const orderDetails = calcOrderDetails(donutProducts);
      printOrderDetails(orderDetails); // Ensure order details are updated here
    }
  });
};

/**
 * ------ UPDATE PRODUCT AMOUNTS ------
 * Updates the product amount based on button clicks in the product display.
 *
 * 1. Listens for clicks on buttons to increase or decrease product amounts 
 *    (.product__button--increase, .product__button--decrease).
 * 2. On click:
 *    - Identifies the clicked button and retrieves the product ID from its dataset.
 *    - Finds the corresponding product in the original data source (`donutProducts`) using its ID.
 *    - If the decrease button is clicked and the amount is greater than 0, decrements the amount.
 *    - If the increase button is clicked, increments the amount.
 *    - Re-renders the filtered product display (`currentProducts`) to reflect changes.
 *    - Updates the cart display with the current product list.
 *    - Temporarily displays the cart for 5 seconds.
 *
 * @param {Event} event - The click event triggered by user interaction.
 */
export const ControlCartAmountButtonEvent = (
  cartProducts,
  donutProducts,
  currentProducts,
  printProductDisplay,
  printCartProducts,
  showCartForFiveSeconds,
  cartElement,
  calcOrderDetails,
  printOrderDetails
) => {
  if (!cartProducts) {
    console.error("Cart container is missing.");
    return;
  }

  cartProducts.addEventListener("click", (event) => {
    const button = event.target.closest(
      ".product__button--decrease, .product__button--increase, .product__button--reset"
    );
    if (button) {
      const productId = parseInt(button.dataset.id, 10);
      const product = donutProducts.find((p) => p.id === productId);

      if (!product) {
        console.error(`Product with ID ${productId} not found.`);
        return;
      }

      if (button.classList.contains("product__button--decrease") && product.amount > 0) {
        product.amount--;
      } else if (button.classList.contains("product__button--increase")) {
        product.amount++;
      } else if (button.classList.contains("product__button--reset")) {
        product.amount = 0;
      }

      // Update all views and details
      printCartProducts(donutProducts);
      printProductDisplay(currentProducts);
      showCartForFiveSeconds(cartElement);

      const orderDetails = calcOrderDetails(donutProducts);
      printOrderDetails(orderDetails); // Ensure order details are updated here
    }
  });
};
