import { useState } from '#app'

export function useFetchItems () {
    return useState('cached').value ?? [];
}

export function useCreateItems (obj) {
  const items = useFetchItems();

  if( Array.isArray(items)) 
    items.push(obj);
  
  useState('cached', () => items);
}