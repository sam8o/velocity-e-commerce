import { Product } from '@/store/cartStore';

export const products: Product[] = [
  {
    id: '1',
    name: 'Velocity Pro Runner',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    category: 'Tênis',
    sport: 'Corrida',
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    description: 'Tênis de corrida premium com tecnologia de amortecimento avançada para máximo desempenho.',
    rating: 4.8,
    reviews: 234,
  },
  {
    id: '2',
    name: 'Street Force Elite',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80',
    category: 'Tênis',
    sport: 'Lifestyle',
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    description: 'Design urbano com conforto premium para o dia a dia.',
    rating: 4.6,
    reviews: 189,
  },
  {
    id: '3',
    name: 'Power Strike X',
    price: 219.99,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    category: 'Tênis',
    sport: 'Futebol',
    sizes: ['38', '39', '40', '41', '42', '43'],
    description: 'Chuteira profissional para domínio total em campo.',
    rating: 4.9,
    reviews: 312,
  },
  {
    id: '4',
    name: 'Flex Training Max',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    category: 'Tênis',
    sport: 'Treino',
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    description: 'Versátil e estável para todos os tipos de treino.',
    rating: 4.7,
    reviews: 156,
  },
  {
    id: '5',
    name: 'Air Boost Ultra',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80',
    category: 'Tênis',
    sport: 'Corrida',
    sizes: ['39', '40', '41', '42', '43', '44'],
    description: 'Tecnologia de ponta para corredores de elite.',
    rating: 4.9,
    reviews: 421,
  },
  {
    id: '6',
    name: 'Urban Classic',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80',
    category: 'Tênis',
    sport: 'Lifestyle',
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    description: 'Clássico reimaginado com materiais premium.',
    rating: 4.5,
    reviews: 278,
  },
  {
    id: '7',
    name: 'Court Dominator',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    category: 'Tênis',
    sport: 'Basquete',
    sizes: ['40', '41', '42', '43', '44', '45', '46'],
    description: 'Suporte lateral máximo para jogadas explosivas.',
    rating: 4.8,
    reviews: 198,
  },
  {
    id: '8',
    name: 'Trail Blazer Pro',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80',
    category: 'Tênis',
    sport: 'Corrida',
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    description: 'Grip excepcional para trilhas e terrenos irregulares.',
    rating: 4.7,
    reviews: 145,
  },
];

export const sports = [
  {
    id: 'corrida',
    name: 'Corrida',
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80',
    description: 'Supere seus limites',
  },
  {
    id: 'futebol',
    name: 'Futebol',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
    description: 'Domine o campo',
  },
  {
    id: 'treino',
    name: 'Treino',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    description: 'Evolua sempre',
  },
  {
    id: 'basquete',
    name: 'Basquete',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
    description: 'Voe mais alto',
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80',
    description: 'Estilo único',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsBySport = (sport: string): Product[] => {
  return products.filter((p) => p.sport.toLowerCase() === sport.toLowerCase());
};

export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 4);
};

export const getBestSellers = (): Product[] => {
  return [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
};
