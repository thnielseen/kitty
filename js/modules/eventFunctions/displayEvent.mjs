
/* -----------------------------
   ~~~ DISPLAY FUNCTIONS ~~~
------------------------------*/

//* ------- FILTER AND SORTING FUNCTIONS FOR DISPLAYED PRODUCTS -------*

/**------- FILTER - CATEGORY -------*
 * Add a change event listener to #categoryFilter.
 * 
 * 1. Listen for changes in the dropdown menu with the id "categoryFilter".
 * 2. On change:
 *    a. Get the selected value from the dropdown (e.g., "classics", "favorites", "premium", or "all").
 *    b. Filter the product list based on the selected category using `filterByCategory`.
 *    c. Update the global variable `currentProducts` with the filtered list.
 *    d. Render the filtered products on the page using `printDisplayProducts`.
 */
export const filterByCategoryEvent = (filterDropdownId, donutProducts, filterByCategory, printProductDisplay) => {
  const filterDropdown = document.getElementById(filterDropdownId);

  if (!filterDropdown) {
    console.error(`Elementet med ID '${filterDropdownId}' hittades inte.`);
    return;
  }

  filterDropdown.addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    console.log("Selected Category:", selectedCategory);

    const filteredProducts = filterByCategory(donutProducts, selectedCategory);
    console.log("Filtered Products:", filteredProducts);

    printProductDisplay(filteredProducts);
  });
};


/**------- SORTING BUTTONS -------*

 * Add a click event listener to #sortingButtons.
 * 
 * 1. Listen for click events within the element with the id "sortingButtons".
 * 2. On click:
 *    a. Check if the click occurred on a <button> element or one of its children
 *       (find the nearest <button> using .closest()).
 *    b. If a <button> element is found:
 *       - Get the sorting criterion from the button's `data-sort` attribute
 *         (e.g., "alpha", "price", "rating").
 *       - Sort a copy of the current list of products (`currentProducts`) based on the criterion
 *         using `sortProducts`. This prevents direct modification of the original array.
 *       - Render the sorted products on the page using `printDisplayProducts`.
 */
export const sortingEvent = (sortingButtonsId, currentProducts, sortProducts, printProductDisplay) => {
  const sortingButtons = document.getElementById(sortingButtonsId);

  if (!sortingButtons) {
    console.error(`Elementet med ID '${sortingButtonsId}' hittades inte.`);
    return;
  }

  sortingButtons.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (target) {
      const sortBy = target.getAttribute("data-sort");
      console.log("Sorting Criterion:", sortBy);

      const sortedProducts = sortProducts([...currentProducts], sortBy);
      console.log("Sorted Products:", sortedProducts);

      printProductDisplay(sortedProducts);
    }
  });
};



//* ------- FUNCTIONS FOR THE PRODUCTS IN THE DISPLAY-VIEW -------*

/**------- SWITCH PRODUCT IMG-------*
 *
 * Handle clicks on the product image navigation buttons.
 * 
 * 1. Listens for click events on the element with the ID "displayProducts".
 * 2. If a button is clicked:
 *    a. Checks if the clicked element is a <button> or contains a <button> (using .closest()).
 *    b. If a valid button with a "direction" data attribute is found:
 *       - Find the nearest product image container (.display__product__image-content).
 *       - Based on the direction (right or left), toggle the images by calling toggleImages.
 */
export const imageToggleEvent = (productDisplayId, toggleImages) => {
  const displayProducts = document.getElementById(productDisplayId);

  if (!displayProducts) {
    console.error(`Elementet med ID '${productDisplayId}' hittades inte.`);
    return;
  }

  displayProducts.addEventListener("click", (event) => {
    const target = event.target.closest(".display__product__switchButton");
    if (target && target.dataset.direction) {
      const direction = target.dataset.direction;
      const productContainer = target.closest(".display__product__image-content");
      if (productContainer) {
        toggleImages(direction, productContainer);
      } else {
        console.warn("Product container kunde inte hittas.");
      }
    }
  });
};


