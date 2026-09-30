/**
 * products.js — Data menu statis Dosu
 * Ganti foto dengan path gambar asli setelah tersedia.
 */

export const products = [
  {
    id: 'p1',
    name: 'Dosu Original',
    description: 'Donat susu lembut dengan taburan gula halus yang mencair di mulut. Rasa susu yang kaya dan adonan yang fluffy.',
    price: 5000,
    image: '/logoDosu.png',
    category: 'original',
    available: true,
  },
  {
    id: 'p2',
    name: 'Dosu Macha',
    description: 'Perpaduan unik donat susu lembut dengan aroma matcha Jepang yang harum. Manis, sedikit pahit, dan sangat memanjakan.',
    price: 5000,
    image: '/logoDosu.png',
    category: 'topping',
    available: true,
  },
  {
    id: 'p3',
    name: 'Dosu Coklat',
    description: 'Donat susu premium dibalut coklat susu kental yang lumer. Kombinasi sempurna antara kelembutan donat dan kekayaan coklat.',
    price: 5000,
    image: '/logoDosu.png',
    category: 'topping',
    available: true,
  },
  {
    id: 'p4',
    name: 'Dosu Stroberi',
    description: 'Donat susu segar dengan topping stroberi pink cerah yang manis dan sedikit asam. Cantik di mata, lezat di lidah.',
    price: 5000,
    image: '/logoDosu.png',
    category: 'topping',
    available: true,
  },
]

export const categories = [
  { id: 'all', label: 'Semua' },
  { id: 'original', label: 'Original' },
  { id: 'topping', label: 'Topping' },
]
