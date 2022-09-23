export default defineEventHandler(() => {
    return [
        {
          id: 1,
          name: 'Apple',
          price: '29.99',
          imageSrc: '/images/apple.jpg',
        },
        {
          id: 2,
          name: 'Orange',
          price: '35.00',
          imageSrc: '/images/orange.jpg',
        },
        {
          id: 3,
          name: 'Lemon',
          price: '40.00',
          imageSrc: '/images/lemon.jpg',
          imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
    ];
})
  