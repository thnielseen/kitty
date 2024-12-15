import {generateRatingIcons} from "/js/modules/displayFunctions.mjs";
import {calcPrice} from "/js/modules/utilityFunctions/calcFunctions.mjs"



/**
 * Renders a list of products in HTML with updated pricing and image handling.
 *
 * This function:
 * 1. Clears the existing content in the product display area.
 * 2. Renders each product's details including images, name, description, pricing,
 *    and quantity controls.
 * 3. Calculates and displays the total price using `calcPrice`.
 * 4. Generates and appends product rating icons based on the product's rating.
 *
 * @param {Array} products - A list of product objects where each product contains:
 *   - `firstImage`, `secondImage` (Object): Image sources and alt text for the product's images.
 *   - `name` (String): The name of the product.
 *   - `rating` (Number): The product's rating (used for generating rating icons).
 *   - `description` (String): A brief description of the product.
 *   - `price` (Number): The price per unit of the product.
 *   - `price10p` (Number): The price per unit if 10 or more units are purchased.
 *   - `amount` (Number): The quantity of the product in the cart.
 *   - `id` (Number): Unique identifier for the product.
 *
 * Uses:
 * - `calcPrice`: Calculates the product's regular and total price including bulk pricing.
 * - `generateRatingIcons`: Generates rating icons based on the product's rating.
 *
 * @returns {void} - This function does not return anything but modifies the DOM.
 */
const printDisplayProducts = (products) => {
  const productDisplay = document.getElementById("displayProducts"); // Uppdaterat ID

  if (!productDisplay) {
    console.error("Element with ID 'productDisplay' not found.");
    return;
  }

  // Clear the existing product display content
  productDisplay.innerHTML = "";

  // Loop through each product and render its details
  products.forEach((product, index) => {
    const { price, totalPrice, price10p } = calcPrice(product);

    const productArticle = document.createElement("article");
    productArticle.classList.add("product");

    productArticle.innerHTML = `
      <div class="product__image-content">
        <button
          class="product__switchButton"
          data-direction="left"
          data-index="${index}"
          aria-label="Visa föregående bild av ${product.name}">
          <span class="material-symbols-rounded" aria-hidden="true">chevron_left</span>
        </button>
        <figure class="product__figure" data-image-state="primary">
          <img
            class="product__image product__image--primary"
            data-index="${index}"
            src="${product.firstImage.src}"
            alt="${product.firstImage.alt}"
            loading="lazy">
          <img
            class="product__image product__image--secondary visually-hidden"
            data-index="${index}"
            src="${product.secondImage.src}"
            alt="${product.secondImage.alt}"
            loading="lazy">
        </figure>
        <button
          class="product__switchButton"
          data-direction="right"
          data-index="${index}"
          aria-label="Visa nästa bild av ${product.name}">
          <span class="material-symbols-rounded" aria-hidden="true">chevron_right</span>
        </button>
      </div>
      <div class="rating-container" id="productRating-${product.id}"></div>
      <h4 class="product__name">${product.name}</h4>
      <p class="product__description">${product.description}</p>
      <p>
        <span>${price} <span>kr/styck</span></span>
      </p>
      <div class="product__amount">
        <button
          type="button"
          class="product__button product__button product__button--decrease"
          data-id="${product.id}"
          aria-label="Minska antal av ${product.name} i kundkorgen">
          <span class="material-symbols-rounded" aria-hidden="true">remove</span>
        </button>
        <p class="product__quantity">
          <span>${product.amount ?? 0}</span>
        </p>
        <button
          type="button"
          class="product__button product__button product__button--increase"
          data-id="${product.id}"
          aria-label="Lägg till en ${product.name} i kundkorgen">
          <span class="material-symbols-rounded" aria-hidden="true">add</span>
        </button>
      </div>
      <div class="product__bulk-price">
        <p>
          Vid köp av tio <span class="bulk-price__name">${product.name}</span>
          <span>${price10p}</span> kr/styck
        </p>
      </div>
      <div class="product__total-price">
        <p>Totalt: <span class="totalPrice">${totalPrice}</span> kr</p>
      </div>
    `;

    productDisplay.appendChild(productArticle);

    const ratingContainer = document.getElementById(`productRating-${product.id}`);
    generateRatingIcons(product.rating, ratingContainer);
  });
};
export default printDisplayProducts;