export type MenuCategory =
  | 'hot-drinks'
  | 'cold-drinks'
  | 'food'
  | 'baked-goods'

export interface MenuItem {
  id:          string
  name:        string
  description: string
  price:       number
  category:    MenuCategory
  categoryLabel: string
  image:       string
  calories:    number
  popular:     boolean
  tags:        string[]
  sizes?:      { label: string; price: number }[]
  customizable: boolean
}

export const menuItems: MenuItem[] = [
  // ── HOT DRINKS ──────────────────────────────────────────
  {
    id:            'original-blend',
    name:          'Original Blend Coffee',
    description:   'Our signature medium roast, freshly brewed every 20 minutes for the perfect cup every time.',
    price:         2.19,
    category:      'hot-drinks',
    categoryLabel: 'Hot Drinks',
    image:         '/images/menu/original-blend.jpg',
    calories:      10,
    popular:       true,
    tags:          ['hot', 'classic', 'bestseller'],
    sizes: [
      { label: 'Small',  price: 2.19 },
      { label: 'Medium', price: 2.49 },
      { label: 'Large',  price: 2.79 },
      { label: 'XL',     price: 3.09 },
    ],
    customizable: true,
  },
  {
    id:            'dark-roast',
    name:          'Dark Roast Coffee',
    description:   'Bold, rich and full-bodied. A deeper roast for those who like their coffee with character.',
    price:         2.19,
    category:      'hot-drinks',
    categoryLabel: 'Hot Drinks',
    image:         '/images/menu/dark-roast.jpg',
    calories:      10,
    popular:       false,
    tags:          ['hot', 'bold', 'dark'],
    sizes: [
      { label: 'Small',  price: 2.19 },
      { label: 'Medium', price: 2.49 },
      { label: 'Large',  price: 2.79 },
      { label: 'XL',     price: 3.09 },
    ],
    customizable: true,
  },
  {
    id:            'steeped-tea',
    name:          'Steeped Tea',
    description:   'Premium orange pekoe tea, steeped fresh to order. Smooth, fragrant and perfectly warming.',
    price:         2.19,
    category:      'hot-drinks',
    categoryLabel: 'Hot Drinks',
    image:         '/images/menu/steeped-tea.jpg',
    calories:      10,
    popular:       false,
    tags:          ['hot', 'tea', 'classic'],
    sizes: [
      { label: 'Small',  price: 2.19 },
      { label: 'Medium', price: 2.49 },
      { label: 'Large',  price: 2.79 },
    ],
    customizable: true,
  },
  {
    id:            'latte',
    name:          'Latte',
    description:   'Smooth espresso shots topped with velvety steamed milk. Rich, creamy and endlessly satisfying.',
    price:         4.49,
    category:      'hot-drinks',
    categoryLabel: 'Hot Drinks',
    image:         '/images/menu/latte.jpg',
    calories:      190,
    popular:       true,
    tags:          ['hot', 'espresso', 'milk'],
    sizes: [
      { label: 'Small',  price: 4.49 },
      { label: 'Medium', price: 4.99 },
      { label: 'Large',  price: 5.49 },
    ],
    customizable: true,
  },
  {
    id:            'french-vanilla',
    name:          'French Vanilla',
    description:   'A perfectly sweet blend of smooth vanilla flavour and creamy milk. A Canadian favourite.',
    price:         3.49,
    category:      'hot-drinks',
    categoryLabel: 'Hot Drinks',
    image:         '/images/menu/french-vanilla.jpg',
    calories:      290,
    popular:       true,
    tags:          ['hot', 'sweet', 'vanilla', 'bestseller'],
    sizes: [
      { label: 'Small',  price: 3.49 },
      { label: 'Medium', price: 3.99 },
      { label: 'Large',  price: 4.29 },
    ],
    customizable: false,
  },

  // ── COLD DRINKS ─────────────────────────────────────────
  {
    id:            'iced-capp',
    name:          'Iced Capp',
    description:   'The iconic frozen coffee treat blended to perfection. Cold, creamy and dangerously drinkable.',
    price:         4.49,
    category:      'cold-drinks',
    categoryLabel: 'Cold Drinks',
    image:         '/images/menu/iced-capp.jpg',
    calories:      470,
    popular:       true,
    tags:          ['cold', 'frozen', 'iconic', 'bestseller'],
    sizes: [
      { label: 'Small',  price: 4.49 },
      { label: 'Medium', price: 4.99 },
      { label: 'Large',  price: 5.49 },
    ],
    customizable: true,
  },
  {
    id:            'cold-brew',
    name:          'Cold Brew',
    description:   'Steeped for 16 hours in cold water. Naturally smooth with low acidity and a rich finish.',
    price:         4.29,
    category:      'cold-drinks',
    categoryLabel: 'Cold Drinks',
    image:         '/images/menu/cold-brew.jpg',
    calories:      5,
    popular:       true,
    tags:          ['cold', 'smooth', 'coffee'],
    sizes: [
      { label: 'Medium', price: 4.29 },
      { label: 'Large',  price: 4.79 },
    ],
    customizable: true,
  },
  {
    id:            'iced-latte',
    name:          'Iced Latte',
    description:   'Chilled espresso poured over ice with fresh cold milk. Effortlessly cool and deeply satisfying.',
    price:         4.79,
    category:      'cold-drinks',
    categoryLabel: 'Cold Drinks',
    image:         '/images/menu/iced-latte.jpg',
    calories:      130,
    popular:       false,
    tags:          ['cold', 'espresso', 'iced'],
    sizes: [
      { label: 'Small',  price: 4.79 },
      { label: 'Medium', price: 5.29 },
      { label: 'Large',  price: 5.79 },
    ],
    customizable: true,
  },
  {
    id:            'peach-refresher',
    name:          'Peach Mango Refresher',
    description:   'A vibrant fruit-forward drink with real peach and mango flavours over ice. Summer in a cup.',
    price:         4.19,
    category:      'cold-drinks',
    categoryLabel: 'Cold Drinks',
    image:         '/images/menu/peach-refresher.jpg',
    calories:      120,
    popular:       false,
    tags:          ['cold', 'fruity', 'refreshing'],
    sizes: [
      { label: 'Medium', price: 4.19 },
      { label: 'Large',  price: 4.69 },
    ],
    customizable: false,
  },

  // ── FOOD ────────────────────────────────────────────────
  {
    id:            'breakfast-sandwich',
    name:          'Breakfast Sandwich',
    description:   'Freshly cracked egg, cheddar cheese and your choice of meat on a warm English muffin or biscuit.',
    price:         5.99,
    category:      'food',
    categoryLabel: 'Food',
    image:         '/images/menu/breakfast-sandwich.jpg',
    calories:      410,
    popular:       true,
    tags:          ['breakfast', 'egg', 'sandwich', 'bestseller'],
    customizable: true,
  },
  {
    id:            'bagel-belt',
    name:          'BELT Bagel',
    description:   'Bacon, egg, lettuce and tomato on a freshly toasted bagel. The ultimate breakfast classic.',
    price:         6.49,
    category:      'food',
    categoryLabel: 'Food',
    image:         '/images/menu/bagel-belt.jpg',
    calories:      480,
    popular:       false,
    tags:          ['breakfast', 'bagel', 'bacon'],
    customizable: true,
  },
  {
    id:            'chili',
    name:          'Tim Hortons Chili',
    description:   'Hearty, slow-simmered beef chili loaded with kidney beans and signature spices. Comfort in a bowl.',
    price:         5.49,
    category:      'food',
    categoryLabel: 'Food',
    image:         '/images/menu/chili.jpg',
    calories:      300,
    popular:       false,
    tags:          ['lunch', 'warm', 'hearty'],
    customizable: false,
  },
  {
    id:            'soup',
    name:          'Chicken Noodle Soup',
    description:   'Classic homestyle chicken noodle soup made fresh daily. The taste of home in every spoonful.',
    price:         4.99,
    category:      'food',
    categoryLabel: 'Food',
    image:         '/images/menu/soup.jpg',
    calories:      120,
    popular:       false,
    tags:          ['lunch', 'warm', 'classic'],
    customizable: false,
  },

  // ── BAKED GOODS ─────────────────────────────────────────
  {
    id:            'timbits',
    name:          'Timbits',
    description:   'The iconic bite-sized doughnut holes in an endless variety of flavours. Impossible to have just one.',
    price:         2.49,
    category:      'baked-goods',
    categoryLabel: 'Baked Goods',
    image:         '/images/menu/timbits.jpg',
    calories:      70,
    popular:       true,
    tags:          ['sweet', 'iconic', 'snack', 'bestseller'],
    customizable: false,
  },
  {
    id:            'chocolate-dip',
    name:          'Chocolate Dip Donut',
    description:   'A perfectly light yeast doughnut dipped in rich chocolate glaze. A timeless Canadian treat.',
    price:         1.99,
    category:      'baked-goods',
    categoryLabel: 'Baked Goods',
    image:         '/images/menu/chocolate-dip.jpg',
    calories:      260,
    popular:       true,
    tags:          ['sweet', 'donut', 'chocolate'],
    customizable: false,
  },
  {
    id:            'blueberry-muffin',
    name:          'Blueberry Muffin',
    description:   'Bursting with real blueberries and baked fresh every morning. Moist, golden and utterly comforting.',
    price:         2.29,
    category:      'baked-goods',
    categoryLabel: 'Baked Goods',
    image:         '/images/menu/blueberry-muffin.jpg',
    calories:      340,
    popular:       false,
    tags:          ['sweet', 'muffin', 'breakfast'],
    customizable: false,
  },
  {
    id:            'cheese-croissant',
    name:          'Cheese Croissant',
    description:   'Buttery, flaky croissant layered with melted cheddar. Warm, golden and impossibly satisfying.',
    price:         3.49,
    category:      'baked-goods',
    categoryLabel: 'Baked Goods',
    image:         '/images/menu/cheese-croissant.jpg',
    calories:      310,
    popular:       false,
    tags:          ['savoury', 'croissant', 'breakfast'],
    customizable: false,
  },
  {
    id:            'cinnamon-roll',
    name:          'Cinnamon Roll',
    description:   'Soft, pillowy dough swirled with warm cinnamon and topped with sweet cream cheese icing.',
    price:         2.99,
    category:      'baked-goods',
    categoryLabel: 'Baked Goods',
    image:         '/images/menu/cinnamon-roll.jpg',
    calories:      420,
    popular:       true,
    tags:          ['sweet', 'pastry', 'cinnamon'],
    customizable: false,
  },
  {
    id:            'everything-bagel',
    name:          'Everything Bagel',
    description:   'Topped with sesame, poppy seeds, garlic and onion. Best enjoyed with cream cheese.',
    price:         2.19,
    category:      'baked-goods',
    categoryLabel: 'Baked Goods',
    image:         '/images/menu/everything-bagel.jpg',
    calories:      280,
    popular:       false,
    tags:          ['savoury', 'bagel', 'breakfast'],
    customizable: true,
  },
]

// ── Helper functions ─────────────────────────────────────────

export const getItemsByCategory = (category: MenuCategory): MenuItem[] =>
  menuItems.filter((item) => item.category === category)

export const getPopularItems = (): MenuItem[] =>
  menuItems.filter((item) => item.popular)

export const getFeaturedItems = (): MenuItem[] =>
  menuItems.filter((item) => item.popular).slice(0, 6)

export const getItemById = (id: string): MenuItem | undefined =>
  menuItems.find((item) => item.id === id)

export const categories = [
  { id: 'hot-drinks'  as MenuCategory, label: 'Hot Drinks',  emoji: '☕' },
  { id: 'cold-drinks' as MenuCategory, label: 'Cold Drinks', emoji: '🧊' },
  { id: 'food'        as MenuCategory, label: 'Food',        emoji: '🥪' },
  { id: 'baked-goods' as MenuCategory, label: 'Baked Goods', emoji: '🥐' },
]