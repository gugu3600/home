<script setup>
defineProps({
  open: { type: Boolean, default: false },
})

defineEmits(['close'])
</script>

<template>
  <Transition name="sidebar">
    <aside v-if="open" class="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 flex flex-col">
      <div class="flex items-center justify-between p-4 border-b">
        <span class="font-semibold text-lg">Menu</span>
        <button class="text-gray-500 hover:text-gray-800 text-2xl leading-none" @click="$emit('close')">&times;</button>
      </div>
      <div class="flex-1 p-4 flex flex-col gap-2">
        <slot />
      </div>
    </aside>
  </Transition>
  <div v-if="open" class="fixed inset-0 bg-black/30 z-40" @click="$emit('close')" />
</template>

<style scoped>
.sidebar-enter-active, .sidebar-leave-active {
  transition: transform 0.3s ease;
}
.sidebar-enter-from, .sidebar-leave-to {
  transform: translateX(-100%);
}
</style>
