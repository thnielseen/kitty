
/* -----------------------------
   ~~~ DISPLAY FUNCTIONS ~~~
------------------------------*/
import dates from "/js/modules/utilityFunctions/getDates.mjs";
//* ------- FILTER AND SORTING FUNCTIONS FOR DISPLAYED PRODUCTS -------*

/**------- FILTER - CATEGORY -------*
 * Filters products based on the selected category and updates the category heading in the UI.
 * 
 * @param {Array} products - List of products to filter.
 * @param {string} selectedCategory - The selected category ("classics", "favorites", "premium", or "all").
 * 
 * Functionality:
 * 1. Updates the category heading (`#displayCategoryHeading`) based on the selected category.
 * 2. Filters the products by:
 *    - "classics" → Includes "klassiker" products.
 *    - "favorites" → Includes "fyllda favoriter" products.
 *    - "premium" → Includes "fyllda premium" products.
 *    - "all" or no category → Includes all products.
 * 
 * @returns {Array} - A filtered list of products matching the selected category.
 */

export const filterByCategory = (products, selectedCategory) => {
  const productCategory = [];
  const categoryHeadingElement = document.querySelector("#displayCategoryHeading");

  // Update the heading based on the selected category
  if (categoryHeadingElement) {
    switch (selectedCategory?.toLowerCase()) {
      case "classics":
        categoryHeadingElement.innerHTML = "Gottfrids klassiker";
        break;
      case "favorites":
        categoryHeadingElement.innerHTML = "Gottfrids fyllda favorit munkar";
        break;
      case "premium":
        categoryHeadingElement.innerHTML = "Gottfrids lyxiga fyllda munkar";
        break;
      default:
        categoryHeadingElement.innerHTML = "Gottfrids Munkar";
        break;
    }
  }

  // Filter products by category
  products.forEach((product) => {
    if (selectedCategory?.toLowerCase() === "classics" && product.category.toLowerCase() === "klassiker") {
      productCategory.push(product);
    } else if (selectedCategory?.toLowerCase() === "favorites" && product.category.toLowerCase() === "fyllda favoriter") {
      productCategory.push(product);
    } else if (selectedCategory?.toLowerCase() === "premium" && product.category.toLowerCase() === "fyllda premium") {
      productCategory.push(product);
    } else if (!selectedCategory || selectedCategory.toLowerCase() === "all") {
      // If no category is selected or "all" is selected, include all products
      productCategory.push(product);
    }
  });

  return productCategory;
};


/**------- SORTING BUTTONS -------*
 * Sorts products based on the given sorting criterias.
 * 
 * @param {Array} products - List of products to be sorted.
 * @param {string} sortBy - The sorting criterion ("alpha", "price", "rating").
 * 
 * Functionality:
 * 1. Checks the value of `sortBy`:
 *    - "alpha": Sorts products alphabetically by name.
 *    - "price": Sorts products by price in ascending order.
 *    - "rating": Sorts products by rating in descending order (highest rating first).
 * 2. If no valid sorting criterion is provided, returns the products as-is.
 * 
 * @returns {Array} - A sorted list of products.
 */

export const sortProducts = (products, sortBy) => {
  switch (sortBy) {
    case "alpha":
      return products.sort((productA, productB) => productA.name.localeCompare(productB.name)); // Sort alphabetically by product name
    case "price":
      return products.sort((productA, productB) => productA.price - productB.price); // Sort by price in ascending order
    case "rating":
      return products.sort((productA, productB) => productB.rating - productA.rating); // Sort by rating in descending order (highest rating first)
    default:
      return products; // If no sorting criterion is provided, return products as is
  }
};

//* ------- FUNCTIONS FOR THE PRODUCTS IN THE DISPLAY-VIEW -------*

/**------- SWITCH PRODUCT IMG-------*
 * Toggles visibility between two images within a container.
 *
 * @param {string} direction - The direction to toggle the image visibility ("right" or "left").
 * @param {HTMLElement} container - The element containing the two images.
 *
 * Functionality:
 * 1. Retrieves the primary and secondary images from the container using their respective classes.
 * 2. Checks the direction ("right" or "left").
 * 3. Toggles visibility:
 *    - If the direction is "right":
 *      - Hides the primary image (adds "visually-hidden").
 *      - Shows the secondary image (removes "visually-hidden").
 *    - If the direction is "left":
 *      - Shows the primary image (removes "visually-hidden").
 *      - Hides the secondary image (adds "visually-hidden").
 */


export const toggleImages = (direction, container) => {
  const product__imagePrimary = container.querySelector(".product__image--primary");
  const product__imageSecondary = container.querySelector(".product__image--secondary");


  if (direction === "right") {
    // Hide primary - display secondary image.
    product__imagePrimary.classList.add("visually-hidden");
    product__imageSecondary.classList.remove("visually-hidden");
  } else if (direction === "left") {
    // Display primary - hide secondary image.
    product__imagePrimary.classList.remove("visually-hidden");
    product__imageSecondary.classList.add("visually-hidden");
  }
};

/**------- RATING ICONS -------*
 * Generates and appends rating icons (donut style) based on the provided rating value.
 *
 * Functionality:
 * 1. Clears any existing content in the container to ensure fresh rendering.
 * 2. Iterates over a predefined maximum rating value (5 by default).
 * 3. Determines the appropriate icon for each rating step:
 *    - A filled donut for ratings greater than or equal to the current step.
 *    - A half-filled donut for ratings greater than or equal to the current step minus 0.5.
 *    - An empty donut for all other cases.
 * 4. Appends each icon to the container.
 * 5. Adds an accessible description (`aria-hidden="true"`) for screen readers.
 * 
 * @param {number} rating - The rating value (e.g., 3.5).
 * @param {HTMLElement} container - The container element where rating icons are appended.
 */

