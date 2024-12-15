import donutProducts from "/js/constructors/productConstructor.mjs"; 
import dates from "/js/modules/utilityFunctions/getDates.mjs";
import { calcTotProductPrice, calcOrderDetails, calcPrice } from "/js/modules/utilityFunctions/calcFunctions.mjs";
import printDisplayProducts from "/js/modules/printFunctions/printDisplay.mjs";
import printCartProducts from "/js/modules/printFunctions/printCart.mjs";
import printSummary from "/js/modules/printFunctions/printSummary.mjs";
import { printOrderDetails } from "/js/modules/printFunctions/printDetails.mjs";
import { filterByCategory, sortProducts, toggleImages, printBannerDetails } from "/js/modules/displayFunctions.mjs";
import { showCartForFiveSeconds } from "/js/modules/cartFunctions.mjs";
import { filterByCategoryEvent, sortingEvent, imageToggleEvent } from "/js/modules/eventFunctions/displayEvent.mjs";
import { toggleCartEvent, checkoutEvent } from "/js/modules/eventFunctions/cartEvents.mjs";
import { backToCartEvent} from "/js/modules/eventFunctions/orderEvent.mjs";
import { controlDisplayAmountButtonEvent, ControlCartAmountButtonEvent } from "/js/modules/eventFunctions/amountEvents.mjs";



// Rendera produkterna när sidan laddas
printDisplayProducts(donutProducts);
printBannerDetails(dates);
//Add the discounts, delivertytime and banner details to the page at load

//collectiong constants that is used through interaction with queryselectors
const cartProducts = document.getElementById("cartProducts");
const cartElement = document.getElementById("cart");
const cartButton = document.getElementById("showCart");

// giving the array currentProducts a changeble variable the default value as donutProducts before use
let currentProducts = donutProducts;


// Category filter and sorting
filterByCategoryEvent("filterCategories", donutProducts, filterByCategory, printDisplayProducts);
sortingEvent("sortingButtons", currentProducts, sortProducts, printDisplayProducts);

// Product display event
imageToggleEvent("displayProducts", toggleImages);

// Event handlers for product interactions
controlDisplayAmountButtonEvent(
  "displayProducts",
  donutProducts,
  currentProducts,
  printDisplayProducts,
  printCartProducts,
  showCartForFiveSeconds,
  cartElement,
  calcOrderDetails,
  printOrderDetails,

);

ControlCartAmountButtonEvent(
  cartProducts,
  donutProducts,
  currentProducts,
  printDisplayProducts,
  printCartProducts,
  showCartForFiveSeconds,
  cartElement,
  calcOrderDetails,
  printOrderDetails,

);

checkoutEvent(donutProducts, printSummary, calcOrderDetails, printOrderDetails);

// Cart toggle event
toggleCartEvent(cartElement, cartButton);
backToCartEvent();

console.log("Calculated order details:", calcOrderDetails(donutProducts));
