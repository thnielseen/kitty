/* ----------------------------------------
   ~~~ CALCULATION FUNCTIONS ~~~
-----------------------------------------*/

// Import getDates as helper function
import dates from "/js/modules/utilityFunctions/getDates.mjs";

/* ------- CALCULATE TOTAL PRICE -------*
 * Calculates the total price for a product based on the quantity.
 * If the quantity is 10 or more, the bulk price is applied.
 * Otherwise, the regular price is used.
 * @param {Object} product - A product object containing price, bulk price, and quantity.
 * @returns {number} - The total price for the product.
 */
export const calcTotProductPrice = (product) => {
  if (product.amount >= 10) {
    return product.amount * product.price10p;
  } else {
    return product.amount * product.price;
  }
};


/**  ------- CALCULATE PRICE -------*
 * Calculates the total price for a product based on the quantity.
 * Modified to return an object containing original and discounted prices.
 * If the quantity is 10 or more, the bulk price is applied, otherwise, the regular price is used.
 * A weekend surcharge is applied if the current day is a weekend.
 * @param {Object} product - The product object containing the regular price, bulk price, and quantity.
 * @returns {Object} - An object containing the calculated prices: regular price, total price, bulk price, original price, and original total.
 */
export const calcPrice = (product) => {
  // Check if it's the weekend based on the criteria
  const isWeekend = dates.weekendCriteria;

  // Initialize variables for prices and quantity
  let originalPrice = product.price;
  let originalTotal = product.price * product.amount;
  let price = product.price;
  let amount = product.amount;
  let price10p = product.price10p;

  // Calculate initial total price
  let totalPrice = price * amount;

  // Apply bulk price if the quantity is 10 or more
  if (amount >= 10) {
    price = price10p;  // Use bulk price
    totalPrice = price * amount;  // Recalculate total price
  }

  // Apply weekend surcharge if applicable
  if (isWeekend) {
    if (amount < 10) {
      // For less than 10 items, apply 15% surcharge
      originalPrice = Math.round(price * 1.15); 
      originalTotal = Math.round(originalPrice * amount);
      price = Math.round(price * 1.15);
      totalPrice = Math.round(price * amount);
    } else {
      // For 10 or more items, apply 15% surcharge to bulk price
      originalPrice = Math.round(product.price * 1.15); 
      originalTotal = Math.round(product.price * 1.15 * amount);
      price = Math.round(price10p * 1.15);
      totalPrice = Math.round(price * amount);
    }
  }

  // Round prices to the nearest integer
  price = Math.round(price);
  totalPrice = Math.round(totalPrice);
  price10p = Math.round(price10p);
  originalPrice = Math.round(originalPrice);
  originalTotal = Math.round(originalTotal);

  // Return the calculated prices
  return { price, totalPrice, price10p, originalPrice, originalTotal };
};


/**  ------- CALCULATE ORDER DETAILS -------*
 * Calculates the total order details, including the subtotal, discounts, and shipping cost.
 * Iterates through the products to compute the total price, apply discounts, and determine the shipping cost.
 * Discounts are applied based on the day of the week (Monday and Tuesday discounts).
 * Shipping is free if there are 15 or more items in the cart.
 *
 * @param {Array} products - An array of product objects, each containing the price, quantity, and any applicable discounts.
 * @returns {Object} - An object containing the calculated order details:
 *   - total number of items (`totCartAmount`),
 *   - subtotal (`subTotal`),
 *   - total discount (`discount`),
 *   - shipping cost (`shippingCost`),
 *   - actual subtotal after discounts (`actualSubTotal`),
 *   - Monday discount value (`mondayDiscountValue`),
 *   - Tuesday discount value (`tuesdayDiscountValue`),
 *   - final total after all calculations (`totCartSum`).
 */
export const calcOrderDetails = (products) => {
  let totCartAmount = 0;
  let subTotal = 0;
  let discount = 0;
  let shippingCost = 0;
  let actualSubTotal = 0;
  let mondayDiscountValue = 0;
  let tuesdayDiscountValue = 0;

  const mondayDiscountCriteria = dates.mondayDiscountCriteria; // Använd dates
  const tuesdayDiscountCriteria = dates.tuesdayDiscountCriteria; // Använd dates

  products.forEach((product) => {
    const { totalPrice, originalTotal } = calcPrice(product);

    totCartAmount += product.amount;
    subTotal += originalTotal;
    actualSubTotal += totalPrice;
    discount += originalTotal - totalPrice;
  });

  // Beräkna frakt
  if (totCartAmount === 0) {
    shippingCost = 0;
  } else if (totCartAmount >= 15) {
    shippingCost = 0;
  } else {
    shippingCost = 25 + (actualSubTotal * 0.1);
  }

  let totCartSum = actualSubTotal + shippingCost;

  // Tillämpa måndagsrabatt
  if (mondayDiscountCriteria) {
    mondayDiscountValue = Math.round(totCartSum * 0.1);
    totCartSum -= mondayDiscountValue;
  }

  // Tillämpa tisdagsrabatt
  if (tuesdayDiscountCriteria && totCartSum > 25) {
    tuesdayDiscountValue = 25;
    totCartSum -= tuesdayDiscountValue;
  }

  return {
    totCartAmount,
    subTotal,
    discount,
    shippingCost,
    actualSubTotal,
    mondayDiscountValue,
    tuesdayDiscountValue,
    totCartSum,
  };
};

