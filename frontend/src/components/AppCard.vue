<script setup>
defineProps({
  title: { type: String, default: '' },
  padded: { type: Boolean, default: true },
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <div v-if="title" class="px-6 py-4 border-b border-gray-100">
      <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
    </div>
    <div :class="padded ? 'p-6' : ''">
      <slot />
    </div>
  </div>
</template>
