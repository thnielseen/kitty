import {Donut, donutProducts} from "/js/constructor/donutConstructor.mjs";
import printDisplayProducts from "/js/printFunctions/printDisplay.mjs";
import printCartProducts from "/js/printFunctions/printCart.mjs";
import printSummary from "/js/printFunctions/printSummary.mjs";
import dates from "/js/printFunctions/dates.mjs";


const productDisplay = document.getElementById("productDisplay");
const productCart = document.getElementById("cart");
const cartButton = document.getElementById("cartButton");
const headerCartIcon = document.getElementById("headerCartIcon");

const testDonutProducts = [
  new Donut(
    "Klassiker",
    { src: "assets/images/oldFashioned-img1.webp", alt: "Två gammeldags munkar med krispig yta placerade omlott, mot vit bakgrund" },
    { src: "assets/images/oldFashioned-img2.webp", alt: "En gammeldags munk med spröd och krispig yta, mot vit bakgrund" },
    "Old Fashioned",
    4,
    "Rustik och krispig munk med en spröd yta och saftig insida.",
    15,
    2, // Test med antal > 0
    1
  ),
  new Donut(
    "Fyllda Favoriter",
    { src: "assets/images/vanillaCream-img1.webp", alt: "Tre sockrade munkar staplade, översta genomskuren med vaniljkräm synlig, mot vit bakgrund" },
    { src: "assets/images/vanillaCream-img2.webp", alt: "En sockrad munk fylld med len vaniljkräm, mot vit bakgrund" },
    "Vaniljklassikern",
    4.5,
    "En klassisk sockrad munk fylld med len och krämig vanilj.",
    17,
    3, // Test med antal > 0
    9
  ),
  new Donut(
    "Fyllda Premium",
    { src: "assets/images/peanutChocolate-img1.webp", alt: "Chokladfylld munk doppad i jordnötssmör, mot vit bakgrund" },
    { src: "assets/images/peanutChocolate-img2.webp", alt: "Genomskuren chokladfylld munk doppad i jordnötssmör, mot vit bakgrund" },
    "Jordnötschokladdröm",
    4.5,
    "Fylld med len choklad-hasselnötskräm och doppad i jordnötssmör, toppad med extra chokladkräm för en perfekt kombination.",
    23,
    0, // Test med antal = 0
    10
  ),
  new Donut(
    "Klassiker",
    { src: "assets/images/sugar-img1.webp", alt: "Sockrad klassisk munk med hål, mot vit bakgrund" },
    { src: "assets/images/sugar-img2.webp", alt: "Sockrad klassisk munk med ett bett taget, mot vit bakgrund" },
    "Sockerdröm",
    4,
    "En klassiker – sockrad och perfekt för dig som älskar det enkla.",
    10,
    1, // Test med antal > 0
    3
  )
];


export function generateRatingIcons(rating, container) {
  container.innerHTML = ""; // Clears any previous content in the container

  const maxRating = 5; // Maximum rating value (e.g., 5 donuts)
  const icons = {
    filledDonut: "./assets/design/filledDonut.svg",
    halfFilledDonut: "./assets/design/halfFilledDonut.svg", 
    emptyDonut: "./assets/design/emptyDonut.svg", 
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

export const calcTotProductPrice = (product) => {
  if (product.amount >= 10) {
    return product.amount * product.price10p;
  } else {
    return product.amount * product.price;
  }
};


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

export const updateTotAmount = (products) => {
  const totAmount = document.getElementById("headerCartAmount");
  let newTotAmount = 0;

  // Summera produktmängderna
  products.forEach((product) => {
    newTotAmount += product.amount ?? 0; // Säkerställ att amount är ett nummer
  });

  // Uppdatera textinnehållet med den nya summan
  totAmount.textContent = newTotAmount;
};




// Definiera en global variabel för timeout
let cartTimeout = null;

export const toggleCartEvent = (cartElement, cartButton) => {
  if (!cartElement || !cartButton) {
    console.error("Cart element or button is missing.");
    return;
  }

  cartButton.addEventListener("click", () => {
    // Ta bort visually-hidden och lägg till toggle
    const isHidden = cartElement.classList.toggle("toggle");
    if (!isHidden) {
      cartElement.classList.add("curtain");
      headerCartIcon.innerText = "close";
    } else {
      cartElement.classList.remove("curtain");
      headerCartIcon.innerText = "shopping_cart";
    }

    // Markera att användaren manuellt öppnade/stängde kundkorgen
    cartElement.dataset.manuallyToggled = (!isHidden).toString();
  });
};

// Lägg till eventlyssnare för kundvagnsknappen
cartButton.addEventListener("click", () => {
  productCart.classList.toggle("visible");
  if (productCart.classList.contains("visible")) {
    // Avbryt eventuell tidigare timeout
    if (cartTimeout) {
      clearTimeout(cartTimeout);
    }
  } else {
    // Stäng automatiskt efter 5 sekunder om inte manuellt stängt
    cartTimeout = setTimeout(() => {
      productCart.classList.remove("visible");
    }, 5000); // Exempel på 5 sekunders timeout
  }
});

// Aktivera toggle-event
toggleCartEvent(productCart, cartButton);

// Print the initial products to the display
printDisplayProducts(testDonutProducts);
printCartProducts(testDonutProducts);
printSummary(testDonutProducts);
updateTotAmount(testDonutProducts);

