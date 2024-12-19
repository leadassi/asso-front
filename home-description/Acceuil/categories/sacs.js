const sacs = [
    {
      img: `${process.env.PUBLIC_URL}/sacs/1.jpeg`,
      title: 'A Dos Noir 1',
      rating: 4,
      price: '60',
      description: 'Sac à dos noir, pratique et élégant pour un usage quotidien.',
      color: 'noir',
      category: 'A dos'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/2.jpeg`,
      title: 'A Main Noir 2',
      rating: 5,
      price: '70',
      description: 'Sac à main noir chic, parfait pour toutes occasions.',
      color: 'noir',
      category: 'A main'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/3.jpeg`,
      title: 'A Main Marron 3',
      rating: 4,
      price: '75',
      description: 'Sac à main marron élégant, un must-have pour votre collection.',
      color: 'marron',
      category: 'A main'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/4.jpeg`,
      title: 'A Dos Bleu 4',
      rating: 4,
      price: '80',
      description: 'Sac à dos bleu moderne et spacieux pour vos affaires.',
      color: 'bleu',
      category: 'A dos'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/5.jpeg`,
      title: 'Voyage Rose 5',
      rating: 5,
      price: '100',
      description: 'Sac de voyage rose, parfait pour vos escapades de weekend.',
      color: 'rose',
      category: 'Voyage'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/6.jpeg`,
      title: 'A Main Rose 6',
      rating: 4,
      price: '65',
      description: 'Sac à main rose, léger et pratique.',
      color: 'rose',
      category: 'A main'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/7.jpeg`,
      title: 'A Main Noir 7',
      rating: 5,
      price: '85',
      description: 'Sac à main noir élégant et spacieux.',
      color: 'noir',
      category: 'A main'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/8.jpeg`,
      title: 'Voyage Noir 8',
      rating: 4,
      price: '90',
      description: 'Sac de voyage noir, robuste et polyvalent.',
      color: 'noir',
      category: 'Voyage'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/9.jpeg`,
      title: 'A Dos Blanc 9',
      rating: 4,
      price: '70',
      description: 'Sac à dos blanc moderne, idéal pour la vie urbaine.',
      color: 'blanc',
      category: 'A dos'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/10.jpeg`,
      title: 'A Main Blanc 10',
      rating: 3,
      price: '80',
      description: 'Sac à main blanc élégant, facile à assortir avec diverses tenues.',
      color: 'blanc',
      category: 'A main'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/11.jpeg`,
      title: 'A Dos Noir 11',
      rating: 5,
      price: '95',
      description: 'Sac à dos noir robuste, idéal pour les voyages.',
      color: 'noir',
      category: 'A dos'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/12.jpeg`,
      title: 'A Dos Rouge 12',
      rating: 4,
      price: '85',
      description: 'Sac à dos rouge vif, parfait pour un look dynamique.',
      color: 'rouge',
      category: 'A dos'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/13.jpeg`,
      title: 'A Main Vert 13',
      rating: 4,
      price: '75',
      description: 'Sac à main vert, un choix audacieux pour un look original.',
      color: 'vert',
      category: 'A main'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/14.jpeg`,
      title: 'Voyage Marron 14',
      rating: 4,
      price: '110',
      description: 'Sac de voyage marron, spacieux et pratique.',
      color: 'marron',
      category: 'Voyage'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/15.jpeg`,
      title: 'A Dos Marron 15',
      rating: 3,
      price: '65',
      description: 'Sac à dos marron, idéal pour un look casual.',
      color: 'marron',
      category: 'A dos'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/16.jpeg`,
      title: 'Voyage Violet 16',
      rating: 5,
      price: '120',
      description: 'Sac de voyage violet, pour ceux qui aiment les couleurs vives.',
      color: 'violet',
      category: 'Voyage'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/17.jpeg`,
      title: 'A Dos Blanc 17',
      rating: 4,
      price: '70',
      description: 'Sac à dos blanc, parfait pour l’été.',
      color: 'blanc',
      category: 'A dos'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/18.jpeg`,
      title: 'Voyage Violet 18',
      rating: 3,
      price: '115',
      description: 'Sac de voyage violet, une touche de couleur pour vos voyages.',
      color: 'violet',
      category: 'Voyage'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/19.jpeg`,
      title: 'Voyage Blanc 19',
      rating: 4,
      price: '125',
      description: 'Sac de voyage blanc, simple et élégant.',
      color: 'blanc',
      category: 'Voyage'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/20.jpeg`,
      title: 'Voyage Noir 20',
      rating: 4,
      price: '130',
      description: 'Sac de voyage noir, idéal pour les professionnels.',
      color: 'noir',
      category: 'Voyage'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/21.jpeg`,
      title: 'A Main Marron 21',
      rating: 5,
      price: '95',
      description: 'Sac à main marron, élégant et intemporel.',
      color: 'marron',
      category: 'A main'
    },
    {
      img: `${process.env.PUBLIC_URL}/sacs/22.jpeg`,
      title: 'A Main Rose 22',
      rating: 4,
      price: '85',
      description: 'Sac à main rose, idéal pour l’été.',
      color: 'rose',
      category: 'A main'
    }
];

export default sacs;
