const data = [
  {
    img: `${process.env.PUBLIC_URL}/vetements/1.jpg`,
    title: 'T-shirt Violet 1',
    rating: 4,
    price: '40',
    description: 'T-shirt violet confortable, idéal pour un look décontracté.',
    color: 'violet',
    category: 'tshirt',
    taille: 'M'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/2.jpg`,
    title: 'Robe Blanche 2',
    rating: 5,
    price: '70',
    description: 'Robe blanche élégante, parfaite pour les occasions spéciales.',
    color: 'blanche',
    category: 'robe',
    taille :'L'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/3.jpg`,
    title: 'T-shirt Noir 3',
    rating: 3,
    price: '50',
    description: 'T-shirt noir classique, un must-have pour toute garde-robe.',
    color: 'noir',
    category: 'tshirt',
    taille :'XL'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/4.jpg`,
    title: 'Pull Rouge 4',
    rating: 4,
    price: '60',
    description: 'Pull rouge en laine, parfait pour l’hiver.',
    color: 'rouge',
    category: 'pull',
    taille :'XXL'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/5.jpg`,
    title: 'Pull Noir 5',
    rating: 4,
    price: '65',
    description: 'Pull noir en coton doux, pour un confort optimal.',
    color: 'noir',
    category: 'pull',
    taille : 'L'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/6.jpg`,
    title: 'T-shirt Violet 6',
    rating: 4,
    price: '45',
    description: 'T-shirt violet léger pour les journées chaudes.',
    color: 'violet',
    category: 'tshirt',
    taille: 'S'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/7.jpg`,
    title: 'Chemisette Grise 7',
    rating: 3,
    price: '55',
    description: 'Chemisette grise élégante, idéale pour l’été.',
    color: 'gris',
    category: 'chemisette',
    taille: 'M'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/8.jpg`,
    title: 'T-shirt Blanc 8',
    rating: 5,
    price: '40',
    description: 'T-shirt blanc basique, essentiel dans toute garde-robe.',
    color: 'blanc',
    category: 'tshirt',
    taille: 'XS'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/9.jpg`,
    title: 'T-shirt Rouge 9',
    rating: 4,
    price: '48',
    description: 'T-shirt rouge vif pour ajouter de la couleur à votre tenue.',
    color: 'rouge',
    category: 'tshirt',
    taille: 'M'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/10.jpg`,
    title: 'T-shirt Gris 10',
    rating: 3,
    price: '45',
    description: 'T-shirt gris confortable et polyvalent.',
    color: 'gris',
    category: 'tshirt',
    taille: 'L'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/11.jpg`,
    title: 'Veste Grise 11',
    rating: 5,
    price: '120',
    description: 'Veste grise élégante, idéale pour les soirées fraîches.',
    color: 'gris',
    category: 'veste',
    taille: 'XXL'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/12.jpg`,
    title: 'Veste Bleue 12',
    rating: 5,
    price: '130',
    description: 'Veste bleue moderne, parfaite pour un look urbain.',
    color: 'bleu',
    category: 'veste',
    taille: 'XL'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/13.jpg`,
    title: 'T-shirt Noir 13',
    rating: 4,
    price: '50',
    description: 'T-shirt noir basique, confortable et stylé.',
    color: 'noir',
    category: 'tshirt',
    taille: 'L'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/14.jpg`,
    title: 'Veste Noire 14',
    rating: 5,
    price: '135',
    description: 'Veste noire de qualité supérieure, idéale pour l’hiver.',
    color: 'noir',
    category: 'veste',
    taille: 'XXXL'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/15.jpg`,
    title: 'T-shirt Noir 15',
    rating: 4,
    price: '55',
    description: 'T-shirt noir, une pièce incontournable pour tous les styles.',
    color: 'noir',
    category: 'tshirt',
    taille: 'M'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/16.jpg`,
    title: 'Chemise Rouge 16',
    rating: 4,
    price: '65',
    description: 'Chemise rouge en coton, pour un look chic et décontracté.',
    color: 'rouge',
    category: 'chemise',
    taille: 'XL'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/17.jpg`,
    title: 'T-shirt Noir 17',
    rating: 3,
    price: '48',
    description: 'T-shirt noir de qualité, facile à porter tous les jours.',
    color: 'noir',
    category: 'tshirt',
    taille: 'S'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/18.jpg`,
    title: 'Robe Noire 18',
    rating: 5,
    price: '110',
    description: 'Robe noire élégante, parfaite pour un look de soirée.',
    color: 'noir',
    category: 'robe',
    taille: 'M'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/19.jpg`,
    title: 'Robe Rouge 19',
    rating: 4,
    price: '120',
    description: 'Robe rouge sophistiquée, pour une touche de glamour.',
    color: 'rouge',
    category: 'robe',
    taille: 'L'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/20.jpg`,
    title: 'Robe Rouge 20',
    rating: 4,
    price: '115',
    description: 'Robe rouge classique, pour un look élégant et intemporel.',
    color: 'rouge',
    category: 'robe',
    taille: 'XL'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/21.jpg`,
    title: 'Chemise Violette 21',
    rating: 5,
    price: '80',
    description: 'Chemise violette pour un look chic et raffiné.',
    color: 'violet',
    category: 'chemise',
    taille: 'L'
  },
  {
    img: `${process.env.PUBLIC_URL}/vetements/22.jpg`,
    title: 'T-shirt Rouge 22',
    rating: 4,
    price: '50',
    description: 'T-shirt rouge vif, idéal pour un look dynamique.',
    color: 'rouge',
    category: 'tshirt',
    taille: 'M'
  }
];

export default data;
