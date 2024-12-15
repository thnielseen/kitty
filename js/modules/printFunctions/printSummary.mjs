import {calcPrice} from "/js/modules/utilityFunctions/calcFunctions.mjs"

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
      <article class="product__container" data-id="${product.id}">
        <img 
          class="product__image"
          data-index="${index}"
          src="${product.firstImage.src}"
          alt="${product.firstImage.alt}"
          loading="lazy">

        <div class="product__details">
          <h3 class="product__name">${product.name}</h3>
          <div class="product__info-row">
            <p class="product__quantity"><span>${product.amount ?? 0}</span> styck</p>
            <p class="product__price">á <span>${price}</span> kr</p>
          </div>
        </div>

        <p class="product__total"><span>${totalPrice}</span> kr</p>
      </article>

    `;

    // Lägg till produkten i orderSummary
    orderSummary.appendChild(summaryList);
  });
};

export default printSummary;
