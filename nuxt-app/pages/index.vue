<template>
<NuxtLayout>

  <div class="overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">Transaction List</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator</p>
      <div class="mt-5">
        <NuxtLink to="/create" class="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">New Transaction</NuxtLink >
      </div>
    </div>
    <div class="border-t border-gray-200">
      <dl>
        <div v-for="transaction in transactions" class="border-t px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dd class="text-sm font-medium text-gray-500">{{ transaction.cart.id }}</dd>
          <dd class="text-sm font-medium text-gray-500">{{transaction.summary.description}} <small>{{transaction.cart.details}}</small></dd>
          <dd class="text-sm font-medium text-gray-500"><strong>{{ transaction.summary.total }}</strong></dd>
          <!-- <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"><pre>{{ transaction }}</pre></dd> -->
        </div>
      </dl>
    </div>
  </div>
</NuxtLayout>
</template>

<script setup>
  const transactions = useFetchItems();
</script>