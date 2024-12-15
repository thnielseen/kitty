/* -----------------------------
   ~~~ DISPLAY FUNCTIONS ~~~
------------------------------*/

/**------- DISPLAY CART 4s -------*
 * Temporarily shows the cart for 4 seconds before hiding it again automatically when updated.
 * 
 * Functionality:
 * 1. Removes the "visually-hidden" class from the cart element to make it visible.
 * 2. Clears any existing timeout to avoid conflicting actions.
 * 3. Sets a new timeout to reapply the "visually-hidden" class after 5 seconds, hiding the cart again automatically.
 * 
 * @param {HTMLElement} cartElement - The cart element to show temporarily.
 */

export const showCartForFiveSeconds = (cartElement) => {
  //Make cart visible
  cartElement.classList.remove("visually-hidden");

  //Clear existing timeout to resolve conflicts
  if (cartElement.showTimeout) {
    clearTimeout(cartElement.showTimeout);
  }

  //Set a new timer to hide the cart after 4 seconds
  cartElement.showTimeout = setTimeout(() => {
    cartElement.classList.add("visually-hidden");
  }, 4000);
};


