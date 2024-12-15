/**
 * Class representing a Donut product, used to define donut items for the webshop.
 *
 * Each donut has properties like category, images, name, rating, description, price, and quantity.
 * It also calculates the discounted price based on the original price.
 */
class Donut {
  constructor(
    // Defining the parameters of the donut object:
    category,
    firstImage,
    secondImage,
    name,
    rating,
    description,
    price,
    amount,
    id,
  ) {
    // Defining the properties of the donut object:
    this.category = category;
    this.firstImage = firstImage; 
    this.secondImage = secondImage;
    this.name = name;
    this.rating = rating;
    this.description = description;
    this.price = price;
    this.price10p = this.calculateDiscountedPrice();
    this.amount = amount;
    this.id = id;
  }

  /**
   * Calculates the price after a 10% discount.
   * @returns {number} - The discounted price, rounded to the nearest integer.
   */
  calculateDiscountedPrice() {
    return Math.round(this.price * 0.9);
  }
}


/**
 * Array of Donut objects, each representing a different donut product for the webshop.
 * The donuts have predefined properties such as category, name, images, rating, and price.
 */
const donutProducts = [
  new Donut(
    "Klassiker",
    { src: "assets/images/oldFashioned-img1.webp", alt: "Två gammeldags munkar med krispig yta placerade omlott, mot vit bakgrund" },
    { src: "assets/images/oldFashioned-img2.webp", alt: "En gammeldags munk med spröd och krispig yta, mot vit bakgrund" },
    "Old Fashioned",
    4,
    "Rustik och krispig munk med en spröd yta och saftig insida.",
    15,
    0,
    1
  ),
  new Donut(
    "Klassiker",
    { src: "assets/images/glazed-img1.webp", alt: "Två glaserade ringmunkar placerade på vit bakgrund" },
    { src: "assets/images/glazed-img2.webp", alt: "En enkel glaserad ringmunk mot vit bakgrund" },
    "Glaserad Klassiker",
    4.5,
    "Klassisk munk med tunn glasyr – en lätt och söt favorit.",
    11,
    0,
    2
  ),
  new Donut(
    "Klassiker",
    { src: "assets/images/sugar-img1.webp", alt: "Sockrad klassisk munk med hål, mot vit bakgrund" },
    { src: "assets/images/sugar-img2.webp", alt: "Sockrad klassisk munk med ett bett taget, mot vit bakgrund" },
    "Sockerdröm",
    4,
    "En klassiker – sockrad och perfekt för dig som älskar det enkla.",
    10,
    0,
    3
  ),
  new Donut(
    "Klassiker",
    { src: "assets/images/cinnamonSugar-img1.webp", alt: "En ringmunk rullad i kanel och socker, mot vit bakgrund" },
    { src: "assets/images/cinnamonSugar-img2.webp", alt: "En ringmunk med kanel och socker, mot vit bakgrund" },
    "Kanelklassiker",
    4.5,
    "En kryddig twist på klassikern, med smakrik kanel och socker.",
    11,
    0,
    4
  ),
  new Donut(
    "Klassiker",
    { src: "assets/images/chocolateGlazed-img1.webp", alt: "En munk täckt med rik chokladglasyr, mot vit bakgrund" },
    { src: "assets/images/chocolateGlazed-img2.webp", alt: "En chokladglaserad munk, perfekt rund och täckt med glasyr, mot vit bakgrund" },
    "Chokladdröm",
    4.5,
    "En klassisk munk toppad med en söt och fyllig chokladglasyr.",
    13,
    0,
    5
  ),
  new Donut(
    "Klassiker",
    { src: "assets/images/rasperrySprinkle-img1.webp", alt: "En hallonglasserad munk toppad med färgglatt strössel och ett bett taget, mot vit bakgrund" },
    { src: "assets/images/rasperrySprinkle-img2.webp", alt: "En klassisk munk täckt med hallonglasyr och strössel, mot vit bakgrund" },
    "Hallonfest",
    4.5,
    "Klassisk munk med hallonglasyr och färgglatt strössel för en söt och festlig smakupplevelse.",
    13,
    0,
    6
  ),
  new Donut(
    "Fyllda Favoriter",
    { src: "assets/images/rasperryJelly-img1.webp", alt: "En sockrad munk fylld med hallonsylt, mot vit bakgrund" },
    { src: "assets/images/rasperryJelly-img2.webp", alt: "En genomskuren sockrad munk fylld med hallonsylt, mot vit bakgrund" },
    "Hallonfrestelse",
    4.5,
    "Sockrad och fylld med sötsyrlig hallonsylt – en fyllig favorit.",
    17,
    0,
    7
  ),
  new Donut(
    "Fyllda Favoriter",
    { src: "assets/images/chocolateCream-img1.webp", alt: "En florsockrad munk fylld med rik chokladkräm, mot vit bakgrund" },
    { src: "assets/images/chocolateCream-img2.webp", alt: "En genomskuren florsockrad munk med chokladkrämfyllning, mot vit bakgrund" },
    "Chokladdröm",
    5,
    "En florsockrad munk med lyxig chokladkräm inuti – en dröm för chokladälskare.",
    17,
    0,
    8
  ),
  new Donut(
    "Fyllda Favoriter",
    { src: "assets/images/vanillaCream-img1.webp", alt: "Tre sockrade munkar staplade, översta genomskuren med vaniljkräm synlig, mot vit bakgrund" },
    { src: "assets/images/vanillaCream-img2.webp", alt: "En sockrad munk fylld med len vaniljkräm, mot vit bakgrund" },
    "Vaniljklassikern",
    4.5,
    "En klassisk sockrad munk fylld med len och krämig vanilj.",
    17,
    0,
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
    0,
    10
  ),
  new Donut(
    "Fyllda Premium",
    { src: "assets/images/rasperryJamSprinkle-img1.webp", alt: "Hallonsyltfylld munk doppad i choklad och toppad med färgglatt strössel, mot vit bakgrund" },
    { src: "assets/images/rasperryJamSprinkle-img2.webp", alt: "Genomskuren hallonsyltfylld munk doppad i choklad och toppad med strössel, mot vit bakgrund" },
    "Hallonchokladglädje",
    4,
    "Fylld med söt hallonsylt, doppad i chokladfondant och toppad med färgglatt strössel för en festlig smakupplevelse.",
    23,
    0,
    11
  ),

  new Donut(
    "Fyllda Premium",
    { src: "assets/images/caramelCrunch-img1.webp", alt: "Munk fylld med saltkaramellkräm, doppad i karamellglasyr och toppad med crunch, mot vit bakgrund" },
    { src: "assets/images/caramelCrunch-img2.webp", alt: "Genomskuren munk fylld med saltkaramellkräm, doppad i karamellglasyr och toppad med crunch, mot vit bakgrund" },
    "Saltkaramell Crunch",
    5,
    "Fylld med salt karamellkräm, doppad i karamellglasyr och toppad med knaprig crunch – en balans av sött och salt.",
    23,
    0,
    12
)

];

export default donutProducts;
