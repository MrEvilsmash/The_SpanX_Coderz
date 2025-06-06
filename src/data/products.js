import diamondRing1 from '../assets/diamond-ring.jpg';
import diamondRing2 from '../assets/diamond-ring.jpg';
import goldNecklace from '../assets/diamond-ring.jpg';
import silverBracelet from '../assets/diamond-ring.jpg';

const allProducts = [
  {
    _id: 1,
    name: '22KT Gold Necklace',
    brand: 'Tanishq',
    category: 'Necklace',
    price: 87500,
    image: goldNecklace,
    material: 'Gold',
    purity: '22KT',
    weight: 18,
    description: 'Elegant 22KT gold necklace crafted for traditional occasions.',
    sizes: ['M', 'L'],
  },
  {
    _id: 2,
    name: 'Diamond Ring',
    brand: 'Malabar Gold',
    category: 'Ring',
    price: 45000,
    image: diamondRing1,
    material: 'Diamond',
    purity: '18KT',
    weight: 4,
    description: 'Sparkling diamond ring, perfect for engagements and gifts.',
    sizes: ['S', 'M'],
  },
  {
    _id: 3,
    name: 'Diamond Ring',
    brand: 'GRT',
    category: 'Ring',
    price: 400000,
    image: diamondRing2,
    material: 'Diamond',
    purity: '22KT',
    weight: 4,
    description: 'Elegant diamond ring with pure 22KT craftsmanship.',
    sizes: ['S', 'M'],
  },
  {
    _id: 4,
    name: 'Silver Bracelet',
    brand: 'PC Jeweller',
    category: 'Bracelet',
    price: 3500,
    image: silverBracelet,
    material: 'Silver',
    purity: '925',
    weight: 10,
    description: 'Classic silver bracelet with a modern touch.',
    sizes: ['Free Size'],
  },
];

export default allProducts;
