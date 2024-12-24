import { defineStore } from 'pinia';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [
      { 
        id: 1, 
        name: 'Organic Avocados', 
        price: 3.99, 
        description: 'Fresh organic avocados, perfect for guacamole', 
        image: 'https://www.svgrepo.com/show/530365/avocado.svg' 
      },
      { 
        id: 2, 
        name: 'Almond Milk', 
        price: 2.49, 
        description: '1 liter of unsweetened almond milk', 
        image: 'https://www.svgrepo.com/show/321718/almond.svg' 
      },
      { 
        id: 3, 
        name: 'Brown Rice', 
        price: 2.89, 
        description: '1 kg of premium brown rice', 
        image: 'https://www.svgrepo.com/show/505200/rice.svg' 
      },
      { 
        id: 4, 
        name: 'Coconut Oil', 
        price: 5.99, 
        description: 'Pure virgin coconut oil for cooking and skincare', 
        image: 'https://www.svgrepo.com/show/233624/coconut-oil-skin.svg' 
      },
    ],
  }),
  getters: {
    getProductById: (state) => (id) => state.products.find((product) => product.id === id),
  },
});
