<script setup>
import { watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
  width: { type: String, default: 'max-w-lg' },
})

const emit = defineEmits(['close'])

watch(() => props.open, (val) => {
  if (val) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = ''
})
</script>

<template>
  <Transition name="modal">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-black/40" @click="emit('close')" />
      <div :class="['relative bg-white rounded-xl shadow-2xl w-full', width]">
        <div v-if="title" class="flex items-center justify-between px-6 py-4 border-b">
          <h3 class="text-lg font-semibold">{{ title }}</h3>
          <button class="text-gray-400 hover:text-gray-700 text-2xl leading-none" @click="emit('close')">&times;</button>
        </div>
        <div class="p-6">
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>
