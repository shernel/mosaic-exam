<template>
<NuxtLayout>
<div class="md:grid md:grid-cols-6 md:gap-6">

  <div class="md:col-span-4 mt-4">
    <h2 class="sr-only">Products</h2>
    <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
      <a v-for="product in products" :key="product.id" class="group">
        <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full w-full object-cover object-center group-hover:opacity-75" />
        </div>
        <h3 class="mt-4 text-sm text-gray-700">{{ product.name }}</h3>
        <p class="mt-1 text-lg font-medium text-gray-900">{{ product.price }}</p>
        <div class="mt-1 flex rounded-md shadow-sm">
          <span @click="product.qty = product.qty>0? parseInt(product.qty || 0)-1 : 0" class="cursor-pointer inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500"> - </span>
          <input @keypress="isNumber" v-model="product.qty" class="block w-full flex-1 rounded-none border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1 px-2 border" placeholder="0">
          <span @click="product.qty = (parseInt(product.qty) || 0)+1" class="cursor-pointer inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500"> + </span>
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
      </div>
    </div>
  </div>

</div>
</NuxtLayout>
</template>
<script setup>

const isNumber = (val) => {
  if (isNaN(Number(val.key))) { return val.preventDefault(); }
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'PHP'
});
const { data: products } = await useFetch('/api/products') // server/api/products.ts

const computedItems = computed(() => {
  const result = {items: [], vat: 12, vatamount: 0, subtotal: 0, total: 0};

  products.value.forEach(item => {
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

</script>