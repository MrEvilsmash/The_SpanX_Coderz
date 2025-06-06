// src/data/offers.js
import summerSale from '../assets/offersale.jpg';       // actual filename and path
import newArrivals from '../assets/offersale1.jpg';
import festiveOffer from '../assets/offersale1.jpg'; // if you have this image, else adjust accordingly

const offers = [
  {
    id: 1,
    title: "Summer Sale - Up to 30% Off!",
    description: "Grab your favorite jewelry at amazing prices this summer.",
    image: summerSale,  // use imported image variable
    link: "/products?category=Sale",
  },
  {
    id: 2,
    title: "New Arrivals: Exclusive Designs",
    description: "Check out our newest collections and shine bright.",
    image: newArrivals,  // use imported image variable
    link: "/products?category=New",
  },
  {
    id: 3,
    title: "Festive Offer: Buy 1 Get 1 Free",
    description: "Celebrate with our special festive offers!",
    image: festiveOffer,  // use imported image variable
    link: "/products?category=Festive",
  },
];

export default offers;
