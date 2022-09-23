<template>
<div>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="relative bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <div class="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div class="flex justify-start lg:w-0 lg:flex-1">
            <a>
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
            </a>
          </div>
          <nav class="hidden space-x-10 md:flex">
          </nav>
        </div>
      </div>
      <div class="bg-white">
        <div class="mx-auto max-w-2xl lg:max-w-7xl lg:px-8 px-4 sm:px-6">
            <slot />
        </div>
      </div>
    </div>
</div>
</template>