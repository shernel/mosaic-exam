<template>
<NuxtLayout>
<div class="md:grid md:grid-cols-6 md:gap-6">

  <div class="md:col-span-4 mt-4">
    <h2 class="sr-only">Products</h2>
    <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
      <a v-for="item in cart.items" :key="item.id" class="group">
        <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <img :src="item.imageSrc" class="h-full w-full object-cover object-center group-hover:opacity-75" />
        </div>
        <h3 class="mt-4 text-sm text-gray-700">{{ item.name }}</h3>
        <p class="mt-1 text-lg font-medium text-gray-900">{{ item.price }}</p>
        <div class="mt-1 flex rounded-md shadow-sm">
          <span @click="item.qty = item.qty>0? parseInt(item.qty || 0)-1 : 0" class="cursor-pointer inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500"> - </span>
          <input @keypress="isNumber" v-model="item.qty" class="block w-full flex-1 rounded-none border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1 px-2 border" placeholder="0">
          <span @click="item.qty = (parseInt(item.qty) || 0)+1" class="cursor-pointer inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500"> + </span>
        </div>
      </a>
    </div>
  </div>

  <div class="mt-5 md:mt-0 md:col-span-2">
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">

      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Amount to pay</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown </p>
      </div>
      <div class="border-t">
        <dl>
          <div v-for="item in computedItems.items" :key="item.detail.id" class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b">
            <dt class="text-sm text-gray-500 sm:col-span-2">{{ item.detail.name }} - <small>{{ item.detail.price }} x {{ item.detail.qty }}</small></dt>
            <dd class="text-sm text-gray-900 text-right ">{{ item.totalFormatted }}</dd>
          </div>
        </dl>
      </div>
      <div class="border-t">
        <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm text-gray-500 sm:col-span-2">Subtotal</dt>
          <dd class="text-sm text-gray-900 text-right ">{{ computedItems.subtotalFormatted }}</dd>
        </div>
      <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b">
        <dt class="text-sm text-gray-500 sm:col-span-2">VAT ({{computedItems.vat}}%)</dt>
        <dd class="text-sm text-gray-900 text-right ">{{ computedItems.vatamount }}</dd>
      </div>
      <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm text-gray-500 sm:col-span-2"><strong>Total</strong></dt>
        <dd class="text-sm text-gray-900 text-right "><strong>{{ computedItems.totalFormatted }}</strong></dd>
      </div>
      
      <div class="px-4 pt-5 sm:px-6">
        <label for="first-name" class="block text-sm font-medium text-gray-700">Transaction Number</label>
        <input v-model="cart.id" readonly disabled class="py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>

      <div class="px-4 py-5 sm:px-6">
          <label for="address" class="block text-sm font-medium text-gray-700">Extra details</label>
          <div class="mt-1">
            <textarea v-model="cart.details" rows="3" class="py-1 px-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </div>

      <div class="text-right py-3">
        <NuxtLink to="/" class="inline-flex justify-center rounded-md border border-indigo-600 text-indigo-600 py-2 px-4 text-sm font-medium shadow-sm mr-1">Back</NuxtLink>
        <a @click="createItem" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm">Create</a>
      </div>

      </div>
    </div>

  </div>
</div>
</NuxtLayout>
</template>
<script setup>
  import { useCreateItems } from '@/composables/items.ts'

  const { data: products } = await useFetch('/api/products') // server/api/products.ts

  const cart = ref({
    id: Date.now(), details: "", items: products.value.map(v => { return { ...v, qty:0 }})
  });

  const isNumber = (val) => {
    if (isNaN(Number(val.key))) { return val.preventDefault(); }
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'PHP'
  });

  const computedItems = computed(() => {
    const result = {items: [], vat: 12, vatamount: 0, subtotal: 0, total: 0};

    cart.value.items.forEach(item => {
      if(item && parseInt(item.qty) > 0) 
      {
        let product_item = {
          detail: item,
          total: parseInt(item.qty) * parseFloat(item.price)
        };
        product_item.totalFormatted = formatter.format(product_item.total);
        result.items.push(product_item);

        result.subtotal = parseFloat(result.subtotal) + product_item.total;
      }
    })

    result.vatamount = formatter.format(result.subtotal * (result.vat/100));
    result.total = (result.subtotal * (result.vat/100)) + result.subtotal;
    result.subtotalFormatted = formatter.format(result.subtotal);
    result.totalFormatted = formatter.format(result.total);
    
    return result;
  })

  const createItem = (v) => {
    if(computedItems.value.total > 0) {
      useCreateItems({
        cart: JSON.parse (JSON.stringify (cart.value)),
        summary: {
          description: cart.value.items.reduce((p,c) => { if(c.qty >0) p.push(`${c.qty}x${c.name}`); return p; }, []).join('_'),
          total: computedItems.value.total
        }
      });
      navigateTo('/');
    }
  }

</script>