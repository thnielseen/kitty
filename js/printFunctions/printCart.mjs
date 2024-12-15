import { generateRatingIcons, calcPrice} from "../script.mjs";

/**
 * Renders the cart products in HTML with detailed pricing calculations.
 * 
 * Functionality:
 * 1. Clears any existing content in the cart element to ensure it's updated dynamically.
 * 2. Filters the product list to include only products with a positive quantity (`amount` > 0).
 * 3. For each product:
 *    - Calculates prices (regular price, total price, and bulk price) using the `calcPrice` function.
 *    - Generates an HTML structure containing:
 *      - Product image with accessible alt text.
 *      - Product name and calculated price.
 *      - Controls to increase, decrease, or reset the product quantity.
 *      - The calculated total price for the product.
 * 4. Appends each rendered product's HTML structure to the cart list.
 * 
 * @param {Array} products - A list of products to render in the cart. Each product contains:
 *   - `id` (Number): A unique identifier for the product.
 *   - `firstImage` (Object): The primary image source and alt text for the product.
 *   - `name` (String): The name of the product.
 *   - `amount` (Number): The quantity of the product in the cart.
 *   - `price` (Number): The base price per unit of the product.
 *   - `price10p` (Number): The bulk price per unit for orders of 10 or more.
 * 
 * Uses:
 * - `calcPrice`: Calculates the product's regular price, total price, and bulk price dynamically.
 * 
 * @returns {void} - This function does not return anything but updates the DOM.
 */
  const printCartProducts = (products) => {
  const cartProducts = document.getElementById("cartProducts");

  // Clear previous content before rendering new products
  cartProducts.innerHTML = "";

  // Filter and render only products with a positive amount
  products.filter((product) => product.amount > 0).forEach((product, index) => {
    // Destructure calculated prices from the calcPrice helper function
    const { price, totalPrice } = calcPrice(product);

    // Create a list item for the product
    const productList = document.createElement("li");
    productList.classList.add("product");

    // Generate the HTML structure for the product
    productList.innerHTML = `
      <article class="product__container" data-id="${product.id}">
        <img 
          class="product__image"
          data-index="${index}"
          src="${product.firstImage.src}"
          alt="${product.firstImage.alt}"
          loading="lazy">
            
        <div class="product__info">
          <h2 class="product__name">${product.name}</h2>
          <span class="product__price">${price} kr</span>
        </div>
        <div class="product__amount">
          <button class="product__button product__button product__button--decrease" data-id="${product.id}" aria-label="Minska antal">
            <span class="material-symbols-rounded" aria-hidden="true">remove</span>
          </button>
          <p class="product__quantity"><span>${product.amount ?? 0}</span></p>
          <button class="product__button product__button product__button--increase" data-id="${product.id}" aria-label="Öka antal">
            <span class="material-symbols-rounded" aria-hidden="true">add</span>
          </button>
        </div>
        <div class="product__total-price">
          <p>Total: <span class="product__total-price-value">${totalPrice}</span> kr</p>
        </div>
        <button class="product__button product__button product__button--reset" 
          data-id="${product.id}" 
          aria-label="Ta bort produkt">
          <span class="material-symbols-rounded" 
            aria-hidden="true">
            delete
          </span>
        </button>
      </article>
    `;

    // Append the generated product structure to the cart list
    cartProducts.appendChild(productList);
  });
};

export default printCartProducts;