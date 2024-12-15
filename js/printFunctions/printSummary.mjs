import { generateRatingIcons, calcPrice} from "../script.mjs";

const printSummary = (products) => {
  const orderSummary = document.getElementById("orderSummary");

  if (!orderSummary) {
    console.error("Element 'orderSummary' not found.");
    return;
  }

  if (!Array.isArray(products)) {
    console.error("Invalid products array.");
    return;
  }

  console.log("Products to render:", products);

  // Rensa innehållet i orderSummary
  orderSummary.innerHTML = "";

  // Filtrera och rendera endast produkter med positiv kvantitet
  products.filter((product) => product.amount > 0).forEach((product, index) => {
    // Beräkna pris och totalpris med hjälp av calcPrice
    const { price, totalPrice } = calcPrice(product);

    console.log(`Rendering product: ${product.name}, Total price: ${totalPrice} kr`);

    // Skapa en ny lista för varje produkt
    const summaryList = document.createElement("li");
    summaryList.classList.add("order-summary__product");

    summaryList.innerHTML = `
      <article class="checkout__product__container" data-id="${product.id}">
        <img 
          class="order-summary__product__image"
          data-index="${index}"
          src="${product.firstImage.src}"
          alt="${product.firstImage.alt}"
          loading="lazy">
        <div class="order-summary__details">
          <h3 class="order-summary__name">${product.name}</h3>
          <p class="order-summary__quantity"><span>${product.amount ?? 0}</span> styck</p>
          <p class="order-summary__price">á <span>${price}</span> kr</p>        
          <p class="order-summary__total"><span>${totalPrice}</span> kr</p>
        </div>
      </article>
    `;

    // Lägg till produkten i orderSummary
    orderSummary.appendChild(summaryList);
  });
};

export default printSummary;
