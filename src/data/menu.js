// src/data/menu.js

// 1. Import all four of your images
import customCake1 from "../assets/custom-cake1.jpeg";
import customCake2 from "../assets/custom-cake2.jpeg";
import customCake3 from "../assets/custom-cake3.jpeg";
import customCake4 from "../assets/custom-cake4.jpeg";

export const menuItems = [
  {
    id: 1,
    name: "Eggless Chocolate Delight",
    price: 1200.0,
    description:
      "Rich, completely eggless chocolate cake with a smooth, velvety finish.",
    image: customCake1,
  },
  {
    id: 2,
    name: "Eggless Vanilla Dream",
    price: 2500.0,
    description:
      "Soft and fluffy vanilla sponge, perfectly sweet and baked fresh.",
    image: customCake2,
  },
  {
    id: 3,
    name: "Eggless Butterscotch Crunch",
    price: 2800.0,
    description:
      "Sweet butterscotch layers topped with homemade crunchy praline.",
    image: customCake3,
  },
  {
    id: 4,
    name: "Signature Eggless Red Velvet",
    price: 3500.0,
    description:
      "Our premium eggless red velvet with rich cream cheese frosting.",
    image: customCake4,
  },
];
