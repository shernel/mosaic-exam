export default defineEventHandler(() => {
    return [
        {
          id: 1,
          name: 'Apple',
          price: '29.99',
          qty: null,
          imageSrc: '/images/apple.jpg',
          imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        },
        {
          id: 2,
          name: 'Orange',
          price: '35.00',
          qty: null,
          imageSrc: '/images/orange.jpg',
          imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        },
        {
          id: 3,
          name: 'Lemon',
          price: '40.00',
          qty: null,
          imageSrc: '/images/lemon.jpg',
          imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
    ];
})
  