export function generateRatingIcons(rating, container) {
  container.innerHTML = ""; // Clears any previous content in the container

  const maxRating = 5; // Maximum rating value (e.g., 5 donuts)
  const icons = {
    filledDonut: "./assets/icons/filledDonut.svg", 
    halfFilledDonut: "./assets/icons/halfFilledDonut.svg", 
    emptyDonut: "./assets/icons/emptyDonut.svg", 
  };

  // Loop through each rating value (from 1 to maxRating)
  for (let i = 1; i <= maxRating; i++) {
    const icon = document.createElement("img"); 
    icon.classList.add("ratingIcon"); 
    icon.setAttribute("aria-hidden", "true"); // Mark the icon as hidden for screen readers

    // Determine which icon to display based on the rating value
    if (rating >= i) {
      // If the rating is equal to or greater than the current iteration, show a filled donut
      icon.src = icons.filledDonut;
    } else if (rating >= i - 0.5) {
      // If the rating is greater than or equal to the current iteration minus 0.5, show a half-filled donut
      icon.src = icons.halfFilledDonut;
    } else {
      // If the rating is less than the current iteration, show an empty donut
      icon.src = icons.emptyDonut;
    }
    container.appendChild(icon); 
  }

  // Add a visually hidden description for accessibility
  const textDescription = document.createElement("span");
  textDescription.textContent = `Betyg: ${rating} av 5`; // Description: "Rating: {rating} of 5"
  textDescription.classList.add("visually-hidden"); 
  container.appendChild(textDescription); // Append the description to the container
}

/** UPDATES DELIVERY TIME 
 * Updates the delivery time details dynamically based on specific delivery criteria.
 
 * Functionality:
 * 1. Checks for delivery criteria such as meeting deliveries, night deliveries, and weekend deliveries
 *    using conditions from the `dates` object.
 * 2. Updates the delivery time displayed in two DOM elements:
 *    - `#bannerDelivery`: Banner displaying the delivery time.
 *    - `#finalDelivery`: Confirmation message for delivery time.
 * 3. Logs the delivery type and time to the console for debugging.
 * 4. Warns if the required DOM elements are not found.
 */
export const printDeliveryTime = () => {
  let deliveryTime = "30 minuter"; // Default delivery time

  // Check delivery criteria from the dates object
  if (dates.meetingDeliveryCriteria) {
    deliveryTime = "något längre - leverans sker 15.00";
    console.log("Delivery: Lunch meeting, delivery at 15:00");
  } else if (dates.nightDeliveryCriteria) {
    deliveryTime = "45 minuter";
    console.log("Delivery: Night delivery, 45 minutes");
  } else if (dates.weekendDeliveryCriteria) {
    deliveryTime = "90 minuter";
    console.log("Delivery: Weekend delivery, 90 minutes");
  } else {
    console.log("Delivery: Standard delivery, 30 minutes");
  }

  // Get DOM elements
  const timeToDeliveryBanner = document.querySelector("#bannerDelivery");
  const timeToDeliveryConfirmation = document.querySelector("#finalDelivery");

  // Update the banner with delivery time
  if (timeToDeliveryBanner) {
    timeToDeliveryBanner.textContent = deliveryTime;
  } else {
    console.warn("Element '#bannerDelivery' not found.");
  }

  // Update the confirmation message with delivery time
  if (timeToDeliveryConfirmation) {
    timeToDeliveryConfirmation.textContent = deliveryTime;
  } else {
    console.warn("Element '#finalDelivery' not found.");
  }
};

/** UPDATES BANNER DETAILS
 * Dynamically updates banner details based on specific date-related criteria.
 *
 * Features:
 * 1. Verifies the existence of the `#bannerDetails` container before making updates.
 * 2. Clears previous content from the `#bannerDetails` container to ensure fresh rendering.
 * 3. Displays banners for active discounts or offers:
 *    - **Monday Discount**: 10% discount on all products before 10:00 AM.
 *    - **Tuesday Discount (Odd Week)**: 10% discount on purchases over 25 SEK, valid only today.
 *    - **Lucia Offer**: A free gift with every order on December 13th.
 * 4. Adds a fallback message if no criteria are met.
 * 5. Logs a confirmation or error message to the console.
 *
 * Updated Element:
 * - `#bannerDetails`: Container for dynamically generated banners.
 */

export const printBannerDetails = () => {
  const bannerContainer = document.querySelector("#bannerDetails");

  // Kontrollera att elementet finns
  if (!bannerContainer) {
    console.error("Elementet 'bannerDetails' saknas.");
    return;
  }

  // Töm innehållet i sektionen
  bannerContainer.innerHTML = "";

  let hasDiscount = false; // Track if any discount is active

  // Bygg HTML för banners
  if (dates.mondayDiscountCriteria) {
    bannerContainer.innerHTML += `
      <li class="banner--monday">📅 Måndagsrabatt! 10% på alla produkter före 10:00.</li>`;
    hasDiscount = true;
  }
  if (dates.tuesdayDiscountCriteria && !dates.isEvenWeek) {
    bannerContainer.innerHTML += `
      <li class="banner--unevenTuesday">🎉 Tisdagsrabatt! 10% på köp över 25 kr - endast idag!</li>`;
    hasDiscount = true;
  }
  if (dates.isLucia) {
    bannerContainer.innerHTML += `
      <li class="banner--lucia">🌟 Glad Lucia! En gåva med varje beställning idag.</li>`;
    hasDiscount = true;
  }

  // Om inga kriterier är uppfyllda
  if (!hasDiscount) {
    bannerContainer.innerHTML = `<li class="banner--none">De funkar</li>`;
  }

  console.log("Banners för 'bannerDetails' uppdaterade.");
};