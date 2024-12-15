/** ------- PRINT ORDER DETAILS -------*
 * Updates the order details in the user interface based on calculated values.
 * This function updates the HTML elements with the cart details, including 
 * total cart amount, subtotal, discount, shipping cost, and total sum.
 * It uses the `details` object which contains these calculated values.
 * 
 * @param {Object} details - The object containing the calculated order details.
 * @param {number} details.totCartAmount - The total number of items in the cart.
 * @param {number} details.subTotal - The total price of items before discounts.
 * @param {number} details.discount - The total discount to be applied.
 * @param {number} details.shippingCost - The shipping cost based on the cart's content.
 * @param {number} details.actualSubTotal - The subtotal after discounts are applied.
 * @param {number} details.totCartSum - The final total amount of the order, including shipping and discounts.
 */
export const printOrderDetails = (details) => {
  const { totCartAmount, subTotal, discount, shippingCost, actualSubTotal, totCartSum } = details;

  // Update cart details
  const cartAmount = document.getElementById("headerCartAmount");
  const cartSubTotal = document.getElementById("cartSubTotal");
  const cartDiscount = document.getElementById("cartDiscount");
  const cartShipping = document.getElementById("cartShipping");
  const cartTotSum = document.getElementById("cartTotSum");

  if (cartAmount) cartAmount.innerHTML = `${Math.round(totCartAmount)}`;
  if (cartSubTotal) cartSubTotal.innerHTML = `${Math.round(subTotal)} `;
  if (cartDiscount) cartDiscount.innerHTML = `-${Math.round(discount)} `;
  if (cartShipping) cartShipping.innerHTML = `${Math.round(shippingCost)} `;
  if (cartTotSum) cartTotSum.innerHTML = `${Math.round(totCartSum)} `;

  // Update order details
  const orderSubTotal = document.getElementById("orderSubTotal");
  const orderDiscount = document.getElementById("orderDiscount");
  const orderShipping = document.getElementById("orderShipping");
  const orderTotSum = document.getElementById("orderTotSum");

  if (orderSubTotal) orderSubTotal.innerHTML = `${Math.round(actualSubTotal)} `;
  if (orderDiscount) orderDiscount.innerHTML = `-${Math.round(discount)}`;
  if (orderShipping) orderShipping.innerHTML = `${Math.round(shippingCost)}`;
  if (orderTotSum) orderTotSum.innerHTML = `${Math.round(totCartSum)} `;
};
